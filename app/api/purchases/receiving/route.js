import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
    try {
        const data = await request.json();

        const receiving = await db.purchasesOrdersReceiving.create({
            data: {
                purchasesOrdersId: data.purchasesOrdersId,
                receivingNumber: data.receivingNumber,
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
                where: { id: data.purchasesOrdersId },
                data: { status: 'Paid' }
            });
        } else if (data.paymentStatus === 'Partial') {
            await db.purchasesOrders.update({
                where: { id: data.purchasesOrdersId },
                data: { status: 'Partially Paid' }
            });
        }

        return NextResponse.json(receiving);
    } catch (error) {
        return NextResponse.json({ message: "Failed to create receiving", error }, { status: 500 });
    }
}

export async function GET() {
    try {
        const receivings = await db.purchasesOrdersReceiving.findMany({
            include: {
                purchasesOrders: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(receivings);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch receivings", error }, { status: 500 });
    }
}




export async function DELETE(request) {
    try {
        // Get the ID from search Params
        const id = request.nextUrl.searchParams.get("id");

        // First get the receiving record to check purchase details
        const receiving = await db.purchasesOrdersReceiving.findUnique({
            where: { id },
            include: { purchasesOrders: true }
        });

        if (!receiving) {
            return NextResponse.json({ message: "Receiving not found" }, { status: 404 });
        }

        // Delete the receiving record
        const deletedReceiving = await db.purchasesOrdersReceiving.delete({
            where: { id }
        });

        // Check if we need to update purchase order status
        if (receiving.paymentStatus === 'Paid') {
            await db.purchasesOrders.update({
                where: { id: receiving.purchasesOrdersId },
                data: { status: 'Pending' }
            });
        }

        return NextResponse.json(deletedReceiving);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error, message: "Failed to delete receiving" },
            { status: 500 }
        );
    }
}
