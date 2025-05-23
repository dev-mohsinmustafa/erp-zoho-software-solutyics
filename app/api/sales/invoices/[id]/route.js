import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET single invoice
export async function GET(request, { params }) {
    try {
        const invoice = await db.invoice.findUnique({
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

        if (!invoice) {
            return NextResponse.json({ message: "Invoice not found" }, { status: 404 });
        }

        return NextResponse.json(invoice);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch invoice", error }, { status: 500 });
    }
}

// PUT update invoice
export async function PUT(request, { params }) {
    try {
        const data = await request.json();

        // Calculate totals
        const subTotal = data.items.reduce((acc, item) => acc + item.amount, 0);
        const discountAmount = (data.discount / 100) * subTotal;
        const total = subTotal - discountAmount;

        // First, delete existing items
        await db.invoiceItem.deleteMany({
            where: {
                invoiceId: params.id
            }
        });

        // Update invoice with new items
        const invoice = await db.invoice.update({
            where: {
                id: params.id
            },
            data: {
                title: data.title,
                invoiceDate: new Date(data.invoiceDate),
                dueDate: new Date(data.dueDate),
                orderNumber: data.orderNumber,
                name: data.name,
                email: data.email,
                address: data.address,
                customerId: data.customerId,
                currency: data.currency,
                discount: parseFloat(data.discount),
                discountAmount: discountAmount,
                subTotal: subTotal,
                total: total,
                items: {
                    create: data.items.map(item => ({
                        itemId: item.itemId,
                        title: item.title,
                        quantity: parseInt(item.quantity),
                        price: parseFloat(item.price),
                        amount: parseFloat(item.amount)
                    }))
                }
            },
            include: {
                items: true,
                customer: true
            }
        });

        return NextResponse.json(invoice);
    } catch (error) {
        return NextResponse.json({ message: "Failed to update invoice", error }, { status: 500 });
    }
}

// DELETE invoice
// export async function DELETE(request, { params }) {
//     try {
//         // First delete all related invoice items
//         await db.invoiceItem.deleteMany({
//             where: {
//                 invoiceId: params.id
//             }
//         });

//         // Then delete the invoice
//         const invoice = await db.invoice.delete({
//             where: {
//                 id: params.id
//             }
//         });

//         return NextResponse.json(invoice);
//     } catch (error) {
//         return NextResponse.json({ message: "Failed to delete invoice", error }, { status: 500 });
//     }
// }

