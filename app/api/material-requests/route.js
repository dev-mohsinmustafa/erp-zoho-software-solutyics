import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const materialRequestData = await request.json();
        console.log("Material Request Data:", materialRequestData);

        // Create the material request
        const materialRequest = await db.materialRequest.create({
            data: {
                department: materialRequestData.department,
                remarks: materialRequestData.remarks || "",
                status: materialRequestData.status,
                requestDate: new Date(materialRequestData.requestDate),
                requestedBy: materialRequestData.requestedBy,
                items: {
                    create: materialRequestData.items.map(item => ({
                        itemId: item.itemId,
                        name: item.name,
                        quantity: parseInt(item.quantity),
                        unit: item.unit
                    }))
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: "Material request created successfully",
            data: materialRequest
        });
    } catch (error) {
        console.error("Error creating material request:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to create material request",
                details: error.message
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const materialRequests = await db.materialRequest.findMany({
            include: {
                items: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(materialRequests);
    } catch (error) {
        console.error("Error fetching material requests:", error);
        return NextResponse.json(
            { error: "Failed to fetch material requests" },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const deletedMaterialRequest = await db.materialRequest.delete({
            where: {
                id
            }
        });
        return NextResponse.json(deletedMaterialRequest);
    } catch (error) {
        console.error("Error deleting material request:", error);
        return NextResponse.json(
            { error: "Failed to delete material request" },
            { status: 500 }
        );
    }
}