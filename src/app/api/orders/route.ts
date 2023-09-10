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
        path: 'product'
      }
    });

    if (orders.length > 0)
    return NextResponse.json({ orders }, { status: 200 });

    return NextResponse.json({ message: 'Orders not found.' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to get orders.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if(!token)
    return NextResponse.json({ message: 'You must be logged in to create an order.' }, { status: 401 });

    await connectToDatabase();

    const { selections, ...body } = await req.json();

    selections?.forEach(async (selectionId: string) => {
      const selection = await Selection.findById(selectionId);
      await Product.findByIdAndUpdate(selection.product, { $inc: { numberOfSales: 1 } });
    });

    await Order.create({ selections, ...body });
    return NextResponse.json({ message: 'Order created successfully.' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create orders.' }, { status: 500 });
  }
}
