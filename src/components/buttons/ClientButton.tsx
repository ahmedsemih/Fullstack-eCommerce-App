'use client'

import { toast } from 'react-toastify';
import React, { ReactNode, useEffect, useState } from 'react';

import { useCartContext } from '@/contexts/CartContext';
import { useModalContext } from '@/contexts/ModalContext';

type Props = {
  children: ReactNode;
  variant: 'outlined' | 'contained';
  color?: 'mainGreen' | 'mainRed';
  selection?: SelectionType;
  productId?: string | null;
}

const ClientButton = ({ children, variant, selection, productId, color = 'mainRed' }: Props) => {
    const { cart, addToCart, removeFromCart } = useCartContext();
    const { setIsProductOpen, setProductId } = useModalContext();

    const [amount, setAmount] = useState(0);

    useEffect(() => {
      if(productId) return;

      let selectionAmount = 0;

      cart.forEach((cartItem: SelectionType) => {
        if(cartItem._id === selection?._id)
        selectionAmount += 1;
      });

      setAmount(selectionAmount);
    }, [cart.length]);

    const handleClick = () => {
      if(!productId){
        toast.success(`Added to cart successfully.`,{
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        
        return addToCart(selection);
      }

      setProductId(productId!);
      setIsProductOpen(true);
    }

    if(amount === 0 || productId)
    return (
      <button
        onClick={handleClick}
        className={`
          py-2 px-4 text-2xl border-2 border-${color} lg:text-4xl font-semibold rounded-lg hover:opacity-70 transition-all duration-300
          ${variant === 'contained' ? `bg-${color} text-white` : `text-${color} bg-white`}
        `} 
      >
        {children}
      </button>
    )

    return (
      <div className={`flex items-center text-xl md:text-2xl lg:text-3xl justify-center font-semibold`}>
        <button 
          className={`
            border-2 py-2 px-4 rounded-l-lg w-14 text-center
            ${variant === 'outlined' ? `border-${color} bg-white text-${color}` : `border-white bg-${color} text-white`}
          `}
          onClick={() => removeFromCart(selection?._id)}
          >-</button>
        <p 
          className={`
            px-4 py-2 font-semibold w-16 text-center 
            ${variant === 'outlined' ? 'text-white' : `text-${color}`}
          `}
        >
          {amount}
        </p>
        <button 
          className={`
            border-2 py-2 px-4 rounded-r-lg w-14 text-center
            ${variant === 'outlined' ? `border-${color} bg-white text-${color}` : `border-white bg-${color} text-white`}
          `} 
          onClick={() => addToCart(selection)}
          >+</button>
      </div>
    )
}

export default ClientButton;