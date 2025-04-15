import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        
        // We send as data not write object names
        const productData = await request.json();
        console.log(productData);

        // SOME TRICKY LOGIC stockQty
        // Get the Warehouse
        const warehouse = await db.warehouse.findUnique({
            where: {
                id: productData.warehouseId,
            }
        });

        // get the current stock first 
        // Current Stock of the Warehouse
        const currentWarehouseStock = warehouse.stockQty;
        const newStockQty = parseInt(currentWarehouseStock) + parseInt(productData.qty);

        // Update the Stock on the Warehouse 
        // const updatedWarehouseStock = await db.warehouse.update({
        await db.warehouse.update({
            where: {
                id: warehouse.id,
            },
            data: {
                stockQty: newStockQty,
            }
        })


        const product = await db.product.create({
            data: {
                title: productData.title,
                description: productData.description,
                categoryId: productData.categoryId,
                sku: productData.sku,
                barcode: productData.barcode,
                quantity: parseInt(productData.qty),
                unitId: productData.unitId,
                brandId: productData.brandId,
                supplierId: productData.supplierId,
                buyingPrice: parseFloat(productData.buyingPrice),
                sellingPrice: parseFloat(productData.sellingPrice),
                reOrderPoint: parseInt(productData.reOrderPoint),
                warehouseId: productData.warehouseId,
                imageUrl: productData.imageUrl,
                weight: parseFloat(productData.weight),
                dimensions: productData.dimensions,
                taxRate: parseFloat(productData.taxRate),
                notes: productData.notes,
            }
        });
        return NextResponse.json(product);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Create a Product" }, { status: 500 });
    }
}






export async function GET(request) {
    try {
        // findMany is used to Fetch all the Products
        const products = await db.product.findMany({
            orderBy: {
                createdAt: 'desc', // Latest Item Show First'asc' for ascending, 'desc' for descending
            },
            include: {
                category: true, // Returns all fields for all categories
                warehouse: true, // Returns all warehouses fields
                supplier: true,
                // addStockAdjustments: true,
            },
        });
        console.log(products);
        return NextResponse.json(products);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Products" }, { status: 500 });
    }
}






export async function DELETE(request) {
    try {
        // How to get the ID from search Params
        const id = request.nextUrl.searchParams.get("id")
        const deletedProduct = await db.product.delete({
            where: {
                id,
            },
        })
        console.log(deletedProduct);
        return NextResponse.json(deletedProduct);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Delete the Product" }, { status: 500 });
    }
}
