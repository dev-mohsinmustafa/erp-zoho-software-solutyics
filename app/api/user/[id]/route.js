import db from "@/lib/db";
import { NextResponse } from "next/server";


// For Edit we getData
export async function GET(request, { params: { id } }) {
    try {
        const user = await db.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                companyName: true,
                role: true,
                permissions: true
            }
        });
        console.log(user);
        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the User" }, { status: 500 });
    }
}




// Now For Edit we updateData

export async function PUT(request, { params: { id } }) {
    try {
        const {
            name,
            email,
            companyName,
            role,
            permissions } = await request.json();

        const user = await db.user.update({
            where: {
                id,
            },
            data: {
                name,
                email,
                companyName,
                role,
                permissions // Add permissions to update
            }
        });
        console.log(user);
        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Update the User" }, { status: 500 });
    }
}