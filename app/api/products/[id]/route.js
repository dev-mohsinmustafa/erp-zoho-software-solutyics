import db from "@/lib/db";
import { NextResponse } from "next/server";


// For Edit we getData
export async function GET(request, { params: { id } }) {
    try {
        // findUnique is used to Fetch single item
        const product = await db.product.findUnique({
            where: {
                id,
            },
            include: {
                warehouse: true, 
              },
        });
        console.log(product);
        return NextResponse.json(product);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Product" }, { status: 500 });
    }
}




// Now For Edit we updateData

export async function PUT(request, { params: { id } }) {
    try {
        // const { title, sellingPrice, qty } = await request.json();
        const productData = await request.json();
        console.log("getData API",productData);
        // update is used to Update single item
        const product = await db.product.update({
            where: {
                id,
            },
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
        console.log(product);
        return NextResponse.json(product);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Update the Product" }, { status: 500 });
    }
}