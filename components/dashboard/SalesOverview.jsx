import Link from 'next/link';
import SalesActivityCard from './SalesActivityCard';
import InventorySummaryCard from './InventorySummaryCard';
import { getData } from '@/lib/getData';

const SalesOverview = async () => {

    const warehousesData = getData("warehouse");
    const itemsData = getData("items");
    const categoriesData = getData("categories");
    const suppliersData = getData("suppliers");
    // Parallel Fetching
    const [warehouses, items, categories, suppliers] = await Promise.all([warehousesData, itemsData, categoriesData, suppliersData]);

    // Ye warehouse ka stock hai
    const inventorySummary = warehouses.map((item, index) => {
        return {
            title: item.title,
            number: item.stockQty,
            // warehouseType: item.warehouseType
        }
    })


    const salesActivity = [
        {
            // title: "To be Packed",
            title: "Categories",
            // number: 10,
            number: categories?.length,
            // number: categories?.length || 0, // ✅ Safe access,
            unit: "Qty",
            href: "/dashboard/inventory/categories",
            color: "text-blue-600",
        },
        {
            // title: "To be Shipped",
            title: "Items",
            // number: 0,
            number: items?.length,
            // number: items?.length || 0, // ✅ Safe access,
            unit: "Pkgs",
            href: "/dashboard/inventory/items",
            color: "text-red-600",
        },
        {
            // title: "To be Delivered",
            title: "Warehouses",
            number: warehouses?.length,
            // number: warehouses?.length || 0, // ✅ Safe access,
            unit: "Pkgs",
            href: "/dashboard/inventory/warehouse",
            color: "text-green-600",
        },
        {
            // title: "To be Invoiced",
            title: "Suppliers",
            number: suppliers?.length,
            // number: suppliers?.length || 0, // ✅ Safe access,
            unit: "Qty",
            href: "/dashboard/inventory/suppliers",
            color: "text-orange-600",
        },
    ]

    // const inventorySummary = [
    //     {
    //         title: "Quantity in Hand",
    //         number: 10,
    //     },
    //     {
    //         title: "Quantity to be recieved",
    //         number: 0,
    //     },
    // ]

    return (
        <div className='bg-blue-50 border-b border-slate-300  grid grid-cols-12 gap-4'>

            {/* SALES ACTIVITY */}
            <div className='col-span-full lg:col-span-8 border-r border-slate-300 p-8 py-16 lg:py-8'>
                <h2 className='mb-6 text-xl'>Sales Activity</h2>
                <div className="pr-8  grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Cards */}
                    {
                        salesActivity.map((item, index) => {
                            return (
                                <SalesActivityCard item={item} key={index} />
                            )
                        })
                    }


                </div>
            </div>

            {/* INVENTORY SUMMARY */}
            <div className='col-span-full lg:col-span-4 p-8'>
                <h2 className='mb-6 text-xl'>Inventory Summary</h2>
                <div className="">
                    {
                        inventorySummary.map((item, index) => {
                            return (
                                <InventorySummaryCard key={index} item={item} />
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default SalesOverview;