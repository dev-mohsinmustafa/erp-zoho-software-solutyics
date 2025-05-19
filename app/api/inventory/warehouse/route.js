import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, location, type, description, } = await request.json();
        // const warehouse = { title, location, type, description };
        const warehouse = await db.warehouse.create({
            data: {
                title,
                location,
                warehouseType: type,
                description,
                // stockQty: parseInt(stockQty)
            }
        });
        console.log(warehouse);
        return NextResponse.json(warehouse);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to create a Warehouse" }, { status: 500 });
    }
}


export async function GET(request) {
    try {
        // findMany is used to Fetch all the warehouses
        const warehouse = await db.warehouse.findMany({
            orderBy: {
                createdAt: 'desc', // Latest Warehouse Show First'asc' for ascending, 'desc' for descending
            },
            include: {
                items: true,
            },
        });
        console.log(warehouse);
        return NextResponse.json(warehouse);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Warehouse" }, { status: 500 });
    }
}




export async function DELETE(request) {
    try {
        // How to get the ID from search Params
        const id = request.nextUrl.searchParams.get("id")
        const deletedWarehouse = await db.warehouse.delete({
            where: {
                id,
            },
            include: {
                items: true,
            }
        })
        console.log(deletedWarehouse);
        return NextResponse.json(deletedWarehouse);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Delete the Warehouse" }, { status: 500 });
    }
}
