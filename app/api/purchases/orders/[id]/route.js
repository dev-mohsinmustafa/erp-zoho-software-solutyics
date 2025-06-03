import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET single purchase order
export async function GET(request, { params }) {
    try {
        const purchasesOrders = await db.purchasesOrders.findUnique({
            where: {
                id: params.id
            },
            include: {
                supplier: true,
                items: {
                    include: {
                        item: true
                    }
                }
            }
        });

        if (!purchasesOrders) {
            return NextResponse.json({ message: "Purchases orders not found" }, { status: 404 });
        }

        return NextResponse.json(purchasesOrders);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch purchases orders", error }, { status: 500 });
    }
}

// PUT update purchase order
export async function PUT(request, { params }) {
    try {
        const data = await request.json();

        // Calculate totals
        const subTotal = data.items.reduce((acc, item) => acc + item.amount, 0);
        const discountAmount = (data.discount / 100) * subTotal;
        const totalTaxAmount = data.items.reduce((acc, item) => acc + (item.taxAmount || 0), 0);
        const total = subTotal - discountAmount + totalTaxAmount;

        // First, delete existing items
        await db.purchasesOrdersItem.deleteMany({
            where: {
                purchasesOrdersId: params.id
            }
        });

        // Update purchase order with new items
        const purchasesOrders = await db.purchasesOrders.update({
            where: {
                id: params.id
            },
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
        return NextResponse.json({ message: "Failed to update purchases orders", error }, { status: 500 });
    }
}

// PATCH update purchase order status
export async function PATCH(request, { params }) {
    try {
        const { status } = await request.json();

        const purchasesOrders = await db.purchasesOrders.update({
            where: { id: params.id },
            data: { status },
        });

        return NextResponse.json(purchasesOrders);
    } catch (error) {
        return NextResponse.json({ message: "Failed to update status", error }, { status: 500 });
    }
}