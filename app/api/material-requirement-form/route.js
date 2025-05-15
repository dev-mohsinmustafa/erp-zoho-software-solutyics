import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const materialRequirementData = await request.json();

        const materialRequirement = await db.materialRequirement.create({
            data: {
                department: materialRequirementData.department,
                remarks: materialRequirementData.remarks || "",
                status: materialRequirementData.status,
                requestDate: new Date(materialRequirementData.requestDate),
                requestedBy: materialRequirementData.requestedBy,
                itemId: materialRequirementData.itemId,
                quantity: parseFloat(materialRequirementData.quantity),
                unitId: materialRequirementData.unitId
            }
        });

        return NextResponse.json({
            success: true,
            message: "Material requirement created successfully",
            data: materialRequirement
        });
    } catch (error) {
        console.error("Error creating material requirement:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to create material requirement",
                details: error.message
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const materialRequirements = await db.materialRequirement.findMany({
            include: {
                item: true,
                unit: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(materialRequirements);
    } catch (error) {
        console.error("Error fetching material requirements:", error);
        return NextResponse.json(
            { error: "Failed to fetch material requirements" },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const deletedMaterialRequirement = await db.materialRequirement.delete({
            where: {
                id
            }
        });
        return NextResponse.json(deletedMaterialRequirement);
    } catch (error) {
        console.error("Error deleting material requirement:", error);
        return NextResponse.json(
            { error: "Failed to delete material requirement" },
            { status: 500 }
        );
    }
}