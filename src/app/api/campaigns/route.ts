import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import Campaign from '@/models/Campaign';
import { connectToDatabase } from '@/utils/database';

export async function GET() {
    try {
      await connectToDatabase();

      const campaigns = await Campaign.find({}).populate('products');

      if (campaigns.length > 0) 
      return NextResponse.json({ campaigns }, { status: 200 });

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

      const body = await req.json();
      await Campaign.create(body);

      return NextResponse.json({ message: 'Campaign created successfully.'}, { status: 201 });
    } catch (error) {
      return NextResponse.json({}, { status: 500, statusText: 'Failed to create campaign.' });
    }
}
