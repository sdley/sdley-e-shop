import { NextApiRequest, NextApiResponse } from "next"
import { buffer } from "stream/consumers"
import Stripe from "stripe"

export const config = {
    api: {
        bodyParser: false,
    }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-02-24.acacia"
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    if (!sig){
        return res.status(400).send("Missing the stripe signature");
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            buf,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET! // ! is used to tell typescript that the value is not null
        )
    } catch (error) {
        return res.status(400).send("Webhook error: " + error);
    }

    switch(event.type){
        case 'charge.succeeded':
            const charge: Stripe.Charge = event.data.object as Stripe.Charge;

            if(typeof charge.payment_intent === 'string'){
                await prisma?.order.update({
                    where: {paymentIntentId: charge.payment_intent},
                    data: {status: 'complete', address: charge.shipping?.address}
                })
            }
            break;
        default:
            console.warn(`Unhandled event type: ${event.type}`);
    }

    res.json({received: true});
}