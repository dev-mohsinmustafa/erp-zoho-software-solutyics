import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET all POS transactions
export async function GET() {
    try {
        const transactions = await db.pointOfSale.findMany({
            include: {
                customer: true,
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
        return NextResponse.json(transactions);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch POS transactions", error }, { status: 500 });
    }
}

// POST new POS transaction
export async function POST(request) {
    try {
        const data = await request.json();

        // Generate a transaction ID if not provided
        if (!data.transactionId) {
            data.transactionId = `POS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        }

        // Calculate totals
        const subTotal = data.items.reduce((acc, item) => acc + item.amount, 0);
        const discountAmount = (data.discount / 100) * subTotal;
        const totalTaxAmount = data.items.reduce((acc, item) => acc + (item.taxAmount || 0), 0);
        const total = subTotal - discountAmount + totalTaxAmount;

        // Set status to "Paid" if payment method is "Cash"
        const status = data.paymentMethod === "Cash" ? "Paid" : "Pending";

        // Create POS transaction with items
        const transaction = await db.pointOfSale.create({
            data: {
                transactionId: data.transactionId,
                title: data.title,
                transactionDate: new Date(data.transactionDate),
                name: data.name,
                email: data.email,
                address: data.address,
                customerId: data.customerId,  // Optional field
                currency: data.currency,
                paymentMethod: data.paymentMethod,
                status: status,
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
                customer: true
            }
        });

        return NextResponse.json(transaction);
    } catch (error) {
        console.error("POS transaction creation error:", error);
        return NextResponse.json({ message: "Failed to create POS transaction", error }, { status: 500 });
    }
}

// DELETE POS transaction
export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const deletedTransaction = await db.pointOfSale.delete({
            where: {
                id,
            },
        });
        return NextResponse.json(deletedTransaction);
    } catch (error) {
        return NextResponse.json({ error, message: "Failed to Delete the POS Transaction" }, { status: 500 });
    }
}