import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import Order from '@/models/Order';
import { connectToDatabase } from '@/utils/database';

export async function GET(req: NextRequest, { params }: ParamsType) {
  try {
    await connectToDatabase();

    const order = await Order.findById(params.id).populate({
      path: 'selections',
      strictPopulate: false,
      populate: {
        path: 'product',
        strictPopulate: false
      }
    });

    if (order)
    return NextResponse.json({ order }, { status: 200 });

    return NextResponse.json({}, { status: 404, statusText: 'Order not found.' });
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: 'Failed to get order.' });
  }
}

export async function PUT(req: NextRequest, { params }: ParamsType) {
  try {
    const token = await getToken({ req })

    if(!token)
    return NextResponse.json({}, { status: 401, statusText: 'You must be logged in to update an order.' });

    await connectToDatabase();

    const body = await req.json();
    const order = await Order.findByIdAndUpdate(params.id, body);

    if (order)
    return NextResponse.json({}, { status: 200, statusText: 'Order updated successfully' });

    return NextResponse.json({}, { status: 404, statusText: 'Order not found.' });
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: 'Failed to update order.' });
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsType) {
  try {
    const token = await getToken({ req })

    if(!token)
    return NextResponse.json({}, { status: 401, statusText: 'You must be logged in to delete an order.' });

    await connectToDatabase();

    const order = await Order.findByIdAndDelete(params.id);

    if (order)
    return NextResponse.json({}, { status: 200, statusText: 'Order deleted successfully.' });

    return NextResponse.json({}, { status: 404, statusText: 'Order not found' });
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: 'Failed to delete order.' });
  }
}
