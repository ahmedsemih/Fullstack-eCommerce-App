'use client'

import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "@/components/CheckoutForm";
import { useCartContext } from "@/contexts/CartContext";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const Payment = ({ params }: { params: { id: string }}) => {
  const { totalCost } = useCartContext();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchClientSecret = async () => {
      const res= await fetch(`/api/payment`, {
        method: 'POST',
        body: JSON.stringify({ amount: totalCost, id: params.id })
      });

      const data = await res.json();
      setClientSecret(data.clientSecret);
    }

    fetchClientSecret();
  }, []);

  return (
    <div>
      {clientSecret && (
        <Elements 
          options={{ 
            clientSecret, 
            appearance: { 
              theme: "flat" 
            } 
          }} 
          stripe={stripePromise}
        >
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  )
}

export default Payment;