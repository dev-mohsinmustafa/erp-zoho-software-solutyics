import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET single customer
export async function GET(request, { params }) {
    try {
        const customer = await prisma.customer.findUnique({
            where: {
                id: params.id
            }
        });
        
        if (!customer) {
            return NextResponse.json({ message: "Customer not found" }, { status: 404 });
        }
        
        return NextResponse.json(customer);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch customer", error }, { status: 500 });
    }
}

// PUT update customer
export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        const customer = await prisma.customer.update({
            where: {
                id: params.id
            },
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
                notes: data.notes,
                updatedAt: new Date()
            }
        });
        return NextResponse.json(customer);
    } catch (error) {
        return NextResponse.json({ message: "Failed to update customer", error }, { status: 500 });
    }
}

// DELETE customer
export async function DELETE(request, { params }) {
    try {
        await prisma.customer.delete({
            where: {
                id: params.id
            }
        });
        return NextResponse.json({ message: "Customer deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete customer", error }, { status: 500 });
    }
}