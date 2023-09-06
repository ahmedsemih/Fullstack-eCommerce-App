import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/User";
import { connectToDatabase } from "@/utils/database";

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req })

        if(!token?.isAdmin)
        return NextResponse.json({ message: 'You must be an admin to get all users.' }, { status: 401 });

        await connectToDatabase();

        const users = await User.find({});

        if(users.length > 0)
        return NextResponse.json({ users }, { status: 200 });

        return NextResponse.json({ message: 'Users not found.' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to get users.' }, { status: 500 });
    }
}