import { NextRequest, NextResponse } from "next/server";

import Selection from "@/models/Selection";
import { connectToDatabase } from "@/utils/database";

export async function GET(req: NextRequest, { params }: ParamsType) {
    try {
        await connectToDatabase();

        const selections = await Selection.find({ user: params.id }).populate({ path:'product', strictPopulate: false });

        if(selections.length > 0)
        return NextResponse.json({selections}, { status: 200 });

        return NextResponse.json({}, { status: 404, statusText: 'Selections not found.' });
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to get selection.' });
    }
}