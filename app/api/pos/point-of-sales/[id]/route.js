import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET single POS transaction
export async function GET(request, { params }) {
    try {
        const transaction = await db.pointOfSale.findUnique({
            where: {
                id: params.id
            },
            include: {
                customer: true,
                items: {
                    include: {
                        item: true
                    }
                }
            }
        });

        if (!transaction) {
            return NextResponse.json({ message: "POS transaction not found" }, { status: 404 });
        }

        return NextResponse.json(transaction);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch POS transaction", error }, { status: 500 });
    }
}

// PUT update POS transaction
export async function PUT(request, { params }) {
    try {
        const data = await request.json();

        // Calculate totals
        const subTotal = data.items.reduce((acc, item) => acc + item.amount, 0);
        const discountAmount = (data.discount / 100) * subTotal;
        const totalTaxAmount = data.items.reduce((acc, item) => acc + (item.taxAmount || 0), 0);
        const total = subTotal - discountAmount + totalTaxAmount;

        // Set status to "Paid" if payment method is "Cash"
        const status = data.paymentMethod === "Cash" ? "Paid" : data.status;

        // First, delete existing items
        await db.pointOfSaleItem.deleteMany({
            where: {
                pointOfSaleId: params.id
            }
        });

        // Update POS transaction with new items
        const transaction = await db.pointOfSale.update({
            where: {
                id: params.id
            },
            data: {
                title: data.title,
                transactionDate: new Date(data.transactionDate),
                name: data.name,
                email: data.email,
                address: data.address,
                customerId: data.customerId,
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
        return NextResponse.json({ message: "Failed to update POS transaction", error }, { status: 500 });
    }
}

// PATCH update POS transaction status
export async function PATCH(request, { params }) {
    try {
        const { status } = await request.json();

        const transaction = await db.pointOfSale.update({
            where: { id: params.id },
            data: { status },
        });

        return NextResponse.json(transaction);
    } catch (error) {
        return NextResponse.json({ message: "Failed to update status", error }, { status: 500 });
    }
}