import React from 'react'
import { getServerSession } from 'next-auth';

import { OrderCard } from '@/components';
import { authOptions } from '@/lib/auth';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Link from 'next/link';

async function fetchOrders(userId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/orders/user/${userId}`, { cache: 'no-cache' });
  const data = await res.json();
  return data.orders;
}

const Orders = async () => {
  const data = await getServerSession(authOptions);
  const orders = await fetchOrders(data?.user._id!);

  return (
    <main className='mt-4 pb-4'>
      {
        orders ? (
          orders?.map((order: Order) => (
            <OrderCard key={order._id} order={order} />
          ))
        ) : (
          <div className="text-black text-center py-14 px-4 bg-lightRed rounded-lg">
            <AiOutlineShoppingCart className='text-[200px] md:text-[300px] mx-auto mb-10' />
            <h1 className="text-3xl md:text-5xl font-semibold">You don't have any order</h1>
            <p className="text-xl md:text-3xl font-medium">Discover our products and order now.</p>
            <Link href='/menu/top'>
              <button className="bg-mainRed text-white hover:opacity-70 text-3xl rounded-lg px-8 py-2 mt-10" >Discover</button>
            </Link>
          </div>
        )
      }
    </main>
  )
}

export default Orders;