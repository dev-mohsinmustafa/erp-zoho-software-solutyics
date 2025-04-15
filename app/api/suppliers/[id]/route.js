import db from "@/lib/db";
import { NextResponse } from "next/server";


// For Edit we getData
export async function GET(request, { params: { id } }) {
    try {
        // findUnique is used to Fetch single supplier
        const supplier = await db.supplier.findUnique({
            where: {
                id,
            },
        });
        console.log(supplier);
        return NextResponse.json(supplier);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Supplier" }, { status: 500 });
    }
}




// Now For Edit we updateData

export async function PUT(request, { params: { id } }) {
    try {
        const {
            title,
            phone,
            email,
            address } = await request.json();
        // update is used to Update single supplier
        const supplier = await db.supplier.update({
            where: {
                id,
            },
            data: {
                title,
                phone,
                email,
                address
            }
        });
        console.log(supplier);
        return NextResponse.json(supplier);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Update the Supplier" }, { status: 500 });
    }
}