import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import Product from '@/models/Product';
import Campaign from '@/models/Campaign';
import { connectToDatabase } from '@/utils/database';

export async function GET() {
    try {
      await connectToDatabase();  

      let currentDate = new Date();

      const campaign = await Campaign.findOne({ $or: [{ endDate: null }, { endDate: { $gt: currentDate} }]}).populate('products').sort({ createdAt: -1 });

      if (campaign) 
      return NextResponse.json({ campaign }, { status: 200 });

      return NextResponse.json({},{ status: 404, statusText: 'Campaigns not found.' });
    } catch (error) {
      return NextResponse.json({}, { status: 500, statusText: 'Failed to get all campaigns.' });
    }
}

export async function POST(req: NextRequest) {
    try {
      const token = await getToken({ req })

      if(!token?.isAdmin)
      return NextResponse.json({}, { status: 401, statusText: 'You must be an admin to create a campaign.' });

      await connectToDatabase();

      const oldDiscountedProducts = await Product.find({ discountRate: { $gt: 0 } });
      oldDiscountedProducts.forEach(async (product: Product) => {
        await Product.findByIdAndUpdate(product._id, { discountRate: 0 });
      });

      const body = await req.json();
      await Campaign.create(body);

      body.products.forEach(async (productId: string) => {
        await Product.findByIdAndUpdate(productId, { discountRate: body.discountRate });
      });

      return NextResponse.json({ message: 'Campaign created successfully.'}, { status: 201 });
    } catch (error) {
      return NextResponse.json({}, { status: 500, statusText: 'Failed to create campaign.' });
    }
}
