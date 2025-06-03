import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
    try {
        const data = await request.json();

        const receiving = await db.invoiceReceiving.create({
            data: {
                receivingNumber: data.receivingNumber,
                receivingDate: new Date(data.receivingDate),
                invoiceId: data.invoiceId,
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

        // Update invoice status if payment is complete
        if (data.paymentStatus === 'Paid') {
            await db.invoice.update({
                where: { id: data.invoiceId },
                data: { status: 'Paid' }
            });
        }

        return NextResponse.json(receiving);
    } catch (error) {
        console.error("Receiving creation error:", error);
        return NextResponse.json({ message: "Failed to create receiving", error }, { status: 500 });
    }
}

export async function GET() {
    try {
        const receivings = await db.invoiceReceiving.findMany({
            include: {
                invoice: true
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
        // Get the ID from search Params like in invoices route
        const id = request.nextUrl.searchParams.get("id");

        // First get the receiving record to check invoice details
        const receiving = await db.invoiceReceiving.findUnique({
            where: { id },
            include: { invoice: true }
        });

        if (!receiving) {
            return NextResponse.json({ message: "Receiving not found" }, { status: 404 });
        }

        // Delete the receiving record
        const deletedReceiving = await db.invoiceReceiving.delete({
            where: { id }
        });

        // Check if we need to update invoice status
        if (receiving.paymentStatus === 'Paid') {
            await db.invoice.update({
                where: { id: receiving.invoiceId },
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