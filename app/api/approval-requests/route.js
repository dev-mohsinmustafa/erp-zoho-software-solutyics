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

        // Check if purchase request exists
        const existingRequest = await db.purchaseRequest.findUnique({
            where: { id },
            include: { warehouse: true }
        });

        if (!existingRequest) {
            return NextResponse.json({ 
                error: "Purchase request not found" 
            }, { status: 404 });
        }

        // Create approval record first
        const approval = await db.purchaseRequestApproval.create({
            data: {
                purchaseRequestId: id,
                approvedById,
                status,
                remarks: remarks || "",
            }
        });

        // Then update the purchase request status
        const updatedRequest = await db.purchaseRequest.update({
            where: { id },
            data: { status },
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
        const approvalRequests = await db.purchaseRequestApproval.findMany({
            // include: {
            //     purchaseRequest: {
            //         include: {
            //             supplier: true,
            //             warehouse: true,
            //             category: true,
            //             unit: true,
            //             brand: true
            //         }
            //     },
            //     approvedBy: {
            //         select: {
            //             name: true,
            //             email: true,
            //             role: true
            //         }
            //     }
            // },
            include: {
                purchaseRequest: true,
                approvedBy: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(approvalRequests);
    } catch (error) {
        console.error("Error fetching approval requests:", error);
        return NextResponse.json({ 
            error: "Failed to fetch approval requests" 
        }, { status: 500 });
    }
}