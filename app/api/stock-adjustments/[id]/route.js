import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Fetch single stock adjustment
export async function GET(req, { params }) {
    try {
        const stockAdjustment = await prisma.stockAdjustment.findUnique({
            where: {
                id: params.id
            },
            include: {
                item: true,
                warehouse: true,
                category: true,
                unit: true,
                brand: true,
            }
        });
        
        if (!stockAdjustment) {
            return NextResponse.json(
                { message: "Stock adjustment not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(stockAdjustment);
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching stock adjustment", error: error.message },
            { status: 500 }
        );
    }
}

// PUT: Update stock adjustment
export async function PUT(req, { params }) {
    try {
        const data = await req.json();
        
        // Start a transaction
        const result = await prisma.$transaction(async (prisma) => {
            // 1. Get the original stock adjustment
            const originalAdjustment = await prisma.stockAdjustment.findUnique({
                where: { id: params.id }
            });

            // 2. Reverse the original stock change
            const originalStockChange = originalAdjustment.adjustmentType === 'addition' || originalAdjustment.adjustmentType === 'return'
                ? -originalAdjustment.quantity
                : originalAdjustment.quantity;

            // 3. Calculate new stock change
            const newStockChange = data.adjustmentType === 'addition' || data.adjustmentType === 'return'
                ? data.quantity
                : -data.quantity;

            // 4. Update the stock adjustment
            const updatedAdjustment = await prisma.stockAdjustment.update({
                where: { id: params.id },
                data: {
                    adjustmentType: data.adjustmentType,
                    quantity: data.quantity,
                    adjustmentDate: data.adjustmentDate,
                    reason: data.reason,
                    currentStock: data.currentStock,
                    itemId: data.itemId,
                    warehouseId: data.warehouseId,
                    categoryId: data.categoryId,
                    unitId: data.unitId,
                    brandId: data.brandId,
                }
            });

            // 5. Update item stock
            await prisma.item.update({
                where: { id: data.itemId },
                data: {
                    currentStock: {
                        increment: originalStockChange + newStockChange
                    }
                }
            });

            return updatedAdjustment;
        });

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { message: "Error updating stock adjustment", error: error.message },
            { status: 500 }
        );
    }
}

// DELETE: Delete stock adjustment
export async function DELETE(req, { params }) {
    try {
        // Start a transaction
        const result = await prisma.$transaction(async (prisma) => {
            // 1. Get the stock adjustment to be deleted
            const adjustment = await prisma.stockAdjustment.findUnique({
                where: { id: params.id }
            });

            // 2. Calculate stock reversal
            const stockReversal = adjustment.adjustmentType === 'addition' || adjustment.adjustmentType === 'return'
                ? -adjustment.quantity
                : adjustment.quantity;

            // 3. Update item stock
            await prisma.item.update({
                where: { id: adjustment.itemId },
                data: {
                    currentStock: {
                        increment: stockReversal
                    }
                }
            });

            // 4. Delete the stock adjustment
            await prisma.stockAdjustment.delete({
                where: { id: params.id }
            });

            return { message: "Stock adjustment deleted successfully" };
        });

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting stock adjustment", error: error.message },
            { status: 500 }
        );
    }
}