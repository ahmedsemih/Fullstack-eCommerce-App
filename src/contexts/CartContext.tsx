'use client'

import getSizeInfo from "@/utils/getSizeInfo";
import { ReactNode, createContext, useContext, useState } from "react";

type ContextType = {
    cart: SelectionType[];
    totalCost: number;
    addToCart: any;
    removeFromCart: any;
}

export const CartContext = createContext<ContextType>({ cart: [], totalCost: 0, addToCart: () => {}, removeFromCart: () => {}});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<SelectionType[]>([]);
    const [totalCost, setTotalCost] = useState<number>(0);

    const addToCart = (selection: SelectionType) => {
        setCart((prev) => [...prev, selection]);

        if(selection.size)
        setTotalCost((prev) => prev + (selection.product.price * getSizeInfo(selection.size!).multiplier));
        else
        setTotalCost((prev) => prev + selection.product.price);
    }

    const removeFromCart = (selectionId: string) => {
        const filteredCart = cart.filter((item: any) => item?._id !== selectionId);
        setCart(filteredCart);
        
        let total = 0;
        
        filteredCart.forEach((selection: SelectionType) => {
            if(selection.size)
            total += (selection.product.price * getSizeInfo(selection.size!).multiplier)
            else
            total += selection.product.price;
        });

        setTotalCost(total);
    }

    const values = {
        cart,
        totalCost,
        addToCart,
        removeFromCart
    }

    return <CartContext.Provider value={values}>{children}</CartContext.Provider>
}

export const useCartContext = () => useContext(CartContext);