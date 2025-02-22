'use client';

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
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

            localStorage.setItem('sdley-eshopCartItems', JSON.stringify(updatedCart));

            return updatedCart;
        })

        // toast notification
        toast.success('Product added to cart!');

    }, []);

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id;
            });

            setCartProducts(filteredProducts);
            toast.success('Product removed!');
            localStorage.setItem('sdley-eshopCartItems', JSON.stringify(filteredProducts));
        }
    }, [cartProducts]);

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;

        if (product.quantity === 99) {
            return toast.error('Ops! Maximum quantity reached!');
        }

        if (cartProducts) {
            updatedCart = [...cartProducts];

            const existingIndex = updatedCart.findIndex((item) => item.id === product.id);

            // if the index is found
            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity += 1;
                setCartProducts(updatedCart);
                localStorage.setItem('sdley-eshopCartItems', JSON.stringify(updatedCart));
            }
        }

    }, [cartProducts]);


    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart;

        if (product.quantity === 1) {
            return toast.error('Ops! Minimum quantity reached!');
        }

        if (cartProducts) {
            updatedCart = [...cartProducts];

            const existingIndex = updatedCart.findIndex((item) => item.id === product.id);

            // if the index is found
            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity -= 1;
                setCartProducts(updatedCart);
                localStorage.setItem('sdley-eshopCartItems', JSON.stringify(updatedCart));
            }
        }

    }, [cartProducts]);

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
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