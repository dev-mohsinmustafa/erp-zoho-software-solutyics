import db from "@/lib/db";
import { NextResponse } from "next/server";

// POST: Create a new tax
export async function POST(req) {
    try {
        const data = await req.json();

        // If this tax is set as default, unset any existing default tax
        if (data.isDefault) {
            await db.tax.updateMany({
                where: { isDefault: true },
                data: { isDefault: false }
            });
        }

        const tax = await db.tax.create({
            data: {
                name: data.name,
                rate: parseFloat(data.rate),
                type: data.type,
                description: data.description,
                isDefault: data.isDefault || false
            }
        });

        return NextResponse.json(tax);
    } catch (error) {
        console.error("Error creating tax:", error);
        return NextResponse.json(
            { error: "Error creating tax" },
            { status: 500 }
        );
    }
}

// GET: Fetch all taxes
export async function GET() {
    try {
        const taxes = await db.tax.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(taxes);
    } catch (error) {
        console.error("Error fetching taxes:", error);
        return NextResponse.json(
            { error: "Error fetching taxes" },
            { status: 500 }
        );
    }
}
