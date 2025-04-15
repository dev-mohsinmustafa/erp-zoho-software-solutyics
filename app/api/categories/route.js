// import { NextResponse } from "next/server";

// export const POST = async (request) => {
//     try {
//         const { title, description } = await request.json();
//         const category = { title, description };
//         console.log(category);
//         return NextResponse.json(category);
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }


import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, description } = await request.json();
        // const category = { title, description };
        // Now we store this category data in mongodb database
        //create is method it take place object of daa
        const category = await db.category.create({
            data: {
                title,
                description,
                // title: title,
                // description: description
            }
        })
        console.log(category);
        return NextResponse.json(category);
    } catch (error) {
        console.log(error);
        // return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ error, message: "Failed to create a Category" }, { status: 500 });
    }
}




export async function GET(request) {
    try {
        // findMany is used to Fetch all the categories
        const categories = await db.category.findMany({
            orderBy: {
                createdAt: 'desc', // Latest Category Show First'asc' for ascending, 'desc' for descending
            },
        });
        console.log(categories);
        return NextResponse.json(categories);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Categories" }, { status: 500 });
    }
}




export async function DELETE(request) {
    try {
        // How to get the ID from search Params
        const id = request.nextUrl.searchParams.get("id")
        console.log("deleted server id",id);
        const deletedCategory = await db.category.delete({
            where: {
                id,
            },
        })
        console.log(deletedCategory);
        return NextResponse.json(deletedCategory);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Delete the Category" }, { status: 500 });
    }
}



