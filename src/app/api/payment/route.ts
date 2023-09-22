import { NextRequest, NextResponse } from 'next/server';

import Order from '@/models/Order';
import { connectToDatabase } from '@/utils/database';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { amount, id } = await req.json();

    const totalAmount = amount >= 50 ? amount : amount + 9.9;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: (totalAmount * 100).toFixed(0),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true
      }
    });

    await Order.findByIdAndUpdate(id, { intentId: paymentIntent.id });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: 'Failed to create payment.' });
  }
}
