import db from "@/lib/db";
import { NextResponse } from "next/server";


const TAG = "PURCHASE ORDER API ROUTE";

export async function POST(request) {
    try {
        // We send as data not write object names
        const purchaseOrdersData = await request.json();
        console.log(TAG, purchaseOrdersData);


        // SOME TRICKY LOGIC stockQty
        // Get the Warehouse
        const warehouse = await db.warehouse.findUnique({
            where: {
                id: purchaseOrdersData.warehouseId,
            }
        });

        const category = await db.category.findUnique({
            where: {
                id: purchaseOrdersData.categoryId
            }
        });
        const unit = await db.unit.findUnique({
            where: {
                id: purchaseOrdersData.unitId
            }
        });
        const brand = await db.brand.findUnique({
            where: {
                id: purchaseOrdersData.brandId
            }
        });
        const supplier = await db.supplier.findUnique({
            where: {
                id: purchaseOrdersData.supplierId
            }
        });
     
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

      
        
        const purchaseRequest = await db.purchaseRequest.findUnique({
            where: { id: purchaseOrdersData.purchaseRequestId }
        });
        if (!purchaseRequest) {
            return NextResponse.json({ message: "Invalid purchaseRequestId" }, { status: 400 });
        }

        const purchaseOrder = await db.purchaseOrder.create({
            data: {
                orderBy: purchaseOrdersData.orderBy, 
                orderDate: new Date(purchaseOrdersData.orderDate),
                purchaseReceive: purchaseOrdersData.purchaseReceive,
                purchaseOrder: purchaseOrdersData.purchaseOrder,
                categoryId: purchaseOrdersData.categoryId,
                quantity: parseInt(purchaseOrdersData.qty),
                unitId: purchaseOrdersData.unitId,
                brandId: purchaseOrdersData.brandId,
                supplierId: purchaseOrdersData.supplierId,
                warehouseId: purchaseOrdersData.warehouseId,
                purchaseRequestId: purchaseOrdersData.purchaseRequestId,
                description: purchaseOrdersData.description,
                orderStatus: purchaseOrdersData.orderStatus, 
                // grnNumber: purchaseOrdersData.grnNumber,
                // receivedBy: purchaseOrdersData.receivedBy,
                // receivedDate: new Date(purchaseOrdersData.receivedDate),
                // goodsStatus: purchaseOrdersData.goodsStatus, 
                // grnRemarks: purchaseOrdersData.grnRemarks, 
            }
        });
        return NextResponse.json(purchaseOrder);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to create a Purchase Order" }, { status: 500 });
    }
}



export async function GET(request) {
    try {
        // findMany is used to Fetch all the Items
        const purchaseOrders = await db.purchaseOrder.findMany({
            orderBy: {
                createdAt: 'desc', // Latest Item Show First'asc' for ascending, 'desc' for descending
            },
            include: {
                category: true, // Returns all fields for all categories
                unit: true,
                brand: true,
                warehouse: true, // Returns all warehouses fields
                supplier: true,
                purchaseRequest: true,
                // items: true
            },
        });
        console.log(purchaseOrders);
        return NextResponse.json(purchaseOrders);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Purchase Orders" }, { status: 500 });
    }
}






export async function DELETE(request) {
    try {
        // How to get the ID from search Params
        const id = request.nextUrl.searchParams.get("id")
        const deletedPurchaseOrder = await db.purchaseOrder.delete({
            where: {
                id,
            },
        })
        console.log(deletedPurchaseOrder);
        return NextResponse.json(deletedPurchaseOrder);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Delete the Purchase Order" }, { status: 500 });
    }
}





export async function PUT(request) {
    try {
        const { id, orderStatus } = await request.json();

        if (!id || !orderStatus) {
            return NextResponse.json({ message: "ID and Status are required" }, { status: 400 });
        }

        // Find Purchase Order by ID
        const existingOrder = await db.purchaseOrder.findUnique({
            where: { id },
            // For updating stock quantity when status approved
            include: { warehouse: true,  } // Include warehouse data
        });

        if (!existingOrder) {
            return NextResponse.json({ message: "Purchase Order not found" }, { status: 404 });
        }

        // Update the status field
        const updatedOrder = await db.purchaseOrder.update({
            where: { id },
            data: { orderStatus },
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
        if (orderStatus.toLowerCase() === "approved") {
            // Get the warehouse stock
            const warehouse = await db.warehouse.findUnique({
                where: { id: existingOrder.warehouseId }
            });

            if (!warehouse) {
                return NextResponse.json({ message: "Warehouse not found" }, { status: 404 });
            }


            // Current Stock of the Warehouse
            const currentWarehouseStock = warehouse.stockQty;
            const newStockQty = parseInt(currentWarehouseStock) + parseInt(existingOrder.quantity);

            // Calculate new stock quantity
            // const newStockQty = parseInt(warehouse.stockQty) + parseInt(existingRequest.quantity);

            // Update warehouse stock
            await db.warehouse.update({
                where: { id: warehouse.id },
                data: { stockQty: newStockQty }
            });
        }

        return NextResponse.json(updatedOrder, { status: 200 });

    } catch (error) {
        console.error("Error updating status:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
