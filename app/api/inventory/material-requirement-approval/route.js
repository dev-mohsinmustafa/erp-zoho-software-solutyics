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
        const existingRequest = await db.materialRequirement.findUnique({
            where: { id },
            include: { materialApprovals: true }
        });

        if (!existingRequest) {
            return NextResponse.json({
                error: "Material requirement not found"
            }, { status: 404 });
        }

        // Create approval record first
        const approval = await db.materialRequirementApproval.create({
            data: {
                materialRequirementId: id,
                approvedById,
                status,
                remarks: remarks || "",
                requestedBy: existingRequest.requestedBy,  // Add this line
                department: existingRequest.department,    // Add this line
                itemId: existingRequest.itemId,           // Add this line
                quantity: existingRequest.quantity,       // Add this line
                unitId: existingRequest.unitId           // Add this line
            }
        });



        // Then update the material requirement status
        const updatedRequest = await db.materialRequirement.update({
            where: { id },
            data: { status, },
        });

        return NextResponse.json({
            success: true,
            data: { updatedRequest, approval }
        });

    } catch (error) {
        console.error("Error in approval process:", error);
        return NextResponse.json({
            error: error.message || "Failed to process approval"
        }, { status: 500 });
    }
}





// Add GET endpoint to fetch approval requests
export async function GET() {
    try {
        const approvalRequests = await db.materialRequirementApproval.findMany({
            include: {
                materialRequirement: true,
                approvedBy: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(approvalRequests);
    } catch (error) {
        console.error("Error fetching material requirement approval requests:", error);
        return NextResponse.json({
            error: "Failed to fetch material requirement approval requests"
        }, { status: 500 });
    }
}