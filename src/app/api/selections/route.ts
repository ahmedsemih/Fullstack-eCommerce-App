import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import Selection from "@/models/Selection";
import { connectToDatabase } from "@/utils/database";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const url = new URL(req.url);
        const productId = url.searchParams.get("productId");
        const userId = url.searchParams.get("userId");
        
        const selection = await Selection.findOne({ product: productId, user: userId }).sort({ createdAt: -1 });

        if(selection)
        return NextResponse.json({ selection }, { status: 200 });

        return NextResponse.json({}, { status: 404, statusText: 'Selection not found.' })

    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to get selection.' });
    }
}

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req })

        if(!token)
        return NextResponse.json({}, { status: 401, statusText: 'You must be logged in to create a selection.' });

        await connectToDatabase();

        const body = await req.json();

        const selection = await Selection.create(body);
        return NextResponse.json({ selection }, { status: 201 });
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to create selection.' });
    }
}