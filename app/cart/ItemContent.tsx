'use client';

import { formatPrice } from "@/utils/FormatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
    item: CartProductType;   
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
    const {
        handleRemoveProductFromCart, 
        handleCartQtyIncrease,
        handleCartQtyDecrease
    } = useCart();

    return ( 
        <div
            className="
                flex
                flex-col
                md:grid
                md:grid-cols-5
                text-xs
                md:text-sm
                gap-4
                border-t-[1.5px]
                border-slate-200
                py-4
                items-center
            "
        >
            {/* Product Info Section */}
            <div 
                // className="
                //     flex
                //     items-center
                //     gap-2
                //     md:col-span-2
                //     w-full
                // "
                className="
                    flex
                    gap-2 
                    justify-self-start
                    md:col-span-2 
                    md:gap-4
                    w-full
                "
            >
                <Link href={`/product/${item.id}`}>
                    <div className="relative w-[70px] aspect-square">
                        <Image 
                            src={item.selectedImg.image}
                            alt={truncateText(item.name)}
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>
                <div 
                // className="flex flex-col justify-center items-center"
                className="flex flex-col items-start justify-between"
                
                >
                    <Link href={`/product/${item.id}`}>
                        {truncateText(item.name)}
                    </Link>
                    <div>{item.selectedImg.color}</div>
                    <button 
                        className="text-slate-500 underline"
                        onClick={() => handleRemoveProductFromCart(item)}
                    >
                        Remove
                    </button>
                </div>
            </div>

            {/* Price Section */}
            <div 
                className="
                    flex justify-between items-center w-full
                    md:justify-self-center md:flex-none md:w-auto">
                <span className="md:hidden font-semibold uppercase">Price:</span>
                <span>{formatPrice(item.price)}</span>
            </div>

            {/* Quantity Section */}
            <div 
                className="
                    flex justify-between items-center w-full
                    md:justify-self-center md:flex-none md:w-auto">
                <span className="md:hidden font-semibold uppercase">Quantity:</span>
                <SetQuantity 
                    cartCounter={true}
                    cartProduct={item}
                    handleQtyIncrease={() => handleCartQtyIncrease(item)}
                    handleQtyDecrease={() => handleCartQtyDecrease(item)}
                />
            </div>

            {/* Total Section */}
            <div 
                className="
                    flex justify-between items-center w-full font-semibold
                    md:justify-self-end md:flex-none md:w-auto">
                <span className="md:hidden font-semibold uppercase">Total:</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
        </div>
    );
}
 
export default ItemContent;
