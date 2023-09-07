import Selection from "@/models/Selection";
import { connectToDatabase } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: ParamsType) {
    try {
        await connectToDatabase();

        const selections = await Selection.find({ user: params.id }).populate('product');

        if(selections.length > 0)
        return NextResponse.json({selections}, { status: 200 });

        return NextResponse.json({ message: 'Selections not found.' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to get selection.' }, { status: 500 });
    }
}