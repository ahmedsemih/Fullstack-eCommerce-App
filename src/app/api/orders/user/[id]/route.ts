import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import Order from '@/models/Order';
import { connectToDatabase } from '@/utils/database';

export async function GET(req: NextRequest, { params }: ParamsType) {
  try {
    const token = await getToken({ req })

    if(!token)
    return NextResponse.json({}, { status: 401, statusText: 'You must be logged in to get orders.' });

    await connectToDatabase();

    const orders = await Order.find({ buyer: params.id }).populate({
      path: 'selections',
      strictPopulate: false,
      populate: {
        path: 'product',
        strictPopulate: false
      }
    });

    if (orders.length > 0)
    return NextResponse.json({ orders }, { status: 200 });

    return NextResponse.json({}, { status: 404, statusText: 'Order not found.' });
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: 'Failed to get order.' });
  }
}
