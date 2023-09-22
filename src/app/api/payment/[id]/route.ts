import { NextRequest, NextResponse } from "next/server";

import Order from "@/models/Order";
import { connectToDatabase } from "@/utils/database";

export async function GET(req: NextRequest, { params }: ParamsType) {
    try {
        await connectToDatabase();

        const order = await Order.findOneAndUpdate({ intentId: params.id }, { status: true });

        if(order)
        return NextResponse.json({}, { status: 200, statusText: 'Order updated successfully.' });

        return NextResponse.json({}, { status: 404, statusText: 'Order not found.' });
    } catch (error) {
        return NextResponse.json({}, { status: 500, statusText: 'Failed to update order.' });
    }
}