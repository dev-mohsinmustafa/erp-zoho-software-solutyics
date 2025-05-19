import db from "@/lib/db";
import { NextResponse } from "next/server";


// For Edit we getData
export async function GET(request, { params: { id } }) {
    try {
        // findUnique is used to Fetch single item
        const sale = await db.sale.findUnique({
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
        console.log(sale);
        return NextResponse.json(sale);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Sale" }, { status: 500 });
    }
}




// Now For Edit we updateData

export async function PUT(request, { params: { id } }) {
    try {
        // const { title, sellingPrice, qty } = await request.json();
        const saleData = await request.json();
        console.log("Updating Sale Data:", saleData);
        // update is used to Update single item
        const updatedSale  = await db.sale.update({
            where: {
                id,
            },
            data: {
                customerName: saleData.customerName,  // Rename title to customerName
                saleDate: new Date(saleData.saleDate), // Convert string to DateTime
                categoryId: saleData.categoryId,
                quantity: parseInt(saleData.qty),
                unitId: saleData.unitId,
                brandId: saleData.brandId,
                supplierId: saleData.supplierId,
                warehouseId: saleData.warehouseId,
                description: saleData.description,
                location: saleData.location,
            }
        });
        console.log(updatedSale);
        return NextResponse.json(updatedSale);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Update the Sale" }, { status: 500 });
    }
}