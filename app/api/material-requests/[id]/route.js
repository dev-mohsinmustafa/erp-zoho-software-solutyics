import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
    try {
        const materialRequest = await db.materialRequest.findUnique({
            where: {
                id
            },
            include: {
                items: true
            }
        });
        return NextResponse.json(materialRequest);
    } catch (error) {
        console.error("Error fetching material request:", error);
        return NextResponse.json(
            { error: "Failed to fetch material request" },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params: { id } }) {
    try {
        const data = await request.json();

        const updatedMaterialRequest = await db.materialRequest.update({
            where: {
                id
            },
            data: {
                department: data.department,
                remarks: data.remarks,
                status: data.status,
                requestDate: new Date(data.requestDate),
                requestedBy: data.requestedBy,
                items: {
                    deleteMany: {},
                    create: data.items.map(item => ({
                        itemId: item.itemId,
                        name: item.name,
                        quantity: parseInt(item.quantity),
                        unit: item.unit
                    }))
                }
            },
            include: {
                items: true
            }
        });

        return NextResponse.json(updatedMaterialRequest);
    } catch (error) {
        console.error("Error updating material request:", error);
        return NextResponse.json(
            { error: "Failed to update material request" },
            { status: 500 }
        );
    }
}