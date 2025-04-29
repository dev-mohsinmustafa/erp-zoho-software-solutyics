import db from "@/lib/db";
import { NextResponse } from "next/server";

const TAG = "StockAdjustment/Route.js API:";

export async function POST(request) {
    try {
        const stockData = await request.json();
        console.log(TAG, "Received stock adjustment data:", stockData);


        
        // Create stock adjustment record
        const stockAdjustment = await db.stockAdjustment.create({
            data: {
                adjustmentNumber: stockData.adjustmentNumber,
                adjustmentType: stockData.adjustmentType,
                quantity: stockData.quantity,
                currentStock: parseFloat(stockData.currentStock),
                adjustmentDate: new Date(stockData.adjustmentDate),
                reason: stockData.reason,
                itemId: stockData.itemId,
                warehouseId: stockData.warehouseId,
           
            }
        });
    
        return NextResponse.json(stockAdjustment);
    } catch (error) {
        console.error(TAG, "Error:", error);
        return NextResponse.json({ error, message: "Failed to Create Stock Adjustment" }, { status: 500 });
    }
}
