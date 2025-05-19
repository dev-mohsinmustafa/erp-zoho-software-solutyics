import db from "@/lib/db";
import { NextResponse } from "next/server";


const TAG = "GOODS RECEIVED API ROUTE";

export async function POST(request) {
    try {
        // We send as data not write object names
        const goodsReceivedData = await request.json();
        console.log(TAG, goodsReceivedData);


        // SOME TRICKY LOGIC stockQty
        // Get the Warehouse
        // const warehouse = await db.warehouse.findUnique({
        //     where: {
        //         id: goodsReceivedData.warehouseId,
        //     }
        // });

        // const category = await db.category.findUnique({
        //     where: {
        //         id: goodsReceivedData.categoryId
        //     }
        // });
        // const unit = await db.unit.findUnique({
        //     where: {
        //         id: goodsReceivedData.unitId
        //     }
        // });
        // const brand = await db.brand.findUnique({
        //     where: {
        //         id: goodsReceivedData.brandId
        //     }
        // });
        // const supplier = await db.supplier.findUnique({
        //     where: {
        //         id: goodsReceivedData.supplierId
        //     }
        // });
        
        // const item = await db.item.findUnique({
        //     where: {
        //         id: purchaseOrdersData.itemId
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

      
        
        // const purchaseRequest = await db.purchaseRequest.findUnique({
        //     where: { id: goodsReceivedData.purchaseRequestId }
        // });
        // if (!purchaseRequest) {
        //     return NextResponse.json({ message: "Invalid purchaseRequestId" }, { status: 400 });
        // }

        const purchaseOrder = await db.purchaseOrder.findUnique({
            where: { id: goodsReceivedData.purchaseOrderId }
        });
        if (!purchaseOrder) {
            return NextResponse.json({ message: "Invalid purchaseOrderId" }, { status: 400 });
        }

        const goodsReceived = await db.goodsReceived.create({
            data: {
                // orderBy: goodsReceivedData.orderBy, 
                // orderDate: new Date(goodsReceivedData.orderDate),
                // purchaseReceive: goodsReceivedData.purchaseReceive,
                // purchaseOrder: goodsReceivedData.purchaseOrder,
                // categoryId: goodsReceivedData.categoryId,
                // quantity: parseInt(goodsReceivedData.qty),
                // unitId: goodsReceivedData.unitId,
                // brandId: goodsReceivedData.brandId,
                // supplierId: goodsReceivedData.supplierId,
                // warehouseId: goodsReceivedData.warehouseId,
                // description: goodsReceivedData.description,
                // orderStatus: goodsReceivedData.orderStatus, 
                purchaseOrderId: goodsReceivedData.purchaseOrderId,
                grnNumber: goodsReceivedData.grnNumber,
                receivedBy: goodsReceivedData.receivedBy,
                receivedDate: new Date(goodsReceivedData.receivedDate),
                goodsStatus: goodsReceivedData.goodsStatus, 
                grnRemarks: goodsReceivedData.grnRemarks, 
            }
        });
        return NextResponse.json(goodsReceived);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to create a Goods Received" }, { status: 500 });
    }
}



export async function GET(request) {
    try {
        // findMany is used to Fetch all the Items
        const goodsReceived = await db.goodsReceived.findMany({
            orderBy: {
                createdAt: 'desc', // Latest Item Show First'asc' for ascending, 'desc' for descending
            },
            include: {
                // category: true, // Returns all fields for all categories
                // unit: true,
                // brand: true,
                // warehouse: true, // Returns all warehouses fields
                // supplier: true,
                // purchaseRequest: true,
                purchaseOrder: true,
                // items: true
            },
        });
        console.log(goodsReceived);
        return NextResponse.json(goodsReceived);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Goods Received" }, { status: 500 });
    }
}






export async function DELETE(request) {
    try {
        // How to get the ID from search Params
        const id = request.nextUrl.searchParams.get("id")
        const deletedGoodsReceived = await db.goodsReceived.delete({
            where: {
                id,
            },
        })
        console.log(deletedGoodsReceived);
        return NextResponse.json(deletedGoodsReceived);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Delete the Goods Received" }, { status: 500 });
    }
}





export async function PUT(request) {
    try {
        const { id, goodsStatus } = await request.json();

        if (!id || !goodsStatus) {
            return NextResponse.json({ message: "ID and Status are required" }, { status: 400 });
        }

        // Find Purchase Order by ID
        const existingOrder = await db.goodsReceived.findUnique({
            where: { id },
            // For updating stock quantity when status approved
            // include: { warehouse: true,  } // Include warehouse data
        });

        if (!existingOrder) {
            return NextResponse.json({ message: "Good Received not found" }, { status: 404 });
        }

        // Update the status field
        const updatedOrder = await db.goodsReceived.update({
            where: { id },
            data: { goodsStatus },
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
        // if (goodsStatus.toLowerCase() === "received") {
        //     // Get the warehouse stock
        //     const warehouse = await db.warehouse.findUnique({
        //         where: { id: existingOrder.warehouseId }
        //     });

        //     if (!warehouse) {
        //         return NextResponse.json({ message: "Warehouse not found" }, { status: 404 });
        //     }


        //     // Current Stock of the Warehouse
        //     const currentWarehouseStock = warehouse.stockQty;
        //     const newStockQty = parseInt(currentWarehouseStock) + parseInt(existingOrder.quantity);

        //     // Calculate new stock quantity
        //     // const newStockQty = parseInt(warehouse.stockQty) + parseInt(existingRequest.quantity);

        //     // Update warehouse stock
        //     await db.warehouse.update({
        //         where: { id: warehouse.id },
        //         data: { stockQty: newStockQty }
        //     });
        // }

        return NextResponse.json(updatedOrder, { status: 200 });

    } catch (error) {
        console.error("Error updating status:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
