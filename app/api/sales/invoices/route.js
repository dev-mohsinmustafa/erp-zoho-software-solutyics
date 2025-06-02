import { NextResponse } from "next/server";
import db from "@/lib/db";


// POST new invoice
export async function POST(request) {
    try {
        const data = await request.json();

        // Calculate totals
        const subTotal = data.items.reduce((acc, item) => acc + item.amount, 0);
        const discountAmount = (data.discount / 100) * subTotal;
        const totalTaxAmount = data.items.reduce((acc, item) => acc + (item.taxAmount || 0), 0);
        const total = subTotal - discountAmount + totalTaxAmount;

        // Set status to "Paid" if payment method is "Cash"
        const status = data.paymentMethod === "Cash" ? "Paid" : "Draft";

        // Create invoice with items
        const invoice = await db.invoice.create({
            data: {
                title: data.title,
                customerId: data.customerId,
                invoiceDate: new Date(data.invoiceDate),
                invoiceNumber: data.invoiceNumber,
                dueDate: new Date(data.dueDate),
                orderNumber: data.orderNumber,
                transactionDate: new Date(data.transactionDate),
                transactionId: data.transactionId,
                paymentMethod: data.paymentMethod,
                status: status,
                name: data.name,
                email: data.email,
                address: data.address,
                currency: data.currency,
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

        return NextResponse.json(invoice);
    } catch (error) {
        console.error("Invoice creation error:", error);
        return NextResponse.json({ message: "Failed to create invoice", error }, { status: 500 });
    }
}



// GET all invoices
export async function GET() {
    try {
        const invoices = await db.invoice.findMany({
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
        return NextResponse.json(invoices);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch invoices", error }, { status: 500 });
    }
}



// DELETE customer
export async function DELETE(request) {
    try {
        // How to get the ID from search Params
        const id = request.nextUrl.searchParams.get("id")
        const deletedInvoice = await db.invoice.delete({
            where: {
                id,
            },
        })
        console.log(deletedInvoice);
        return NextResponse.json(deletedInvoice);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Delete the Invoice" }, { status: 500 });
    }
}





