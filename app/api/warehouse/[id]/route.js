import db from "@/lib/db";
import { NextResponse } from "next/server";


// For Edit we getData
export async function GET(request, { params: { id } }) {
    try {
        // findUnique is used to Fetch single warehouse
        const warehouse = await db.warehouse.findUnique({
            where: {
                id,
            },
        });
        console.log(warehouse);
        return NextResponse.json(warehouse);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Warehouse" }, { status: 500 });
    }
}




// Now For Edit we updateData

export async function PUT(request, { params: { id } }) {
    try {
        const { title, location, description, type  } = await request.json();
        // update is used to Update single warehouse
        const warehouse = await db.warehouse.update({
            where: {
                id,
            },
            data: {
                title,
                location,
                warehouseType : type,
                description,
            }
        });
        console.log(warehouse);
        return NextResponse.json(warehouse);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Update the Warehouse" }, { status: 500 });
    }
}