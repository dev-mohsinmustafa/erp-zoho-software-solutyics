import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const { id, status, remarks, approvedById } = await request.json();

        if (!id || !status || !approvedById) {
            return NextResponse.json({
                error: "ID, Status, and Approver ID are required"
            }, { status: 400 });
        }

        // Check if user exists
        const user = await db.user.findUnique({
            where: { id: approvedById }
        });

        if (!user) {
            return NextResponse.json({
                error: "Invalid approver ID"
            }, { status: 400 });
        }

        // Check if material requirement exists
        const existingRequest = await db.materialRequirementApproval.findUnique({
            where: { id }
        });

        if (!existingRequest) {
            return NextResponse.json({
                error: "Material requirement not found"
            }, { status: 404 });
        }

        // Update the material requirement status
        const updatedRequest = await db.materialRequirementApproval.update({
            where: { id },
            data: {
                status,
                approvedById,
                remarks: remarks || ""
            },
        });

        return NextResponse.json({
            success: true,
            data: { updatedRequest }
        });

    } catch (error) {
        console.error("Error in approval process:", error);
        return NextResponse.json({
            error: error.message || "Failed to process approval"
        }, { status: 500 });
    }
}