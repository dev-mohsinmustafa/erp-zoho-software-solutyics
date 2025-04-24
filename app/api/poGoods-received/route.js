import db from "@/lib/db";
import { NextResponse } from "next/server";

// POST / CREATE 
export async function POST(req) {
    try {
        const body = await req.json();

        const {
            grnNumber,
            title,
            receivedDate,
            goodsStatus,
            totalPayment,
            grnRemarks,
            purchaseOrderId,
            purchaseRequestId,
        } = body;

        // Create the RequestBasedPOGoodsReceived record
        const result = await db.requestBasedPOGoodsReceived.create({
            data: {
                grnNumber: grnNumber,
                receivedBy: title, // from the form's receivedBy field
                receivedDate: new Date(receivedDate),
                goodsStatus: goodsStatus,
                totalPayment: parseFloat(totalPayment),
                grnRemarks: grnRemarks,
                purchaseOrderId: purchaseOrderId, // from the selected PO
                
            },
        });


        // Update purchase request status based on goods status only in purchase request table 
        let requestStatusGoodsReceived;
        switch (goodsStatus?.toLowerCase()) {
            case "received":
                requestStatusGoodsReceived = "Completed";
                break;
            case "open":
                requestStatusGoodsReceived = "Open";
                break;
            default:
                requestStatusGoodsReceived = "Pending";
        }

        // 4. Update purchase request status to processed
        await db.purchaseRequest.update({
            where: { id: purchaseRequestId },
            data: { status: requestStatusGoodsReceived }
        });


        return NextResponse.json({
            message: "Request Based PO Goods Received Created Successfully",
            data: result,
        });

    } catch (error) {
        console.log("Error in creating Request Based PO Goods Received:", error);
        return NextResponse.json({
            message: "Error in creating Request Based PO Goods Received",
            error,
        });
    }
}


// GET  / READ
export async function GET() {
    try {
        const goodsReceived = await db.requestBasedPOGoodsReceived.findMany({
            include: {
                requestBasedPurchaseOrder: true, // Include related purchase order details
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(goodsReceived);
    } catch (error) {
        console.log("Error in fetching Goods Received:", error);
        return NextResponse.json({
            message: "Error in fetching Goods Received",
            error,
        });
    }
}


// PUT / UPDATE
export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const data = await req.json();

        // Update the RequestBasedPOGoodsReceived record
        const result = await db.requestBasedPOGoodsReceived.update({
            where: {
                id: id,
            },
            data: {
                grnNumber: data.grnNumber,
                receivedBy: data.title,
                receivedDate: new Date(data.receivedDate),
                goodsStatus: data.goodsStatus,
                totalPayment: parseFloat(data.totalPayment),
                grnRemarks: data.grnRemarks,
                requestBasedPurchaseOrderId: data.purchaseOrderId,
            },
        });




        return NextResponse.json({
            message: "Request Based PO Goods Received Updated Successfully",
            data: result,
        });

    } catch (error) {
        console.log("Error in updating Request Based PO Goods Received:", error);
        return NextResponse.json({
            message: "Error in updating Request Based PO Goods Received",
            error,
        });
    }
}



// PATCH-DELETE / DELETE