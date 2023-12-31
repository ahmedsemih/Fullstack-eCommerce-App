import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import Campaign from '@/models/Campaign';
import { connectToDatabase } from '@/utils/database';
import Product from '@/models/Product';

export async function GET(req: NextRequest, { params }: ParamsType) {
    try {
        await connectToDatabase();

        const campaign = await Campaign.findById(params.id).populate({ path: 'products', strictPopulate: false });

        if(campaign)
        return NextResponse.json({ campaign }, { status: 200 });

        return NextResponse.json({}, { status: 404, statusText: 'Campaign not found.' });
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to get campaign.' });
    }
}

export async function PUT(req: NextRequest, { params }: ParamsType) {
    try {
        const token = await getToken({ req })

        if(!token?.isAdmin)
        return NextResponse.json({}, { status: 401, statusText: 'You must be an admin to update a campaign.' });

        await connectToDatabase();

        const { discountRate, products, endDate } = await req.json();
        const campaign = await Campaign.findByIdAndUpdate(params.id, { discountRate, products, endDate });

        if(campaign)
        return NextResponse.json({ message: 'Campaign updated successfully.' }, { status: 200 });

        return NextResponse.json({}, { status: 404, statusText: 'Campaign not found.' })
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to update campaign.' });
    }
}

export async function DELETE(req: NextRequest, { params }: ParamsType) {
    try {
        const token = await getToken({ req })

        if(!token?.isAdmin)
        return NextResponse.json({}, { status: 401, statusText: 'You must be an admin to delete a campaign.' });

        await connectToDatabase();

        const campaign = await Campaign.findByIdAndDelete(params.id);

        const oldDiscountedProducts = await Product.find({ discountRate: { $gt: 0 } });
        oldDiscountedProducts.forEach(async (product: Product) => {
          await Product.findByIdAndUpdate(product._id, { discountRate: 0 });
        });

        if(campaign)
        return NextResponse.json({ message: 'Campaign deleted successfully.'}, { status: 200 });

        return NextResponse.json({}, { status: 404, statusText: 'Campaign not found.' });
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to delete campaign.' });
    }
}