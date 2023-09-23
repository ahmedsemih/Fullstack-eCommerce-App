import { NextRequest, NextResponse } from 'next/server';

import Order from '@/models/Order';
import Product from '@/models/Product';
import Selection from '@/models/Selection';
import { connectToDatabase } from '@/utils/database';

export async function GET(req: NextRequest, { params }: ParamsType) {
  try {
    await connectToDatabase();

    const orders = await Order.find({ buyer: params.id }).populate({
      path: 'selections',
      model: Selection,
      populate: {
        path: 'product',
        model: Product,
      }
    }).sort({ orderDate: -1 });

    if (orders.length > 0)
    return NextResponse.json({ orders }, { status: 200 });

    return NextResponse.json({}, { status: 404, statusText: 'Order not found.' });
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: 'Failed to get order.' });
  }
}
