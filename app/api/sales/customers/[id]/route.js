import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET single customer
export async function GET(request, { params }) {
    try {
        const customer = await db.customer.findUnique({
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

        // Check if customer exists
        const existingCustomer = await db.customer.findUnique({
            where: {
                id: params.id
            }
        });

        if (!existingCustomer) {
            return NextResponse.json({ message: "Customer not found" }, { status: 404 });
        }

        // Check if new customer code conflicts with other customers
        if (data.customerCode !== existingCustomer.customerCode) {
            const codeConflict = await db.customer.findUnique({
                where: {
                    customerCode: data.customerCode
                }
            });

            if (codeConflict) {
                return NextResponse.json(
                    { message: "Customer code already exists" },
                    { status: 400 }
                );
            }
        }

        const customer = await db.customer.update({
            where: {
                id: params.id
            },
            data: {
                customerCode: data.customerCode,
                name: data.name,
                email: data.email,
                phone: data.phone,
                website: data.website,
                reference: data.reference,
                taxNumber: data.taxNumber,
                currency: data.currency,
                address: data.address,
                town: data.town,
                postalCode: data.postalCode,
                province: data.province,
                notes: data.notes
            }
        });
        return NextResponse.json(customer);
    } catch (error) {
        return NextResponse.json({ message: "Failed to update customer", error }, { status: 500 });
    }
}

