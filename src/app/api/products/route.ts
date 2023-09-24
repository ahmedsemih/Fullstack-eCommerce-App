import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import Product from "@/models/Product";
import { connectToDatabase } from "@/utils/database";

export async function GET() {
    try {
        await connectToDatabase();

        const products = await Product.find({}).populate({ path: 'category', strictPopulate: false });

        if(products.length > 0) 
        return NextResponse.json({ products }, { status: 200 });

        return NextResponse.json({ message: 'Products not found.' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to get products' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req })

        if(!token?.isAdmin)
        return NextResponse.json({ message: 'You must be an admin to create a product.' }, { status: 401 });

        await connectToDatabase();

        const body = await req.json();

        await Product.create(body);
        return NextResponse.json({ message: 'Product created successfully' }, { status: 201 });
    } catch (error: any) {
        if(error.code === 11000)
        return NextResponse.json({ message: 'This category already exists.' }, { status: 409 })

        return NextResponse.json({ message: 'Failed to create products' }, { status: 500 });
    }
}