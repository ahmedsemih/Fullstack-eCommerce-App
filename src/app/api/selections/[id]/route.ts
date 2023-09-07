import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import Selection from "@/models/Selection";
import { connectToDatabase } from "@/utils/database";

export async function GET(req: NextRequest, { params }: ParamsType) {
    try {
        await connectToDatabase();

        const selection = await Selection.findById(params.id).populate('product');

        if(selection)
        return NextResponse.json({ selection }, { status: 200 });

        return NextResponse.json({ message: 'Selection not found.' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to get selection.' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: ParamsType) {
    try {
        const token = await getToken({ req })

        if(!token)
        return NextResponse.json({ message: 'You must be logged in to update a selection.' }, { status: 401 });

        await connectToDatabase();

        const body = await req.json();
        const selection = await Selection.findByIdAndUpdate(params.id, body);

        if(selection)
        return NextResponse.json({ message: 'Selection updated successfully.' }, { status: 200 });
        
        return NextResponse.json({ message: 'Selection not found.' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update selection.' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: ParamsType) {
    try {
        const token = await getToken({ req })

        if(!token)
        return NextResponse.json({ message: 'You must be logged in to delete a selection.' }, { status: 401 });

        await connectToDatabase();

        const selection = await Selection.findByIdAndDelete(params.id);

        if(selection)
        return NextResponse.json({ message: 'Selection deleted successfully.' }, { status: 200 });

        return NextResponse.json({ message: 'Selection not found.' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete selection.' }, { status: 500 });
    }
}