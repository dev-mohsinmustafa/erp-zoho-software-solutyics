import db from "@/lib/db";
import { NextResponse } from "next/server";


// For Edit we getData
export async function GET(request, { params: { id } }) {
    try {
        // findUnique is used to Fetch single item
        const purchaseOrder = await db.purchaseOrder.findUnique({
            where: {
                id,
            },
            include: {
                category: true, // Returns all fields for all categories
                unit: true,
                brand: true,
                warehouse: true, // Returns all warehouses fields
                supplier: true,
                // purchaseRequest: true,
              },
        });
        console.log(purchaseOrder);
        return NextResponse.json(purchaseOrder);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Purchase Order" }, { status: 500 });
    }
}




// Now For Edit we updateData

export async function PUT(request, { params: { id } }) {
    try {
        // const { title, sellingPrice, qty } = await request.json();
        const purchaseOrderData = await request.json();
        console.log("Updating Purchase Order Data:", purchaseOrderData);
        // update is used to Update single item
        const updatedPurchaseOrder  = await db.purchaseOrder.update({
            where: {
                id,
            },
            data: {
                requestedBy: purchaseOrderData.requestedBy,  // Rename title to requestedBy
                requestDate: new Date(purchaseOrderData.requestDate), // Convert string to DateTime
                purchaseReceive: purchaseOrderData.purchaseReceive,
                purchaseOrder: purchaseOrderData.purchaseOrder,
                categoryId: purchaseOrderData.categoryId,
                quantity: parseInt(purchaseOrderData.qty),
                unitId: purchaseOrderData.unitId,
                brandId: purchaseOrderData.brandId,
                supplierId: purchaseOrderData.supplierId,
                warehouseId: purchaseOrderData.warehouseId,
                // purchaseRequestId: purchaseOrderData.purchaseRequestId,
                description: purchaseOrderData.description,
                location: purchaseOrderData.location,
            }
        });
        console.log(updatedPurchaseOrder);
        return NextResponse.json(updatedPurchaseOrder);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Update the Purchase Order" }, { status: 500 });
    }
}





// Change Status Api
