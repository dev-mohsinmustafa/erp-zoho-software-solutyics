import db from "@/lib/db";
import { NextResponse } from "next/server";


// For Edit we getData
export async function GET(request, { params: { id } }) {
    try {
        // findUnique is used to Fetch single category
        const category = await db.category.findUnique({
            where: {
                id,
            },
        });
        console.log(category);
        return NextResponse.json(category);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Category" }, { status: 500 });
    }
}




// Now For Edit we updateData

export async function PUT(request, { params: { id } }) {
    try {
        const { title, description } = await request.json();
        // update is used to Update single category
        const category = await db.category.update({
            where: {
                id,
            },
            data: {
                title,
                description, 
            }
        });
        console.log(category);
        return NextResponse.json(category);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Update the Category" }, { status: 500 });
    }
}