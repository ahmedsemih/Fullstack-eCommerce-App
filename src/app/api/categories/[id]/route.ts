import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import Category from '@/models/Category';
import { connectToDatabase } from '@/utils/database';

export async function GET(req: NextRequest, { params }: ParamsType) {
    try {
        await connectToDatabase();

        const category = await Category.findById(params.id);

        if(category)
        return NextResponse.json({ category }, { status: 200 });

        return NextResponse.json({}, { status: 404, statusText: 'Category not found.' });
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to get category' });
    }
}

export async function PUT(req: NextRequest, { params }: ParamsType) {
    try {
        const token = await getToken({ req })

        if(!token?.isAdmin)
        return NextResponse.json({}, { status: 401, statusText: 'You must be an admin to update a category.' });

        await connectToDatabase();

        const { name } = await req.json();
        const category = await Category.findByIdAndUpdate(params.id, { name });

        if(category)
        return NextResponse.json({ message: 'Category updated successfully.' }, { status: 200 });

        return NextResponse.json({}, { status: 404, statusText: 'Category not found.' })
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to update category' });
    }
}

export async function DELETE(req: NextRequest, { params }: ParamsType) {
    try {
        const token = await getToken({ req })

        if(!token?.isAdmin)
        return NextResponse.json({}, { status: 401, statusText: 'You must be an admin to delete a category.' });

        await connectToDatabase();

        const category = await Category.findByIdAndDelete(params.id);

        if(category)
        return NextResponse.json({ message: 'Category deleted successfully.' }, { status: 200 });

        return NextResponse.json({}, { status: 404, statusText: 'Category not found.' });
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to delete category' });
    }
}