import db from "@/lib/db";
import { NextResponse } from "next/server";

const TAG = "Sales/Route.js API:"

export async function POST(request) {
    try {
        // We send as data not write object names
        const saleData = await request.json();
        console.log(saleData);


        // SOME TRICKY LOGIC stockQty
        // Get the Warehouse
        const warehouse = await db.warehouse.findUnique({
            where: {
                id: saleData.warehouseId,
            }
        });

        const category = await db.category.findUnique({
            where: {
                id: saleData.categoryId
            }
        });
        const unit = await db.unit.findUnique({
            where: {
                id: saleData.unitId
            }
        });
        const brand = await db.brand.findUnique({
            where: {
                id: saleData.brandId
            }
        });
        const supplier = await db.supplier.findUnique({
            where: {
                id: saleData.supplierId
            }
        });


        // - the stock in items table
        const itemToUpdate = await db.item.findUnique({
            where: {
                id: saleData.itemId,
            },
        })
        console.log(TAG, "itemToUpdate()", itemToUpdate);

        // Current Item Quantity 
        const currentItemQty = itemToUpdate.quantity;
        console.log(TAG, "currentItemQty()", currentItemQty);

        // const newQty = currentItemQty + addStockQty;
        // we get this result 245428 now we convert this into int
        const newQty = parseInt(currentItemQty) - parseInt(saleData.qty);
        console.log(TAG, "newQty()", newQty);

        // Affect the Item 
        // Modify the Item to the new Qty 
        const updatedItem = await db.item.update({
            where: {
                id: saleData.itemId,
            },
            data: {
                // this is tricky
                quantity: newQty,
            }
        })
        console.log(TAG, "updatedItem()", updatedItem);


        //


        // get the current stock first 
        // Current Stock of the Warehouse
        const currentWarehouseStock = warehouse.stockQty;
        const newStockQty = parseInt(currentWarehouseStock) - parseInt(saleData.qty);

        //

        // FOR UPDATE STOCK QUANTITY IN PRODUCTS
        // - the stock in items table
        const productToUpdate = await db.product.findUnique({
            where: {
                id: saleData.productId,
            },
        })

        // Current Item Quantity 
        const currentProductQty = productToUpdate.quantity;
        console.log(TAG, "currentProductQty()", currentProductQty);

        // we get this result 245428 now we convert this into int
        const newQtyProduct = parseInt(currentProductQty) - parseInt(saleData.qty);
        console.log(TAG, "newQtyProduct()", newQtyProduct);


        // Affect the Product
        // Modify the Product to the new Qty 
        const updatedProduct = await db.product.update({
            where: {
                id: saleData.productId,
            },
            data: {
                // this is tricky
                quantity: newQtyProduct,
            }
        })
        console.log(TAG, "updatedProduct()", updatedProduct);


        //


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

        const sales = await db.sale.create({
            data: {
                // title: saleData.title,
                customerName: saleData.customerName,  // Rename title to customerName
                saleDate: new Date(saleData.saleDate), // Convert string to DateTime
                categoryId: saleData.categoryId,
                // sku: saleData.sku,
                // barcode: saleData.barcode,
                quantity: parseInt(saleData.qty),
                unitId: saleData.unitId,
                brandId: saleData.brandId,
                supplierId: saleData.supplierId,
                warehouseId: saleData.warehouseId,
                description: saleData.description,
                location: saleData.location,
                itemId: saleData.itemId,
                productId: saleData.productId,
                // buyingPrice: parseFloat(saleData.buyingPrice),
                // sellingPrice: parseFloat(saleData.sellingPrice),
                // reOrderPoint: parseInt(saleData.reOrderPoint),
                // imageUrl: saleData.imageUrl,
                // weight: parseFloat(saleData.weight),
                // dimensions: saleData.dimensions,
                // taxRate: parseFloat(saleData.taxRate),
                // notes: saleData.notes,
            }
        });
        return NextResponse.json(sales);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Create a Sale" }, { status: 500 });
    }
}





// export async function POST(request) {
//     try {
//         // Parse request JSON
//         const { title, saleDate, categoryId, qty, unitId, brandId, supplierId, warehouseId, description, location } = await request.json();

//         // Validate required fields
//         if (!title || !saleDate || !categoryId || !qty || !unitId || !brandId || !supplierId || !warehouseId) {
//             return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
//         }

//         // Ensure related records exist
//         const [category, unit, brand, supplier, warehouse] = await Promise.all([
//             db.category.findUnique({ where: { id: categoryId } }),
//             db.unit.findUnique({ where: { id: unitId } }),
//             db.brand.findUnique({ where: { id: brandId } }),
//             db.supplier.findUnique({ where: { id: supplierId } }),
//             db.warehouse.findUnique({ where: { id: warehouseId } }),
//         ]);

//         if (!category || !unit || !brand || !supplier || !warehouse) {
//             return NextResponse.json({ message: "Invalid foreign key reference" }, { status: 400 });
//         }

//         // Create sale record
//         const sale = await db.sale.create({
//             data: {
//                 title,
//                 saleDate: new Date(saleDate),
//                 categoryId,
//                 quantity: parseInt(qty),
//                 unitId,
//                 brandId,
//                 supplierId,
//                 warehouseId,
//                 description,
//                 location
//             }
//         });

//         return NextResponse.json(sale);
//     } catch (error) {
//         console.error("Error creating sale:", error);
//         return NextResponse.json({ message: "Failed to create a sale", error }, { status: 500 });
//     }
// }




export async function GET(request) {
    try {
        // findMany is used to Fetch all the Items
        const sales = await db.sale.findMany({
            orderBy: {
                createdAt: 'desc', // Latest Item Show First'asc' for ascending, 'desc' for descending
            },
            include: {
                category: true, // Returns all fields for all categories
                unit: true,
                brand: true,
                warehouse: true, // Returns all warehouses fields
                supplier: true,
                item: true,
                product: true,
            },
        });
        console.log(sales);
        return NextResponse.json(sales);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Sales" }, { status: 500 });
    }
}






export async function DELETE(request) {
    try {
        // How to get the ID from search Params
        const id = request.nextUrl.searchParams.get("id")
        const deletedSale = await db.sale.delete({
            where: {
                id,
            },
        })
        console.log(deletedSale);
        return NextResponse.json(deletedSale);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Delete the Sale" }, { status: 500 });
    }
}
