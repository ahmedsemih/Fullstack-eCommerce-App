import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";

import { connectToDatabase } from "@/utils/database";
import User from '@/models/User';

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const { password, ...body } = await req.json();
        const hashedPassword = bcrypt.hash(password, 10);

        await User.create({ password: hashedPassword, ...body });
        return NextResponse.json({ message: 'Account created successfully.' }, { status: 201 });
        
    } catch (error) {
        return NextResponse.json({ message: 'Failed to create account.' }, { status: 500 });
    }
}