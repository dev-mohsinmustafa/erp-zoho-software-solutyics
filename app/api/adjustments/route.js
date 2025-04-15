import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {  itemId, referenceNumber,transferStockQty, givingWarehouseId, receivingWarehouseId, notes,  } = await request.json();
        // const adjustment = {   itemId, referenceNumber,transferStockQty, givingWarehouseId, receivingWarehouseId, notes, };
        const adjustment = await db.transferStockQty.create({
            data: {
                itemId,
                referenceNumber, 
                transferStockQty: parseInt(transferStockQty),
                givingWarehouseId,
                receivingWarehouseId,
                notes,
            }
        })
        console.log(adjustment);
        return NextResponse.json(adjustment);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message:"Failed to create a adjustment" }, { status: 500 });
    }
}



