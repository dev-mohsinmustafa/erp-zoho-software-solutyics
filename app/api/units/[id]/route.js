import db from "@/lib/db";
import { NextResponse } from "next/server";


// For Edit we getData
export async function GET(request, { params: { id } }) {
    try {
        // findUnique is used to Fetch single unit
        const unit = await db.unit.findUnique({
            where: {
                id,
            },
        });
        console.log(unit);
        return NextResponse.json(unit);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Unit" }, { status: 500 });
    }
}




// Now For Edit we updateData

export async function PUT(request, { params: { id } }) {
    try {
        const { title, abbreviation } = await request.json();
        // update is used to Update single unit
        const unit = await db.unit.update({
            where: {
                id,
            },
            data: {
                title,
                abbreviation, 
            }
        });
        console.log(unit);
        return NextResponse.json(unit);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Update the Unit" }, { status: 500 });
    }
}