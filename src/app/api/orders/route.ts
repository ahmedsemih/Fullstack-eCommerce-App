import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import Order from '@/models/Order';
import Product from '@/models/Product';
import Selection from '@/models/Selection';
import { connectToDatabase } from '@/utils/database';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if(!token)
    return NextResponse.json({ message: 'You must be an admin to get all orders.' }, { status: 401 });

    await connectToDatabase();

    const orders = await Order.find({}).populate({
      path: 'selections',
      populate: {
        path: 'product',
        strictPopulate: false
      },
      strictPopulate: false
    });

    if (orders.length > 0)
    return NextResponse.json({ orders }, { status: 200 });

    return NextResponse.json({}, { status: 404, statusText: 'Orders not found.' });
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: 'Failed to get orders.' });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if(!token)
    return NextResponse.json({}, { status: 401, statusText: 'You must be logged in to create an order.' });

    await connectToDatabase();

    const { selections, ...body } = await req.json();

    selections?.forEach(async (selectionId: string) => {
      const selection = await Selection.findById(selectionId);
      await Product.findByIdAndUpdate(selection.product, { $inc: { numberOfSales: 1 } });
    });

    const order = await Order.create({ selections, ...body });
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: 'Failed to create orders.' });
  }
}
