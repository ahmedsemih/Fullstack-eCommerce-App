import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/User";
import { connectToDatabase } from "@/utils/database";

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req })

        if(!token?.isAdmin)
        return NextResponse.json({}, { status: 401, statusText: 'You must be an admin to get all users.' });

        await connectToDatabase();

        const users = await User.find({});

        if(users.length > 0)
        return NextResponse.json({ users }, { status: 200 });

        return NextResponse.json({}, { status: 404, statusText: 'Users not found.' });
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to get users.' });
    }
}