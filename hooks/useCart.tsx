'use client';

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
};

export const CartContext = createContext<CartContextType | null>(null); 

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    useEffect(() => {
        const cartItems = localStorage.getItem('sdley-eshopCartItems');

        const cartProducs: CartProductType[] | null = JSON.parse(cartItems || '[]');

        setCartProducts(cartProducs);
    }, []);

    // add product to cart
    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if (prev) {
                updatedCart = [...prev, product];
            }else{
                updatedCart = [product];
            }

            // toast.success('Product added to cart');
            localStorage.setItem('sdley-eshopCartItems', JSON.stringify(updatedCart));

            return updatedCart;
        })
    }, []);

    useEffect(() => {
        if (cartProducts && cartProducts.length > 0) {
            toast.success('Product added to cart');
        }
    }, [cartProducts]);  // Trigger only when cartProducts changes

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
    }

    return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
    const context = useContext(CartContext); 

    if (!context) {
        throw new Error('useCart must be used within a CartContextProvider');
    }

    return context;
}