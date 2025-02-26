import Stripe from 'stripe';
import prisma from "@/libs/prismadb";
import { NextResponse } from 'next/server';
import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import { getCurrentUser } from '@/actions/getCurrentUser';
import axios from 'axios';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-02-24.acacia",
});

/**
 * fetchExchangeRate & convertXOFtoUSD utility functions to convert 
 * the total order amount from XOF to USD
 */
const fetchExchangeRate = async () => {
    try {
        const response = await axios.get('https://v6.exchangerate-api.com/v6/64866513b83763cfff7ec27f/latest/XOF');
        const rates = response.data.conversion_rates;
        const usdRate = rates['USD'];
        return usdRate;
    } catch (error) {
        console.error('Error retrieving exchange rate:', error);
        throw new Error('Unable to retrieve exchange rate');
    }
};

const convertXOFtoUSD = async (amountInXOF: number) => {
    const exchangeRate = await fetchExchangeRate();
    const amountInUSD = amountInXOF * exchangeRate;
    return amountInUSD;
};

const calculateOrderAmount = async (items: CartProductType[]) => {
    // totalPrice in xof
    const totalPriceXOF = items.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity;
        return acc + itemTotal;
    }, 0);

    console.log("Total Price XOF:", totalPriceXOF);

    // total amount in usd
    // const totalPrice = convertXOFtoUSD(totalPriceXOF);
    let totalPrice = await convertXOFtoUSD(totalPriceXOF);
    totalPrice = parseFloat(totalPrice.toFixed(2));

    /**
     * To avoid errors such as [Error: Invalid integer: 381843.316008]
     * when for example:
     * Total Price XOF: 2392501.98
     * Total Order Amount USD: 381843.316008
     * We will round the total order amount to 2 decimal places
     */
    
    
    return totalPrice;
};

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const body = await request.json();
    const { items, payment_intent_id } = body;
    const ExactTotalUSD = await calculateOrderAmount(items) * 100;
    let total = await calculateOrderAmount(items) * 100;
    total = parseFloat(total.toFixed(2));
    console.log("Exact Total Order Amount in USD:", ExactTotalUSD);
    console.log("Total Order Amount USD:", total);
    const orderData = {
        user: { connect: { id: currentUser.id} },
        amount: total,
        currency: 'usd',
        status: 'pending',
        deliveryStatus: 'pending',
        paymentIntentId: payment_intent_id,
        products: items
    };

    if (payment_intent_id) {
        // update the payment intent
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

        if (current_intent){
            const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
                amount: total
            })
            
            // update the order
            const [existing_order, updated_order] = await Promise.all([
                prisma.order.findFirst({
                    where: {paymentIntentId: payment_intent_id}
                }),
                prisma.order.update({
                    where: {paymentIntentId: payment_intent_id},
                    data: {
                        amount: total,
                        products: items
                    }
                })
            ]);
    
            if (!existing_order){
                return NextResponse.json(
                    { error: "Invalid payment intent" },
                    { status: 400 }
                );
            }
    
            return NextResponse.json({ paymentIntent: updated_intent });
        }


    }else {
        // create the payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
        });

        //create the order
        orderData.paymentIntentId = paymentIntent.id;

        await prisma.order.create({
            data: orderData,
        });

        return NextResponse.json({ paymentIntent });
    }
}