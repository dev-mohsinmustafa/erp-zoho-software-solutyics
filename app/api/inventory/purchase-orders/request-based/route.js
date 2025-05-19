import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Received form data:", body);

        const {
            purchaseRequestId,
            orderBy,
            orderDate,
            purchaseReceive,
            qty,
            description,
            supplierId,
            orderStatus,
            categoryId,
            unitId,
            brandId,
            warehouseId
        } = body;

        // 1. Verify purchase request exists and is approved
        const purchaseRequest = await db.purchaseRequest.findFirst({
            where: {
                id: purchaseRequestId,
                status: { equals: "Approved", mode: "insensitive" }
            }
        });

        if (!purchaseRequest) {
            return NextResponse.json(
                { error: "Purchase request not found or not approved" },
                { status: 404 }
            );
        }

        // 2. Generate unique purchase order number
        const purchaseOrder = `PO-${Date.now()}`;

        // 3. Create request-based purchase order
        const newOrder = await db.requestBasedPurchaseOrder.create({
            data: {
                orderBy,
                orderDate: new Date(orderDate),
                purchaseOrder,
                purchaseReceive,
                quantity: parseInt(qty),
                description: description || "",
                supplierId,
                orderStatus: orderStatus || "Pending",
                categoryId,
                unitId,
                brandId,
                warehouseId,
                purchaseRequestId,
            },
        });

        // Update purchase request status based on order status
        // Update purchase request status based on order status
        let requestStatus;
        switch (orderStatus?.toLowerCase()) {
            case "received":
                requestStatus = "Received";
                break;
            case "open":
                requestStatus = "Open";
                break;
            default:
                requestStatus = "Pending";
        }

        // 4. Update purchase request status to processed
        await db.purchaseRequest.update({
            where: { id: purchaseRequestId },
            data: { status: requestStatus }
        });

        return NextResponse.json({
            success: true,
            message: "Request-based purchase order created successfully",
            data: newOrder
        });

    } catch (error) {
        console.error("Error creating request-based purchase order:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to create request-based purchase order",
                details: error.message
            },
            { status: 500 }
        );
    }
}





// GET all request-based purchase orders
export async function GET() {
    try {
      const requestBasedPurchaseOrders = await db.requestBasedPurchaseOrder.findMany({
        include: {
          supplier: true,
          category: true,
          unit: true,
          brand: true,
          warehouse: true,
          purchaseRequest: true,
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
  
      return NextResponse.json(requestBasedPurchaseOrders);
    } catch (error) {
      console.error("Error fetching request-based purchase orders:", error);
      return NextResponse.json(
        { error: "Error fetching request-based purchase orders" },
        { status: 500 }
      );
    }
  }





  //
// Add PUT handler for status updates
export async function PUT(req) {
    try {
        const body = await req.json();
        const { id, orderStatus } = body;

        // Update the purchase order
        const updatedOrder = await db.requestBasedPurchaseOrder.update({
            where: { id },
            data: { orderStatus },
        });

        // Update associated purchase request status
        let requestStatus;
        switch (orderStatus?.toLowerCase()) {
            case "received":
                requestStatus = "Received";
                break;
            case "open":
                requestStatus = "Open";
                break;
            default:
                requestStatus = "Pending";
        }

        await db.purchaseRequest.update({
            where: { id: updatedOrder.purchaseRequestId },
            data: { status: requestStatus }
        });

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error("Error updating purchase order:", error);
        return NextResponse.json(
            { error: "Failed to update purchase order" },
            { status: 500 }
        );
    }
}
  //