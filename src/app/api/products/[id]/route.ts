import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import Product from "@/models/Product";
import { connectToDatabase } from "@/utils/database";

export async function GET(req: NextRequest, { params }: ParamsType) {
    try {
        await connectToDatabase();

        const product = await Product.findById(params.id).populate({ path:'category', strictPopulate: false });

        if(product)
        return NextResponse.json({ product }, { status: 200 });

        return NextResponse.json({ message: 'Product not found.' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to get product.' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: ParamsType) {
    try {
        const token = await getToken({ req })

        if(!token?.isAdmin)
        return NextResponse.json({ message: 'You must be an admin to update a product.' }, { status: 401 });

        await connectToDatabase(); 

        const body = await req.json();
        const product = await Product.findByIdAndUpdate(params.id, body);

        if(product)
        return NextResponse.json({ message: 'Product updated successfully.' }, { status: 200 });

        return NextResponse.json({ message: 'Product not found.' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update product.' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: ParamsType) {
    try {
        const token = await getToken({ req })

        if(!token?.isAdmin)
        return NextResponse.json({ message: 'You must be an admin to delete a product.' }, { status: 401 });

        await connectToDatabase();

        const product = await Product.findByIdAndDelete(params.id);

        if(product)
        return NextResponse.json({ message: 'Product deleted successfully.' }, { status: 200 });

        return NextResponse.json({ message: 'Product not found.' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update product.' }, { status: 500 });
    }
}