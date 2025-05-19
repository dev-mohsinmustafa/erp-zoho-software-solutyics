import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET all customers
export async function GET() {
    try {
        const customers = await prisma.customer.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(customers);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch customers", error }, { status: 500 });
    }
}

// POST new customer
export async function POST(request) {
    try {
        const data = await request.json();
        const customer = await prisma.customer.create({
            data: {
                customerCode: data.customerCode,
                name: data.name,
                type: data.type,
                status: data.status,
                phone: data.phone,
                email: data.email,
                address: data.address,
                taxID: data.taxID,
                paymentTerms: data.paymentTerms,
                notes: data.notes
            }
        });
        return NextResponse.json(customer);
    } catch (error) {
        return NextResponse.json({ message: "Failed to create customer", error }, { status: 500 });
    }
}