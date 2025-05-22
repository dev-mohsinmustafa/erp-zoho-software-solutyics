import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // const { 
        //     title,
        //     description,
        //     categoryId,
        //     sku,
        //     barcode,
        //     qty,
        //     unitId,
        //     brandId,
        //     supplierId,
        //     buyingPrice,
        //     sellingPrice,
        //     reOrderPoint,
        //     warehouseId,
        //     imageUrl,
        //     weight,
        //     dimensions,
        //     taxRate,
        //     notes,
        // } = await request.json();
        // We send as data not write object names
        const itemData = await request.json();
        console.log(itemData);

        // SOME TRICKY LOGIC stockQty
        // Get the Warehouse
        const warehouse = await db.warehouse.findUnique({
            where: {
                id: itemData.warehouseId,
            }
        });

        // get the current stock first 
        // Current Stock of the Warehouse
        const currentWarehouseStock = warehouse.stockQty;
        const newStockQty = parseInt(currentWarehouseStock) + parseInt(itemData.qty);

        // Update the Stock on the Warehouse 
        // const updatedWarehouseStock = await db.warehouse.update({
        await db.warehouse.update({
            where: {
                id: warehouse.id,
                // id: itemData.id,
            },
            data: {
                stockQty: newStockQty,
            }
        })

        // Create the item with itemSuppliers relationship
        const item = await db.item.create({
            data: {
                title: itemData.title,
                description: itemData.description,
                categoryId: itemData.categoryId,
                sku: itemData.sku,
                // barcode: itemData.barcode,
                quantity: parseInt(itemData.qty),
                unitId: itemData.unitId,
                brandId: itemData.brandId,
                supplierId: itemData.supplierIds[0], // Use the first supplier as primary
                purchasePrice: parseFloat(itemData.purchasePrice),
                salePrice: parseFloat(itemData.salePrice),
                reOrderPoint: parseInt(itemData.reOrderPoint),
                warehouseId: itemData.warehouseId,
                // imageUrl: itemData.imageUrl,
                weight: parseFloat(itemData.weight),
                dimensions: itemData.dimensions,
                taxRate: parseFloat(itemData.taxRate),
                notes: itemData.notes,
                // Create the itemSuppliers relationships
                itemSuppliers: {
                    create: itemData.supplierIds.map(supplierId => ({
                        supplierId: supplierId
                    }))
                }
            }
        });
        return NextResponse.json(item);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to create a Item" }, { status: 500 });
    }
}






export async function GET(request) {
    try {
        // findMany is used to Fetch all the Items
        const items = await db.item.findMany({
            orderBy: {
                createdAt: 'desc', // Latest Item Show First'asc' for ascending, 'desc' for descending
            },
            include: {
                category: true, // Returns all fields for all categories
                warehouse: true, // Returns all warehouses fields
                supplier: true,
                itemSuppliers: {
                    include: {
                        supplier: true
                    }
                }
            },
        });
        console.log(items);
        return NextResponse.json(items);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Items" }, { status: 500 });
    }
}






export async function DELETE(request) {
    try {
        // How to get the ID from search Params
        const id = request.nextUrl.searchParams.get("id")
        const deletedItem = await db.item.delete({
            where: {
                id,
            },
        })
        console.log(deletedItem);
        return NextResponse.json(deletedItem);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Delete the Item" }, { status: 500 });
    }
}
