'use client'

import React, { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation';
import { TiTick } from 'react-icons/ti';

const Success = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get('payment_intent');

  useEffect(() => {
    if(!payment_intent)
    router.push('/');

    const updateOrder = async () => {
      await fetch(`/api/payment/${payment_intent}`);

      setTimeout(() => {
        router.push('/account/orders');
      }, 1000);
    }

    updateOrder();
  }, []);

  return (
    <div className="text-black text-center py-10 px-4 bg-lightGreen">
      <TiTick className='text-[200px] md:text-[300px] mx-auto text-mainGreen' />
      <h1 className="text-3xl md:text-5xl font-semibold">Your payment is successful.</h1>
      <p className="text-xl md:text-3xl font-medium">Do not close this page, you will be redirected after a few seconds.</p>
    </div>
  )
}

export default Success