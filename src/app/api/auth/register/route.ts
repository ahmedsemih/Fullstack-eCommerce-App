import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";

import { connectToDatabase } from "@/utils/database";
import User from '@/models/User';

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const { password, ...body } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ password: hashedPassword, ...body });
        return NextResponse.json({ message: 'Account created successfully.' }, { status: 201 });
    } catch (error: any) {
        if(error.code === 11000)
        return NextResponse.json({}, { status: 500, statusText: 'This email is already in use.' });

        return NextResponse.json({}, { status: 500, statusText: 'Failed to create account.' });
    }
}