import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

import Category from "@/models/Category";
import { connectToDatabase } from "@/utils/database";

export async function GET() {
    try {
        await connectToDatabase();

        const categories = await Category.find({});

        if(categories.length > 0)
        return NextResponse.json({ categories }, { status: 200 });
    
        return NextResponse.json({}, { status: 404, statusText: 'Categories not found.' });
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to get categories.' });
    }
}

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req })

        if(!token?.isAdmin)
        return NextResponse.json({}, { status: 401, statusText: 'You must be an admin to create a category.' });

        await connectToDatabase();

        const body = await req.json();

        await Category.create(body);
        return NextResponse.json({ message: 'Category created successfully.' }, { status: 201 });
    } catch (error: any) {
        if(error.code === 11000)
        return NextResponse.json({}, { status: 409, statusText: 'This category already exists.' });

        return NextResponse.json({}, { status: 500, statusText: 'Failed to create categories.' });
    }
}