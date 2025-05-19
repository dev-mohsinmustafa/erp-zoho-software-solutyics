import db from "@/lib/db";
import { NextResponse } from "next/server";

const TAG = "Adjustment/Add/Route.js API:"
export async function POST(request) {
    try {
        const { addStockQty, notes, referenceNumber, receivingWarehouseId, itemId, supplierId } = await request.json();

        // const data = { addStockQty, notes, referenceNumber, receivingWarehouseId, itemId };
        // console.log(TAG, "data=>", data);

        // Get the Item
        // this is some tricky logics
        // because we know the quantity of item to be available
        // so move this in top of code
        const itemToUpdate = await db.item.findUnique({
            where: {
                id: itemId,
            },
        })
        console.log(TAG, "itemToUpdate()", itemToUpdate);

        // Current Item Quantity 
        const currentItemQty = itemToUpdate.quantity;
        console.log(TAG, "currentItemQty()", currentItemQty);

        // const newQty = currentItemQty + addStockQty;
        // we get this result 245428 now we convert this into int
        const newQty = parseInt(currentItemQty) + parseInt(addStockQty);
        console.log(TAG, "newQty()", newQty);

        // Affect the Item 
        // Modify the Item to the new Qty 
        const updatedItem = await db.item.update({
            where: {
                id: itemId,
            },
            data: {
                // this is tricky
                quantity: newQty,
            }
        })
        console.log(TAG, "updatedItem()", updatedItem);


        // this is last code we added
        //

        //This is In ITEMS API code we copy 

        // SOME TRICKY LOGIC stockQty
        // Get the Warehouse
        const warehouse = await db.warehouse.findUnique({
            where: {
                // id: itemData.warehouseId,
                id: receivingWarehouseId,
            }
        });

        // get the current stock first 
        // Current Stock of the Warehouse
        const currentWarehouseStock = warehouse.stockQty;
        const newStockQty = parseInt(currentWarehouseStock) + parseInt(addStockQty);

        // Update the Stock on the Warehouse 
        // const updatedWarehouseStock = await db.warehouse.update({
        db.warehouse.update({
            where: {
                id: receivingWarehouseId,
            },
            data: {
                stockQty: newStockQty,
            }
        })

        //
        // 


        const adjustmentStockAdd = await db.addStockAdjustment.create({
            data: {
                itemId,
                addStockQty: parseInt(addStockQty),
                receivingWarehouseId,
                referenceNumber,
                notes,
                supplierId
            }
        })
        console.log(TAG, "addStockAdjustment()", adjustmentStockAdd);





        // Affect the warehouse
        console.log(adjustmentStockAdd);
        return NextResponse.json(adjustmentStockAdd);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to create a adjustment" }, { status: 500 });
    }
}




export async function GET(request) {
    try {
        // findMany is used to Fetch all the addStockAdjustment
        const adjustments = await db.addStockAdjustment.findMany({
            orderBy: {
                createdAt: 'desc', // Latest AddStockAdjustment Show First'asc' for ascending, 'desc' for descending
            },
            include:{
                item: true,
            }
        });
        console.log(adjustments);
        return NextResponse.json(adjustments);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Adjustment" }, { status: 500 });
    }
}





export async function DELETE(request) {
    try {
        // How to get the ID from search Params
        const id = request.nextUrl.searchParams.get("id")
        const deletedAddStockAdjustment = await db.addStockAdjustment.delete({
            where: {
                id,
            },
        })
        console.log(deletedAddStockAdjustment);
        return NextResponse.json(deletedAddStockAdjustment);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Delete the Add Stock Adjustment" }, { status: 500 });
    }
}
