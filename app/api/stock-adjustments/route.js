import db from "@/lib/db";
import { NextResponse } from "next/server";

const TAG = "StockAdjustment/Route.js API:";

export async function POST(request) {
    try {

        const data = await request.json();
        const { warehouseId, itemId, adjustmentType, quantity, adjustmentNumber, adjustmentDate, reason } = data;
        // console.log(TAG, "Received stock adjustment data:", stockData);


        //
        // Get current warehouse and item
        const warehouse = await db.warehouse.findUnique({
            where: { id: warehouseId },
            include: { items: true }
        });

        const item = await db.item.findUnique({
            where: { id: itemId }
        });

        if (!warehouse || !item) {
            throw new Error("Warehouse or Item not found");
        }

        // Calculate new quantities based on adjustment type
        const adjustmentQty = parseFloat(quantity);
        const newWarehouseStock = adjustmentType === "addition"
            ? warehouse.stockQty + adjustmentQty
            : adjustmentType === "subtraction"
                ? warehouse.stockQty - adjustmentQty
                : warehouse.stockQty;

        const newItemStock = adjustmentType === "addition"
            ? item.quantity + adjustmentQty
            : adjustmentType === "subtraction"
                ? item.quantity - adjustmentQty
                : item.quantity;

        // Check for negative stock
        if (newWarehouseStock < 0 || newItemStock < 0) {
            throw new Error("Stock cannot be negative");
        }

        // Update warehouse stock
        await db.warehouse.update({
            where: { id: warehouseId },
            data: { stockQty: newWarehouseStock }
        });

        // Update item stock
        await db.item.update({
            where: { id: itemId },
            data: { quantity: newItemStock }
        });

        //


        // Create stock adjustment record
        const stockAdjustment = await db.stockAdjustment.create({
            data: {
                warehouseId,
                itemId,
                currentStock: parseFloat(data.currentStock),
                adjustmentNumber,
                adjustmentType,
                quantity: adjustmentQty,
                adjustmentDate: new Date(adjustmentDate),
                reason,

            }
        });

        return NextResponse.json(stockAdjustment);
    } catch (error) {
        console.error(TAG, "Error:", error);
        return NextResponse.json({ error, message: "Failed to Create Stock Adjustment" }, { status: 500 });
    }
}




// Add GET endpoint to fetch all stock adjustments
export async function GET() {
    try {
        const stockAdjustments = await db.stockAdjustment.findMany({
            include: {
                warehouse: true,
                item: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(stockAdjustments);
    } catch (error) {
        console.error(TAG, "Error:", error);
        return NextResponse.json(
            { error, message: "Failed to fetch Stock Adjustments" },
            { status: 500 }
        );
    }
}



// PATCH-DELETE / DELETE

// Add DELETE endpoint to delete a stock adjustment
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: "ID is required" },
                { status: 400 }
            );
        }

        // Get the stock adjustment to be deleted
        const stockAdjustment = await db.stockAdjustment.findUnique({
            where: { id },
            include: {
                warehouse: true,
                item: true
            }
        });

        if (!stockAdjustment) {
            return NextResponse.json(
                { error: "Stock Adjustment not found" },
                { status: 404 }
            );
        }

        // Reverse the stock adjustment
        const adjustmentQty = parseFloat(stockAdjustment.quantity);
        const newWarehouseStock = stockAdjustment.adjustmentType === "addition"
            ? stockAdjustment.warehouse.stockQty - adjustmentQty
            : stockAdjustment.adjustmentType === "subtraction"
                ? stockAdjustment.warehouse.stockQty + adjustmentQty
                : stockAdjustment.warehouse.stockQty;

        const newItemStock = stockAdjustment.adjustmentType === "addition"
            ? stockAdjustment.item.quantity - adjustmentQty
            : stockAdjustment.adjustmentType === "subtraction"
                ? stockAdjustment.item.quantity + adjustmentQty
                : stockAdjustment.item.quantity;

        // Update warehouse stock
        await db.warehouse.update({
            where: { id: stockAdjustment.warehouseId },
            data: { stockQty: newWarehouseStock }
        });

        // Update item stock
        await db.item.update({
            where: { id: stockAdjustment.itemId },
            data: { quantity: newItemStock }
        });

        // Delete the stock adjustment
        const deletedAdjustment = await db.stockAdjustment.delete({
            where: { id }
        });

        return NextResponse.json(deletedAdjustment);
    } catch (error) {
        console.error(TAG, "Error:", error);
        return NextResponse.json(
            { error, message: "Failed to delete Stock Adjustment" },
            { status: 500 }
        );
    }
}