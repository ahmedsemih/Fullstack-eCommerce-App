import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import Selection from "@/models/Selection";
import { connectToDatabase } from "@/utils/database";

export async function GET(req: NextRequest, { params }: ParamsType) {
    try {
        await connectToDatabase();

        const selection = await Selection.findById(params.id).populate({ path:'product', strictPopulate: false });

        if(selection)
        return NextResponse.json({ selection }, { status: 200 });

        return NextResponse.json({}, { status: 404, statusText: 'Selection not found.' });
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to get selection.' });
    }
}

export async function PUT(req: NextRequest, { params }: ParamsType) {
    try {
        const token = await getToken({ req })

        if(!token)
        return NextResponse.json({}, { status: 401, statusText: 'You must be logged in to update a selection.' });

        await connectToDatabase();

        const body = await req.json();
        const selection = await Selection.findByIdAndUpdate(params.id, body);

        if(selection)
        return NextResponse.json({}, { status: 200, statusText: 'Selection updated successfully.' });
        
        return NextResponse.json({}, { status: 404, statusText: 'Selection not found.' });
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to update selection.' });
    }
}

export async function DELETE(req: NextRequest, { params }: ParamsType) {
    try {
        const token = await getToken({ req })

        if(!token)
        return NextResponse.json({}, { status: 401, statusText: 'You must be logged in to delete a selection.'});

        await connectToDatabase();

        const selection = await Selection.findByIdAndDelete(params.id);

        if(selection)
        return NextResponse.json({}, { status: 200, statusText: 'Selection deleted successfully.' });

        return NextResponse.json({}, { status: 404, statusText: 'Selection not found.' });
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to delete selection.' });
    }
}