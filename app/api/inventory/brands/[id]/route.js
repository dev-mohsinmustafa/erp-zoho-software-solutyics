import db from "@/lib/db";
import { NextResponse } from "next/server";


// For Edit we getData
export async function GET(request, { params: { id } }) {
    try {
        // findUnique is used to Fetch single brand
        const brand = await db.brand.findUnique({
            where: {
                id,
            },
        });
        console.log(brand);
        return NextResponse.json(brand);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Brand" }, { status: 500 });
    }
}




// Now For Edit we updateData

export async function PUT(request, { params: { id } }) {
    try {
        const { title } = await request.json();
        // update is used to Update single brand
        const brand = await db.brand.update({
            where: {
                id,
            },
            data: {
                title,
            }
        });
        console.log(brand);
        return NextResponse.json(brand);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Update the Brand" }, { status: 500 });
    }
}