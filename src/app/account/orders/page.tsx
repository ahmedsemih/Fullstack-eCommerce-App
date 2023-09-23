import { OrderCard } from '@/components';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react'

async function fetchOrders(userId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/orders/user/${userId}`);
  const data = await res.json();
  return data.orders;
}

const Orders = async () => {
  const data = await getServerSession(authOptions);
  const orders = await fetchOrders(data?.user._id!);

  return (
    <main className='mt-4'>
      {
        orders.map((order: Order) => (
          <OrderCard key={order._id} order={order} />
        ))
      }
    </main>
  )
}

export default Orders;