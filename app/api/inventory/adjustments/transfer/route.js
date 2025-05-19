import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { transferStockQty, referenceNumber, givingWarehouseId, receivingWarehouseId, notes, itemId } = await request.json();
        // const adjustmentStockTransfer = { transferStockQty,referenceNumber, givingWarehouseId, receivingWarehouseId, notes, itemId };


        // // Now we transfer items from one warehouse to another in dashboard
        // Fetch Items
        // UPDATE THE ITEM IN BOTH WAREHOUSES
        // Item in the Giving Warehouse
        const item = await db.item.findUnique({
            where: {
                id: itemId,
            },
        })
        console.log("UPDATED ITEM IN TRANSFER STOCK API", item)
        // Item in the Receiving Warehouse



        // after we write code in bottom we copy the same code => The Giving Warehouse 
        // Get the receiving warehouse
        const givingWarehouse = await db.warehouse.findUnique({
            where: {
                id: givingWarehouseId,
            }
        });

        // And we want to get the quantity


        // Get Current Stock
        const currentGivingWarehouseStock = givingWarehouse.stockQty;





        // Comparison with the transferQty

        if (parseInt(currentGivingWarehouseStock) > parseInt(transferStockQty)) {
            // Now we have get the one we have adding like transferQty
            // Adjust Stock
            const newStockForGivingWarehouse = parseInt(currentGivingWarehouseStock) - parseInt(transferStockQty);

            // Update Stock
            // const updatedGivingWarehouse = await db.warehouse.update({
            await db.warehouse.update({
                where: {
                    id: givingWarehouseId,
                },
                data: {
                    stockQty: newStockForGivingWarehouse,
                    // at the same time we have to subtract stock in top 
                    // UPDATE ITEM IN WAREHOUSE API and SHOW IN DASHBOARD
                    // items: {
                    //     connect : {
                    //         id: itemId,
                    //         // quantity: parseInt(transferStockQty),
                    //         // UPDATE ITEM IN WAREHOUSE API and SHOW IN DASHBOARD
                    //         // update: {
                    //         //     quantity: parseInt(transferStockQty),
                    //         // }
                    //     }
                    // }
                }
            })

            // this add in end
            // Update the item in receiving Warehouse 
            // const updatedItemInGivingWarehouse = await db.item.update({
            await db.item.update({
                where: {
                    id: itemId,
                },
                data: {
                    warehouseId: givingWarehouseId,
                    quantity: newStockForGivingWarehouse,
                }
            });
            //


            //

            // Get the receiving warehouse
            const receivingWarehouse = await db.warehouse.findUnique({
                where: {
                    id: receivingWarehouseId,
                }
            });

            // And we want to get the quantity


            // Get Current Stock
            const currentReceivingWarehouseStock = receivingWarehouse.stockQty;

            // Now we have get the one we have adding like transferQty
            // Adjust Stock
            const newStockForReceivingWarehouse = parseInt(currentReceivingWarehouseStock) + parseInt(transferStockQty);

            // Update Stock
            // const updatedReceivingWarehouse = await db.warehouse.update({
            await db.warehouse.update({
                where: {
                    id: receivingWarehouseId,
                },
                data: {
                    stockQty: newStockForReceivingWarehouse,
                    // at the same time we have to subtract stock in top 
                }
            })


            // this add in end 
            // Update the item in giving Warehouse 
            // const updatedItemInReceivingWarehouse = await db.item.update({
            await db.item.update({
                where: {
                    id: itemId,
                },
                data: {
                    warehouseId: receivingWarehouseId,
                    quantity: newStockForReceivingWarehouse,
                }
            });


            // 




            // 
            const adjustmentStockTransfer = await db.transferStockAdjustment.create({
                data: {
                    referenceNumber,
                    transferStockQty: parseInt(transferStockQty),
                    givingWarehouseId,
                    receivingWarehouseId,
                    notes,
                    itemId,
                }
            })
            console.log(adjustmentStockTransfer);
            return NextResponse.json(adjustmentStockTransfer);
        }
        else {
            return NextResponse.json({ data: null, message: "Giving Warehouse has No enough stock" }, { status: 409 });
        }


        //




    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to create a adjustment" }, { status: 500 });
    }
}




export async function GET(request) {
    try {
        // findMany is used to Fetch all the transferStockAdjustment
        const adjustments = await db.transferStockAdjustment.findMany({
            orderBy: {
                createdAt: 'desc', // Latest TransferStockAdjustment Show First'asc' for ascending, 'desc' for descending
            },
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
        const deletedTransferStockAdjustment = await db.transferStockAdjustment.delete({
            where: {
                id,
            },
        })
        console.log(deletedTransferStockAdjustment);
        return NextResponse.json(deletedTransferStockAdjustment);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Delete the Transfer Stock Adjustment" }, { status: 500 });
    }
}
