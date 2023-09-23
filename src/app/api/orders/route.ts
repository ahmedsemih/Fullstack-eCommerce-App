import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import Order from '@/models/Order';
import Product from '@/models/Product';
import Selection from '@/models/Selection';
import { connectToDatabase } from '@/utils/database';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const today = new Date();
    const yesterday = today.setHours(today.getHours() - 3);

    const orders = await Order.find({ 
      $or:[
        { deliverDate: { $gt: yesterday }},
        { progress: { $lt: 2 } }
      ]
    })
    .populate({
      path: 'selections',
      model: Selection,
      populate: {
        path: 'product',
        model: Product
      },
    })
    .populate({
      path: 'buyer',
      model: User
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
