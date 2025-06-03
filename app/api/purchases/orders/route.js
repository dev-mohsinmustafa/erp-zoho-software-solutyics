import { NextResponse } from "next/server";
import db from "@/lib/db";

// POST new purchase order
export async function POST(request) {
    try {
        const data = await request.json();

        // Calculate totals
        const subTotal = data.items.reduce((acc, item) => acc + item.amount, 0);
        const discountAmount = (data.discount / 100) * subTotal;
        const totalTaxAmount = data.items.reduce((acc, item) => acc + (item.taxAmount || 0), 0);
        const total = subTotal - discountAmount + totalTaxAmount;

        // Create purchase order with items
        const purchasesOrders = await db.purchasesOrders.create({
            data: {
                purchaseOrderNumber: data.purchaseOrderNumber,
                referenceNumber: data.referenceNumber,
                orderDate: new Date(data.orderDate),
                expectedDeliveryDate: new Date(data.expectedDeliveryDate),
                supplierId: data.supplierId,
                discount: parseFloat(data.discount),
                discountAmount: discountAmount,
                subTotal: subTotal,
                totalTaxAmount: totalTaxAmount,
                total: total,
                items: {
                    create: data.items.map(item => ({
                        itemId: item.itemId,
                        title: item.title,
                        quantity: parseInt(item.quantity),
                        price: parseFloat(item.price),
                        amount: parseFloat(item.amount),
                        taxRate: parseFloat(item.taxRate || 0),
                        taxAmount: parseFloat(item.taxAmount || 0)
                    }))
                }
            },
            include: {
                items: true,
                supplier: true
            }
        });

        return NextResponse.json(purchasesOrders);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error, message: "Failed to create purchases orders" }, { status: 500 });
    }
}

// GET all purchase orders
export async function GET() {
    try {
        const purchaseOrders = await db.purchasesOrders.findMany({
            include: {
                supplier: true,
                items: {
                    include: {
                        item: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(purchaseOrders);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch purchases orders", error }, { status: 500 });
    }
}

// DELETE purchase order
export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const deletedPurchasesOrders = await db.purchasesOrders.delete({
            where: { id }
        });
        return NextResponse.json(deletedPurchasesOrders);
    } catch (error) {
        return NextResponse.json({ error, message: "Failed to delete purchases orders" }, { status: 500 });
    }
}