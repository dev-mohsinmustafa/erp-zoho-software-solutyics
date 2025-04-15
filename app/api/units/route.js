import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, abbreviation } = await request.json();
        // const unit = { title, abbreviation };
        const unit = await db.unit.create({
            data: {
                title,
                abbreviation: abbreviation.toUpperCase()
            }
        });  // convert abbreviation to uppercase before saving to the database.
        console.log(unit);
        return NextResponse.json(unit);
    } catch (error) {
        console.log(error);
        // return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ error, message: "Failed to create a Unit" }, { status: 500 });
    }
}







export async function GET(request) {
    try {
        // findMany is used to Fetch all the units
        const units = await db.unit.findMany({
            orderBy: {
                createdAt: 'desc', // Latest Unit Show First'asc' for ascending, 'desc' for descending
            },
        });
        console.log(units);
        return NextResponse.json(units);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Units" }, { status: 500 });
    }
}




export async function DELETE(request) {
    try {
        // How to get the ID from search Params
        const id = request.nextUrl.searchParams.get("id")
        const deletedUnit = await db.unit.delete({
            where: {
                id,
            },
        })
        console.log(deletedUnit);
        return NextResponse.json(deletedUnit);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Delete the Unit" }, { status: 500 });
    }
}
