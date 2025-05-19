import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // here our schema name is title not name thats why we use title instead of name
        const { title, phone, email, address, contactPerson, supplierCode, paymentTerms, taxID, notes, } = await request.json();
        // const suppliers = { name, phone, email, address, contactPerson, supplierCode,paymentTerms, taxID, notes, };
        const supplier = await db.supplier.create({
            data: {
                title, phone, email, address, contactPerson, supplierCode, paymentTerms, taxID, notes,
            }
        });
        console.log(supplier);
        return NextResponse.json(supplier);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to create a Supplier" }, { status: 500 });
    }
}




export async function GET(request) {
    try {
        // findMany is used to Fetch all the suppliers
        const suppliers = await db.supplier.findMany({
            orderBy: {
                createdAt: 'desc', // Latest Suppliers Show First'asc' for ascending, 'desc' for descending
            },
            include: {
                requestBasedPurchaseOrders: true // Include the relations
            }
        });
        console.log(suppliers);
        return NextResponse.json(suppliers);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Supplier" }, { status: 500 });
    }
}




export async function DELETE(request) {
    try {
        // How to get the ID from search Params
        const id = request.nextUrl.searchParams.get("id")
        const deletedSupplier = await db.supplier.delete({
            where: {
                id,
            },
        })
        console.log(deletedSupplier);
        return NextResponse.json(deletedSupplier);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Delete the Supplier" }, { status: 500 });
    }
}
