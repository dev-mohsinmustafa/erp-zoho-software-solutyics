import db from "@/lib/db";
import { NextResponse } from "next/server";


const TAG = "PURCHASE REQUEST API ROUTE";

export async function POST(request) {
    try {
        // We send as data not write object names
        const purchaseRequestsData = await request.json();
        console.log(TAG, purchaseRequestsData);


        // SOME TRICKY LOGIC stockQty
        // Get the Warehouse
        const warehouse = await db.warehouse.findUnique({
            where: {
                id: purchaseRequestsData.warehouseId,
            }
        });

        const category = await db.category.findUnique({
            where: {
                id: purchaseRequestsData.categoryId
            }
        });
        const unit = await db.unit.findUnique({
            where: {
                id: purchaseRequestsData.unitId
            }
        });
        const brand = await db.brand.findUnique({
            where: {
                id: purchaseRequestsData.brandId
            }
        });
        // const supplier = await db.supplier.findUnique({
        //     where: {
        //         id: purchaseRequestsData.supplierId
        //     }
        // });
        // const item = await db.item.findUnique({
        //     where: {
        //         id: purchaseRequestsData.itemId
        //     }
        // });

        // get the current stock first 
        // Current Stock of the Warehouse
        // const currentWarehouseStock = warehouse.stockQty;
        // const newStockQty = parseInt(currentWarehouseStock) + parseInt(saleData.qty);

        // Update the Stock on the Warehouse 
        // const updatedWarehouseStock = await db.warehouse.update({
        // await db.warehouse.update({
        //     where: {
        //         id: warehouse.id,
        //         // id: itemData.id,
        //     },
        //     data: {
        //         stockQty: newStockQty,
        //     }
        // })

        const purchaseRequest = await db.purchaseRequest.create({
            data: {
                requestedBy: purchaseRequestsData.requestedBy,  // Rename title to requestedBy
                requestDate: new Date(purchaseRequestsData.requestDate), // Convert string to requestDate
                purchaseOrder: purchaseRequestsData.purchaseOrder,
                reference: purchaseRequestsData.reference,
                categoryId: purchaseRequestsData.categoryId,
                quantity: parseInt(purchaseRequestsData.qty),
                unitId: purchaseRequestsData.unitId,
                brandId: purchaseRequestsData.brandId,
                // supplierId: purchaseRequestsData.supplierId,
                warehouseId: purchaseRequestsData.warehouseId,
                description: purchaseRequestsData.description,
                status: purchaseRequestsData.status, // ✅ Store status
                // itemId: purchaseRequestsData.itemId, // ✅ Missing Field
            }
        });
        return NextResponse.json(purchaseRequest);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to create a Purchase Request" }, { status: 500 });
    }
}



export async function GET(request) {
    try {
        // findMany is used to Fetch all the Items
        const purchaseRequests = await db.purchaseRequest.findMany({
            orderBy: {
                createdAt: 'desc', // Latest Item Show First'asc' for ascending, 'desc' for descending
            },
            include: {
                category: true, // Returns all fields for all categories
                unit: true,
                brand: true,
                warehouse: true, // Returns all warehouses fields
                // supplier: true,
                // items: true
            },
        });
        console.log(purchaseRequests);
        return NextResponse.json(purchaseRequests);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Purchase Requests" }, { status: 500 });
    }
}






export async function DELETE(request) {
    try {
        // How to get the ID from search Params
        const id = request.nextUrl.searchParams.get("id")
        const deletedPurchaseRequest = await db.purchaseRequest.delete({
            where: {
                id,
            },
        })
        console.log(deletedPurchaseRequest);
        return NextResponse.json(deletedPurchaseRequest);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Delete the Purchase Request" }, { status: 500 });
    }
}





export async function PUT(request) {
    try {
        const { id, status } = await request.json();

        if (!id || !status) {
            return NextResponse.json({ message: "ID and Status are required" }, { status: 400 });
        }

        // Find Purchase Request by ID
        const existingRequest = await db.purchaseRequest.findUnique({
            where: { id },
            // For updating stock quantity when status approved
            include: { warehouse: true,  } // Include warehouse data
        });

        if (!existingRequest) {
            return NextResponse.json({ message: "Purchase Request not found" }, { status: 404 });
        }

        // Update the status field
        const updatedRequest = await db.purchaseRequest.update({
            where: { id },
            data: { status },
        });


        //
        // Current Stock of the Warehouse
        // const currentWarehouseStock = warehouse.stockQty;
        // const newStockQty = parseInt(currentWarehouseStock) + parseInt(saleData.qty);

        // Update the Stock on the Warehouse 
        // const updatedWarehouseStock = await db.warehouse.update({
        // await db.warehouse.update({
        //     where: {
        //         id: warehouse.id,
        //         // id: itemData.id,
        //     },
        //     data: {
        //         stockQty: newStockQty,
        //     }
        // })
        //

        //
        // If status is approved, update warehouse stock
        if (status.toLowerCase() === "approved") {
            // Get the warehouse stock
            const warehouse = await db.warehouse.findUnique({
                where: { id: existingRequest.warehouseId }
            });

            if (!warehouse) {
                return NextResponse.json({ message: "Warehouse not found" }, { status: 404 });
            }


            // Current Stock of the Warehouse
            const currentWarehouseStock = warehouse.stockQty;
            const newStockQty = parseInt(currentWarehouseStock) + parseInt(existingRequest.quantity);

            // Calculate new stock quantity
            // const newStockQty = parseInt(warehouse.stockQty) + parseInt(existingRequest.quantity);

            // Update warehouse stock
            await db.warehouse.update({
                where: { id: warehouse.id },
                data: { stockQty: newStockQty }
            });
        }

        return NextResponse.json(updatedRequest, { status: 200 });

    } catch (error) {
        console.error("Error updating status:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
