import Category from "@/models/Category";
import Product from "@/models/Product";
import { connectToDatabase } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: ParamsType) {
    try {
        await connectToDatabase();

        let products = [];

        if(params.id === 'top'){
            products = await Product.find({}).sort({ numberOfSales : 'desc' }).limit(9).populate('category');
        } else {
            let category = await Category.findOne({ name: params.id });
            products = await Product.find({ category: category._id }).populate('category');
        }
        
        if(products.length > 0)
        return NextResponse.json({ products }, { status: 200 });

        return NextResponse.json({ message: 'Products not found.' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to get products.' }, { status: 500 });
    }
}