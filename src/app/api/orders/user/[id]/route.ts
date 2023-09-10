import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import Order from '@/models/Order';
import { connectToDatabase } from '@/utils/database';

export async function GET(req: NextRequest, { params }: ParamsType) {
  try {
    const token = await getToken({ req })

    if(!token)
    return NextResponse.json({ message: 'You must be logged in to get orders.' }, { status: 401 });

    await connectToDatabase();

    const orders = await Order.find({ buyer: params.id }).populate({
      path: 'selections',
      populate: {
        path: 'product'
      }
    });

    if (orders.length > 0)
    return NextResponse.json({ orders }, { status: 200 });

    return NextResponse.json({ message: 'Order not found.' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to get order.' }, { status: 500 });
  }
}
