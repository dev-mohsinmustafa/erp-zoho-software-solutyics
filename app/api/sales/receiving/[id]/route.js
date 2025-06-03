import { NextResponse } from "next/server";
import db from "@/lib/db";

// Get a single receiving record
export async function GET(request, { params }) {
    try {
        const receiving = await db.invoiceReceiving.findUnique({
            where: { id: params.id },
            include: {
                invoice: true
            }
        });

        if (!receiving) {
            return NextResponse.json({ message: "Receiving not found" }, { status: 404 });
        }

        return NextResponse.json(receiving);
    } catch (error) {
        return NextResponse.json(
            { error, message: "Failed to fetch receiving" },
            { status: 500 }
        );
    }
}

// Update a receiving record
export async function PUT(request, { params }) {
    try {
        const data = await request.json();

        // First get the current receiving record
        const currentReceiving = await db.invoiceReceiving.findUnique({
            where: { id: params.id }
        });

        if (!currentReceiving) {
            return NextResponse.json({ message: "Receiving not found" }, { status: 404 });
        }

        const receiving = await db.invoiceReceiving.update({
            where: { id: params.id },
            data: {
                receivingNumber: data.receivingNumber,
                receivingDate: new Date(data.receivingDate),
                paymentMethod: data.paymentMethod,
                amountReceived: parseFloat(data.amountReceived),
                remainingBalance: parseFloat(data.remainingBalance),
                paymentStatus: data.paymentStatus,
                bankName: data.bankName,
                chequeNumber: data.chequeNumber,
                transactionReference: data.transactionReference,
                notes: data.notes
            }
        });

        // Update invoice status if payment status changed
        if (data.paymentStatus === 'Paid' && currentReceiving.paymentStatus !== 'Paid') {
            await db.invoice.update({
                where: { id: receiving.invoiceId },
                data: { status: 'Paid' }
            });
        } else if (data.paymentStatus !== 'Paid' && currentReceiving.paymentStatus === 'Paid') {
            await db.invoice.update({
                where: { id: receiving.invoiceId },
                data: { status: 'Pending' }
            });
        }

        return NextResponse.json(receiving);
    } catch (error) {
        console.error("Receiving update error:", error);
        return NextResponse.json(
            { error, message: "Failed to update receiving" },
            { status: 500 }
        );
    }
}