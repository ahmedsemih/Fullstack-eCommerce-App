'use client'

import getSizeInfo from "@/utils/getSizeInfo";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type ContextType = {
    cart: SelectionType[];
    totalCost: number;
    setCart: Dispatch<SetStateAction<SelectionType[]>>;
    addToCart: any;
    removeFromCart: any;
    updateSelection: any;
}

export const CartContext = createContext<ContextType>({ 
    cart: [], 
    totalCost: 0, 
    setCart: useState<SelectionType[]>, 
    addToCart: () => {}, 
    removeFromCart: () => {}, 
    updateSelection: () => {}
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<SelectionType[]>([]);
    const [totalCost, setTotalCost] = useState<number>(0);

    const addToCart = (selection: SelectionType) => {
        setCart((prev) => [...prev, selection]);

        if(selection?.size)
        setTotalCost((prev) => prev + (selection?.product?.price * getSizeInfo(selection.size!).multiplier) * Number((100 - selection.product.discountRate!) / 100)) ;
        else
        setTotalCost((prev) => prev + (selection?.product?.price * Number((100 - selection?.product?.discountRate!) / 100))) ;
    }

    const removeFromCart = (selectionId: string) => {
        var filteredCart: SelectionType[] = [];
        var isFirst = true;
        
        cart.forEach((selection) => {
            if(selection._id === selectionId && isFirst)
            return isFirst = false;

            filteredCart.push(selection);
        });
        setCart(filteredCart);
        
        let total = 0;
        
        filteredCart.forEach((selection: SelectionType) => {
            if(selection.size)
            total += (selection.product.price * getSizeInfo(selection.size!).multiplier) * Number((100 - selection.product.discountRate!) / 100);
            else
            total += selection.product.price * Number((100 - selection.product.discountRate!) / 100);
        });

        setTotalCost(total);
    }

    const updateSelection = ({id, size, ingredients}: { id: string, size: string, ingredients: string[] }) => {
        let total = 0;
        const selections = cart;
        let selectionIndex = selections.findIndex((item) => item._id === id);

        if(selectionIndex !== -1){
            selections[selectionIndex].size = size;
            selections[selectionIndex].ingredients = ingredients;
            setCart(selections);
        }

        selections.forEach((selection: SelectionType) => {
            if(selection.size)
            total += (selection.product.price * getSizeInfo(selection.size!).multiplier) * Number((100 - selection.product.discountRate!) / 100);
            else
            total += selection.product.price * Number((100 - selection.product.discountRate!) / 100);
        });

        setTotalCost(total);
    }

    const values = {
        cart,
        setCart,
        totalCost,
        addToCart,
        removeFromCart,
        updateSelection
    }

    return <CartContext.Provider value={values}>{children}</CartContext.Provider>
}

export const useCartContext = () => useContext(CartContext);