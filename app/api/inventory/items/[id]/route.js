import db from "@/lib/db";
import { NextResponse } from "next/server";


// For Edit we getData
export async function GET(request, { params: { id } }) {
    try {
        // findUnique is used to Fetch single item
        const item = await db.item.findUnique({
            where: {
                id,
            },
            include: {
                warehouse: true,
            },
        });
        console.log(item);
        return NextResponse.json(item);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Item" }, { status: 500 });
    }
}




// Now For Edit we updateData

export async function PUT(request, { params: { id } }) {
    try {
        // const { title, sellingPrice, qty } = await request.json();
        const itemData = await request.json();
        console.log("getData API", itemData);
        // update is used to Update single item
        const item = await db.item.update({
            where: {
                id,
            },
            data: {
                title: itemData.title,
                description: itemData.description,
                categoryId: itemData.categoryId,
                sku: itemData.sku,
                // barcode: itemData.barcode,
                quantity: parseInt(itemData.qty),
                unitId: itemData.unitId,
                brandId: itemData.brandId,
                supplierId: itemData.supplierId,
                purchasePrice: parseFloat(itemData.purchasePrice),
                salePrice: parseFloat(itemData.salePrice),
                reOrderPoint: parseInt(itemData.reOrderPoint),
                warehouseId: itemData.warehouseId,
                imageUrl: itemData.imageUrl,
                weight: parseFloat(itemData.weight),
                dimensions: itemData.dimensions,
                // taxRate: parseFloat(itemData.taxRate),
                taxId: itemData.taxId,
                notes: itemData.notes,
            }
        });
        console.log(item);
        return NextResponse.json(item);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Update the Item" }, { status: 500 });
    }
}