import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import Order from '@/models/Order';
import { connectToDatabase } from '@/utils/database';

export async function GET(req: NextRequest, { params }: ParamsType) {
  try {
    await connectToDatabase();

    const order = await Order.findById(params.id).populate({
      path: 'selections',
      populate: {
        path: 'product'
      }
    });

    if (order)
    return NextResponse.json({ order }, { status: 200 });

    return NextResponse.json({ message: 'Order not found.' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to get order.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: ParamsType) {
  try {
    const token = await getToken({ req })

    if(!token)
    return NextResponse.json({ message: 'You must be logged in to update an order.' }, { status: 401 });

    await connectToDatabase();

    const body = await req.json();
    const order = await Order.findByIdAndUpdate(params.id, body);

    if (order)
    return NextResponse.json({ message: 'Order updated successfully' }, { status: 200 });

    return NextResponse.json({ message: 'Order not found.' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update order.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsType) {
  try {
    const token = await getToken({ req })

    if(!token)
    return NextResponse.json({ message: 'You must be logged in to delete an order.' }, { status: 401 });

    await connectToDatabase();

    const order = await Order.findByIdAndDelete(params.id);

    if (order)
    return NextResponse.json({ message: 'Order deleted successfully.' }, { status: 200 });

    return NextResponse.json({ message: 'Order not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete order.' }, { status: 500 });
  }
}
