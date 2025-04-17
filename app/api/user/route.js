import db from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { name, email, password, companyName } = await request.json();

        // Check if user email already Exists
        const userExist = await db.User.findUnique({
            where: {
                email,
            },
        });
        if (userExist) {
            return NextResponse.json({
                message: "User already exists",
                user: null
            }, { status: 409 })
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await db.User.create({
            data: {
                name,
                email,
                hashedPassword,
                companyName,
                role: email.includes("admin") ? "admin" : "user", // Assign role based on email
            }
        });
        console.log(newUser);
        return NextResponse.json(newUser);
    } catch (error) {
        console.log(error);
        // return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ error}, { status: 500 });
    }
}




//

// Add a new PUT route to update user roles
export async function PUT(request) {
    try {
        const { email, role } = await request.json();
        
        const updatedUser = await db.User.update({
            where: { email },
            data: { role }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
//



export async function GET() {
    try {
        const users = await db.User.findMany({
            include: {
                purchaseRequestApprovals: true // Include the relations
            }
        });
        return NextResponse.json(users);
    } catch (error) {
        console.log("Error fetching users:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}