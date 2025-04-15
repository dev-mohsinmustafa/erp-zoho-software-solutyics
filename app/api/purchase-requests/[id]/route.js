import db from "@/lib/db";
import { NextResponse } from "next/server";


// For Edit we getData
export async function GET(request, { params: { id } }) {
    try {
        // findUnique is used to Fetch single item
        const purchaseRequest = await db.purchaseRequest.findUnique({
            where: {
                id,
            },
            include: {
                category: true, // Returns all fields for all categories
                unit: true,
                brand: true,
                warehouse: true, // Returns all warehouses fields
                supplier: true,
              },
        });
        console.log(purchaseRequest);
        return NextResponse.json(purchaseRequest);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Purchase Request" }, { status: 500 });
    }
}




// Now For Edit we updateData

export async function PUT(request, { params: { id } }) {
    try {
        // const { title, sellingPrice, qty } = await request.json();
        const purchaseRequestData = await request.json();
        console.log("Updating Purchase Request Data:", purchaseRequestData);
        // update is used to Update single item
        const updatedPurchaseRequest  = await db.purchaseRequest.update({
            where: {
                id,
            },
            data: {
                requestedBy: purchaseRequestData.requestedBy,  // Rename title to requestedBy
                requestDate: new Date(purchaseRequestData.requestDate), // Convert string to DateTime
                purchaseOrder: purchaseRequestData.purchaseOrder,
                reference: purchaseRequestData.reference,
                categoryId: purchaseRequestData.categoryId,
                quantity: parseInt(purchaseRequestData.qty),
                unitId: purchaseRequestData.unitId,
                brandId: purchaseRequestData.brandId,
                supplierId: purchaseRequestData.supplierId,
                warehouseId: purchaseRequestData.warehouseId,
                description: purchaseRequestData.description,
                location: purchaseRequestData.location,
            }
        });
        console.log(updatedPurchaseRequest);
        return NextResponse.json(updatedPurchaseRequest);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Update the Purchase Request" }, { status: 500 });
    }
}





// Change Status Api
