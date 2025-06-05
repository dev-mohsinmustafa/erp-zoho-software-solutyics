import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request, { params }) {
    try {
        const receiving = await db.purchasesOrdersReceiving.findUnique({
            where: { id: params.id },
            include: {
                purchasesOrders: true
            }
        });

        if (!receiving) {
            return NextResponse.json({ message: "Receiving not found" }, { status: 404 });
        }

        return NextResponse.json(receiving);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch receiving", error }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const data = await request.json();

        // First get the current receiving record
        const currentReceiving = await db.purchasesOrdersReceiving.findUnique({
            where: { id: params.id }
        });

        if (!currentReceiving) {
            return NextResponse.json({ message: "Receiving not found" }, { status: 404 });
        }

        const receiving = await db.purchasesOrdersReceiving.update({
            where: { id: params.id },
            data: {
                receivingDate: new Date(data.receivingDate),
                paymentMethod: data.paymentMethod,
                amountPaid: parseFloat(data.amountPaid),
                remainingBalance: parseFloat(data.remainingBalance),
                paymentStatus: data.paymentStatus,
                bankName: data.bankName,
                chequeNumber: data.chequeNumber,
                transactionReference: data.transactionReference,
                notes: data.notes
            }
        });

        // Update purchase order status if needed
        if (data.paymentStatus === 'Paid') {
            await db.purchasesOrders.update({
                where: { id: data.purchaseOrderId },
                data: { status: 'Paid' }
            });
        } else if (data.paymentStatus === 'Partial') {
            await db.purchasesOrders.update({
                where: { id: data.purchaseOrderId },
                data: { status: 'Partial' }
            });
        }

        return NextResponse.json(receiving);
    } catch (error) {
        return NextResponse.json({ message: "Failed to update receiving", error }, { status: 500 });
    }
}

