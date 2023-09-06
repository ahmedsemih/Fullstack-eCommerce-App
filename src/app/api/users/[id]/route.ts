import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/User";
import { connectToDatabase } from "@/utils/database";

export async function GET(req: NextRequest, { params }: ParamsType) {
    try {
        await connectToDatabase();
        
        const user = await User.findById(params.id);

        if(user)
        return NextResponse.json({ user }, { status: 200 });

        return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to get user.' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: ParamsType) {
    try {
        const token = await getToken({ req })

        if(!token)
        return NextResponse.json({ message: 'You must be logged in to update a user.' }, { status: 401 });

        await connectToDatabase();

        const body = await req.json();
        const user = await User.findByIdAndUpdate(params.id, body);

        if(user)
        return NextResponse.json({ message: 'User updated successfully.' }, { status: 200 });

        return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update user.' }, { status: 500 });
    }
}