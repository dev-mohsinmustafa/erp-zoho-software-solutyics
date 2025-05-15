import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
    try {
        const materialRequirement = await db.materialRequirement.findUnique({
            where: {
                id
            },
            include: {
                item: true,
                unit: true
            }
        });
        return NextResponse.json(materialRequirement);
    } catch (error) {
        console.error("Error fetching material requirement:", error);
        return NextResponse.json(
            { error: "Failed to fetch material requirement" },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params: { id } }) {
    try {
        const data = await request.json();

        const updatedMaterialRequirement = await db.materialRequirement.update({
            where: {
                id
            },
            data: {
                department: data.department,
                remarks: data.remarks,
                status: data.status,
                requestDate: new Date(data.requestDate),
                requestedBy: data.requestedBy,
                itemId: data.itemId,
                quantity: parseFloat(data.quantity),
                unitId: data.unitId
            },
            include: {
                item: true,
                unit: true
            }
        });

        return NextResponse.json(updatedMaterialRequirement);
    } catch (error) {
        console.error("Error updating material requirement:", error);
        return NextResponse.json(
            { error: "Failed to update material requirement" },
            { status: 500 }
        );
    }
}