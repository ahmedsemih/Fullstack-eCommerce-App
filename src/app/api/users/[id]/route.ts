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

        return NextResponse.json({}, { status: 404, statusText: 'User not found.' });
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to get user.' });
    }
}

export async function PUT(req: NextRequest, { params }: ParamsType) {
    try {
        const token = await getToken({ req })

        if(!token)
        return NextResponse.json({}, { status: 401, statusText: 'You must be logged in to update a user.' });

        await connectToDatabase();

        const body = await req.json();
        const user = await User.findByIdAndUpdate(params.id, body);

        if(user)
        return NextResponse.json({ message: 'User updated successfully.' }, { status: 200 });

        return NextResponse.json({}, { status: 404, statusText: 'User not found.' });
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to update user.' });
    }
}