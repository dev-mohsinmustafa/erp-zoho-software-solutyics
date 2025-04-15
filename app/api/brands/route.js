import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, } = await request.json();
        // const brand = { title,  };
        const brand = await db.brand.create({
            data: {
                title,
            }
        })

        console.log(brand);
        return NextResponse.json(brand);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to create a brand" }, { status: 500 });
    }
}





export async function GET(request) {
    try {
        // findMany is used to Fetch all the brands
        const brands = await db.brand.findMany({
            orderBy: {
                createdAt: 'desc', // Latest Brand Show First'asc' for ascending, 'desc' for descending
            },
        });
        console.log(brands);
        return NextResponse.json(brands);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Brands" }, { status: 500 });
    }
}




export async function DELETE(request) {
    try {
        // How to get the ID from search Params
        const id = request.nextUrl.searchParams.get("id")
        const deletedBrand = await db.brand.delete({
            where: {
                id,
            },
        })
        console.log(deletedBrand);
        return NextResponse.json(deletedBrand);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Delete the Brand" }, { status: 500 });
    }
}
