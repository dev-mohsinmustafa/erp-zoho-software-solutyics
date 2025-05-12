"use client"

import { BaggageClaim, BarChart4, Cable, ChevronLeft, Files, Home, PlusCircle, ShoppingBag, ShoppingBasket, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import SubscriptionCard from './SubscriptionCard';

// import CollapsibleLink from './CollapsibleLink';
import SidebarDropdownLink from './SidebarDropdownLink';
import Image from 'next/image';

import { useSession } from 'next-auth/react';
import RoleGuard from '@/app/roleGuard/RoleGuard';


const Sidebar = ({ showSidebar, setShowSidebar }) => {

    //
    const { data: session } = useSession();


    const inventoryLinks = [
        {
            title: "All",
            href: "/dashboard/inventory",
        },
        {
            title: "Items",
            href: "/dashboard/inventory/items",
        },
        {
            // title: "Item Groups",
            title: "Categories",
            href: "/dashboard/inventory/categories",
        },
        {
            title: "Brands",
            href: "/dashboard/inventory/brands",
        },
        {
            title: "Units",
            href: "/dashboard/inventory/units",
        },
        {
            title: "Warehouse",
            href: "/dashboard/inventory/warehouse",
            adminOnly: true
        },
        {
            title: "Inventory Adjustments",
            href: "/dashboard/inventory/adjustments",
            adminOnly: true
        },
        {
            title: "Stock Adjustments",
            href: "/dashboard/inventory/stock-adjustments",
            adminOnly: true
        },
        {
            title: "Users",
            href: "/dashboard/inventory/users",
            adminOnly: true
        },
        {
            title: "Supplier",
            href: "/dashboard/inventory/suppliers",
            adminOnly: true
        },
        {
            title: "Products Management",
            href: "/dashboard/inventory/products",
        },
        {
            title: "Sales Management",
            href: "/dashboard/inventory/sales",
        },
        // {
        //     title: "Vendors",
        //     href: "/dashboard/inventory/vendors",
        // },
        {
            title: "Purchase Requests",
            href: "/dashboard/inventory/purchase-requests",
        },
        {
            title: "Approval Requests",
            href: "/dashboard/inventory/approval-requests",
            adminOnly: true

        },
        // ...(session?.user?.role === "admin" ? [{
        //     title: "Approval Requests",
        //     href: "/dashboard/inventory/approval-requests",
        // }] : []),
        {
            title: "Purchase Orders",
            href: "/dashboard/inventory/purchase-orders",
            adminOnly: true
        },
        {
            title: "Goods/Materials Received",
            href: "/dashboard/inventory/poGoods-received",
            adminOnly: true
        },
    ].filter(link => !link.adminOnly || session?.user?.role === "admin");


    const salesLinks = [
        {
            title: "Customers",
            href: "/",
        },
        {
            title: "Sales Orders",
            href: "/",
        },
        {
            title: "Shipments",
            href: "/",
        },
        {
            title: "Invoices",
            href: "/",
        },
        {
            title: "Sales Receipts",
            href: "/",
        },
        {
            title: "Payment Received",
            href: "/",
        },
        {
            title: "Sales Returns",
            href: "/",
        },
        {
            title: "Credit Notes",
            href: "/",
        },
    ]


    return (
        <>
            <RoleGuard allowedRoles={["admin", "user"]}>

            {/* bg-purpleColor */}
            {/* <div className='w-60 min-h-screen bg-slate-800 text-slate-50 fixed hidden lg:block z-50'> */}
            <div className={`${showSidebar ? "w-60 min-h-screen bg-slate-800 text-white fixed lg:block z-50" : "w-60 min-h-screen bg-slate-800 text-white fixed hidden lg:block z-50"}`}>
            {/* <div className={`w-60 min-h-screen bg-slate-800 text-white fixed z-50 transition-transform duration-300 ${showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}> */}


                {/* Top Part */}
                <div className="flex flex-col h-screen">
                    {/* Logo */}
                    {/* bg-white */}
                    <div className="flex justify-between flex-shrink-0">
                        <Link href={"/"} prefetch={false} className="bg-slate-950 flex space-x-2 items-center py-3 px-2 w-full">
                            <ShoppingCart />
                            <Image src={"/logo.png"} alt="Company Logo" width={150} height={50} />
                            {/* <span className='text-xl font-semibold'>Inventory</span> */}
                        </Link>
                        {/* px-4 */}
                        <button className='bg-slate-950 px-2 py-3 lg:hidden' onClick={()=>setShowSidebar(false)}>
                            <X className='w-6 h-6 text-white '/>
                        </button>
                    </div>
                    {/* Links */} 
                    {/* flex-grow overflow-y-auto scrolling effect */}
                    <nav className='flex flex-col gap-3 px-3 py-6 flex-grow overflow-y-auto'>
                        <Link href={"/dashboard/home/overview"} prefetch={false} className='flex items-center space-x-2 bg-blue-600 text-slate-50 p-2 rounded-md transition-colors duration-300 hover:bg-gray-200 hover:text-black'>
                            <Home className='w-4 h-4' />
                            <span>Home</span>
                        </Link>

                        {/* <Collapsible>
                            <CollapsibleTrigger className='p-2 flex items-center space-x-2'>
                            <BaggageClaim className='w-4 h-4' />
                            <span>Inventory</span>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                {
                                    inventoryLinks.map((item, index) => {
                                        return (
                                         <CollapsibleLink key={index} item={item}/>
                                        )
                                    })
                                }
                            </CollapsibleContent>
                       </Collapsible> */}

                        {/* make Collapsible code in component */}
                        <SidebarDropdownLink items={inventoryLinks} title="Inventory" icon={BaggageClaim} setShowSidebar={setShowSidebar}/>
                        {/* <SidebarDropdownLink items={salesLinks} title="Sales" icon={ShoppingBasket} /> */}



                        {/* <button className='p-2 flex items-center space-x-2'>
                            <ShoppingBasket className='w-4 h-4' />
                            <span>Sales</span>
                        </button>
                        <button className='p-2 flex items-center space-x-2'>
                            <ShoppingBag className='w-4 h-4' />
                            <span>Purchases</span>
                        </button> */}

                        {/* <Link href={""} className='p-2 flex items-center space-x-2'>
                            <Cable className='w-4 h-4' />
                            <span>Integrations</span>
                        </Link>
                        <Link href={""} className='p-2 flex items-center space-x-2'>
                            <BarChart4 className='w-4 h-4' />
                            <span>Reports</span>
                        </Link>
                        <Link href={""} className='p-2 flex items-center space-x-2'>
                            <Files className='w-4 h-4' />
                            <span>Documents</span>
                        </Link> */}
                    </nav>
                    <SubscriptionCard />
                </div>

                {/* Bottom */}
                {/* Adding`flex-shrink-0` to the header and footer sections to keep them fixed */}
                <div className="flex flex-col flex-shrink-0">
                    <button className="bg-slate-950 flex space-x-2 items-center py-3 px-2 justify-center">
                        <ChevronLeft />
                    </button>
                </div>

                {/* Subscription Card */}
                {/* Footer Icon */}
            </div>
            </RoleGuard>
        </>
    )
}

export default Sidebar;