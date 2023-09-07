import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import Selection from "@/models/Selection";
import { connectToDatabase } from "@/utils/database";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req })

        if(!token)
        return NextResponse.json({ message: 'You must be logged in to create a selection.' }, { status: 401 });

        await connectToDatabase();

        const body = await req.json();

        await Selection.create(body);
        return NextResponse.json({ message: 'Selection created successfully.' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to create selection.' }, { status: 500 });
    }
}