import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET all customers
export async function GET() {
    try {
        const customers = await db.customer.findMany({
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

        // Check if customer code already exists
        const existingCustomer = await db.customer.findUnique({
            where: {
                customerCode: data.customerCode
            }
        });

        if (existingCustomer) {
            return NextResponse.json(
                { message: "Customer code already exists" },
                { status: 400 }
            );
        }

        const customer = await db.customer.create({
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
        return NextResponse.json({ message: "Failed to create customer", error }, { status: 500 });
    }
}




// // DELETE customer
export async function DELETE(request) {
    try {
        // How to get the ID from search Params
        const id = request.nextUrl.searchParams.get("id")
        const deletedCustomer = await db.customer.delete({
            where: {
                id,
            },
        })
        console.log(deletedCustomer);
        return NextResponse.json(deletedCustomer);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Delete the Customer" }, { status: 500 });
    }
}
