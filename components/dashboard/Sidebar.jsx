"use client"

import { BadgeDollarSign, BaggageClaim, BarChart4, Cable, ChevronLeft, DollarSignIcon, Files, Home, Landmark, PlusCircle, ShoppingBag, ShoppingBasket, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import SubscriptionCard from './SubscriptionCard';

// import CollapsibleLink from './CollapsibleLink';
import SidebarDropdownLink from './SidebarDropdownLink';
import Image from 'next/image';

import { useSession } from 'next-auth/react';
import RoleGuard from '@/app/roleGuard/RoleGuard';


const Sidebar = ({ showSidebar, setShowSidebar }) => {

    const { data: session } = useSession();


    const inventoryLinks = [
        {
            title: "All",
            href: "/dashboard/inventory",
            requiredPermission: "inventory"
        },
        {
            title: "Items",
            href: "/dashboard/inventory/items",
            requiredPermission: "items"
        },
        {
            // title: "Item Groups",
            title: "Categories",
            href: "/dashboard/inventory/categories",
            requiredPermission: "categories"
        },
        {
            title: "Brands",
            href: "/dashboard/inventory/brands",
            requiredPermission: "brands"
        },
        {
            title: "Units",
            href: "/dashboard/inventory/units",
            requiredPermission: "units"
        },
        {
            title: "Warehouse",
            href: "/dashboard/inventory/warehouse",
            adminOnly: true,
            requiredPermission: "warehouse"
        },
        {
            title: "Inventory Adjustments",
            href: "/dashboard/inventory/adjustments",
            adminOnly: true,
            requiredPermission: "inventory-adjustments"
        },
        {
            title: "Stock Adjustments",
            href: "/dashboard/inventory/stock-adjustments",
            adminOnly: true,
            requiredPermission: "stock-adjustments"
        },
        {
            title: "Users",
            href: "/dashboard/inventory/users",
            adminOnly: true,
            requiredPermission: "users"
        },
        {
            title: "Supplier",
            href: "/dashboard/inventory/suppliers",
            adminOnly: true,
            requiredPermission: "suppliers"
        },
        {
            title: "Products Management",
            href: "/dashboard/inventory/products",
            requiredPermission: "products-management"
        },
        {
            title: "Sales Management",
            href: "/dashboard/inventory/sales",
            adminOnly: true,
            requiredPermission: "sales-management"
        },
        // {
        //     title: "Vendors",
        //     href: "/dashboard/inventory/vendors",
        // },
        {
            title: "Purchase Requests",
            href: "/dashboard/inventory/purchase-requests",
            requiredPermission: "purchase-requests"
        },
        {
            title: "Approval Requests",
            href: "/dashboard/inventory/approval-requests",
            adminOnly: true,
            requiredPermission: "approval-requests"

        },
        // ...(session?.user?.role === "admin" ? [{
        //     title: "Approval Requests",
        //     href: "/dashboard/inventory/approval-requests",
        // }] : []),
        {
            title: "Purchase Orders",
            href: "/dashboard/inventory/purchase-orders",
            adminOnly: true,
            requiredPermission: "purchase-orders"
        },
        {
            title: "Goods/Materials Received",
            href: "/dashboard/inventory/poGoods-received",
            adminOnly: true,
            requiredPermission: "poGoods-received" // Add permission requirement
        },
        {
            title: "Material Request Form  (MRF)",
            href: "/dashboard/inventory/material-request-form",
            adminOnly: true,
            requiredPermission: "material-request-form"
        },
        {
            title: "Material Requirement Form",
            href: "/dashboard/inventory/material-requirement-form",
            adminOnly: true,
            requiredPermission: "material-requirement-form"
        },
        {
            title: "Material Requirement Approval",
            href: "/dashboard/inventory/material-requirement-approval",
            adminOnly: true,
            requiredPermission: "material-requirement-approval"
        },
    ].filter(link => {
        // Show link if:
        // 1. It's not admin-only, or user is admin
        // 2. OR user has the required permission
        return (!link.adminOnly || session?.user?.role === "admin") ||
            (link.requiredPermission && session?.user?.permissions?.[link.requiredPermission]);
    });


    const salesLinks = [
        {
            title: "All Sales",
            href: "/dashboard/sales",
            requiredPermission: "sales"
        },
        {
            title: "Customers",
            href: "/dashboard/sales/customers",
            requiredPermission: "customers"
        },
        // {
        //     title: "Sales Orders",
        //     href: "/dashboard/sales/orders",
        //     requiredPermission: "sales-orders"
        // },
        {
            title: "Invoices",
            href: "/dashboard/sales/invoices",
            requiredPermission: "invoices"
        },
        {
            title: "Receiving",
            href: "/dashboard/sales/receiving",
            requiredPermission: "sales-receiving"
        },
        // {
        //     title: "Sales Returns",
        //     href: "/dashboard/sales/returns",
        //     requiredPermission: "sales-returns"
        // },
        // {
        //     title: "Credit Notes",
        //     href: "/dashboard/sales/credit-notes",
        //     requiredPermission: "credit-notes"
        // },
        // {
        //     title: "Sales Orders",
        //     href: "/",
        // },
        // {
        //     title: "Shipments",
        //     href: "/",
        // },
        // {
        //     title: "Invoices",
        //     href: "/",
        // },
        // {
        //     title: "Sales Receipts",
        //     href: "/",
        // },
        // {
        //     title: "Payment Received",
        //     href: "/",
        // },
        // {
        //     title: "Sales Returns",
        //     href: "/",
        // },
        // {
        //     title: "Credit Notes",
        //     href: "/",
        // },
    ].filter(link => {
        return (!link.adminOnly || session?.user?.role === "admin") ||
            (link.requiredPermission && session?.user?.permissions?.[link.requiredPermission]);
    });

    // Add this with your other link arrays (near line 250)
    const receivingLinks = [
        {
            title: "All Receiving",
            href: "/dashboard/receiving",
            requiredPermission: "receiving"
        },
        {
            title: "Purchase Order Receiving",
            href: "/dashboard/receiving/po-receiving",
            requiredPermission: "po-receiving"
        },
        {
            title: "Direct Receiving",
            href: "/dashboard/receiving/direct-receiving",
            requiredPermission: "direct-receiving"
        },
        {
            title: "Receiving History",
            href: "/dashboard/receiving/history",
            requiredPermission: "receiving-history"
        },
        {
            title: "Receiving Reports",
            href: "/dashboard/receiving/reports",
            adminOnly: true,
            requiredPermission: "receiving-reports"
        },
    ].filter(link => {
        return (!link.adminOnly || session?.user?.role === "admin") ||
            (link.requiredPermission && session?.user?.permissions?.[link.requiredPermission]);
    });

    const purchaseLinks = [
        {
            title: "All Purchases",
            href: "/dashboard/purchases",
            requiredPermission: "purchases"
        },
        {
            title: "Purchase Orders",
            href: "/dashboard/purchases/orders",
            requiredPermission: "purchase-orders"
        },
        {
            title: "Purchase Returns",
            href: "/dashboard/purchases/returns",
            requiredPermission: "purchase-returns"
        },
        {
            title: "Bills",
            href: "/dashboard/purchases/bills",
            requiredPermission: "bills"
        },
        {
            title: "Supplier",
            href: "/dashboard/purchases/suppliers",
            requiredPermission: "suppliers"
        }
    ].filter(link => {
        return (!link.adminOnly || session?.user?.role === "admin") ||
            (link.requiredPermission && session?.user?.permissions?.[link.requiredPermission]);
    });


    const accountingLinks = [
        {
            title: "All",
            href: "/dashboard/accounting",
            requiredPermission: "accounting"
        },
        {
            title: "Chart of Accounts",
            href: "/dashboard/accounting/chart-of-accounts",
            requiredPermission: "accounting"
        },
        {
            title: "Journal Entries",
            href: "/dashboard/accounting/journal-entries",
            requiredPermission: "accounting"
        },
        {
            title: "General Ledger",
            href: "/dashboard/accounting/general-ledger",
            requiredPermission: "accounting"
        },
        {
            title: "Balance Sheet",
            href: "/dashboard/accounting/balance-sheet",
            requiredPermission: "accounting"
        },
        {
            title: "Income Statement",
            href: "/dashboard/accounting/income-statement",
            requiredPermission: "accounting"
        },
        {
            title: "Cash Flow",
            href: "/dashboard/accounting/cash-flow",
            requiredPermission: "accounting"
        }
    ];

    const bankingLinks = [
        {
            title: "Accounts",
            href: "/dashboard/banking/accounts",
            requiredPermission: "banking-accounts"
        },
        {
            title: "Transactions",
            href: "/dashboard/banking/transactions",
            requiredPermission: "banking-transactions"
        },
        {
            title: "Transfers",
            href: "/dashboard/banking/transfers",
            requiredPermission: "banking-transfers"
        },
        {
            title: "Reconciliations",
            href: "/dashboard/banking/reconciliations",
            requiredPermission: "banking-reconciliations"
        },
        {
            title: "Taxes",
            href: "/dashboard/banking/taxes",
            requiredPermission: "banking-taxes"
        }
    ].filter(link => {
        return (!link.adminOnly || session?.user?.role === "admin") ||
            (link.requiredPermission && session?.user?.permissions?.[link.requiredPermission]);
    });


    const posLinks = [
        {
            title: "All Point of Sales",
            href: "/dashboard/pos",
            requiredPermission: "pos"
        },
        {
            title: "Point of Sales",
            href: "/dashboard/pos/point-of-sales",
            requiredPermission: "pos"
        },
        // {
        //     title: "POS Terminal",
        //     href: "/dashboard/pos/terminal",
        //     requiredPermission: "pos-terminal"
        // },
        // {
        //     title: "Sales History",
        //     href: "/dashboard/pos/sales-history",
        //     requiredPermission: "pos-sales-history"
        // },
        // {
        //     title: "Cash Management",
        //     href: "/dashboard/pos/cash-management",
        //     requiredPermission: "pos-cash-management"
        // },
        // {
        //     title: "Shift Reports",
        //     href: "/dashboard/pos/shift-reports",
        //     requiredPermission: "pos-shift-reports"
        // },
        // {
        //     title: "POS Settings",
        //     href: "/dashboard/pos/settings",
        //     adminOnly: true,
        //     requiredPermission: "pos-settings"
        // },
    ].filter(link => {
        return (!link.adminOnly || session?.user?.role === "admin") ||
            (link.requiredPermission && session?.user?.permissions?.[link.requiredPermission]);
    });


    return (
        <>
            <RoleGuard allowedRoles={["admin", "user"]}>
                <div className={`${showSidebar ? "w-60 min-h-screen bg-violetRed text-white fixed lg:block z-50" : "w-60 min-h-screen bg-violetRed text-white fixed hidden lg:block z-50"}`}>
                    <div className="flex flex-col h-screen">
                        {/* Logo */}
                        <div className="flex justify-between flex-shrink-0 bg-white">
                            <Link href={"/"} prefetch={false} className="bg-white/10 flex space-x-2 items-center py-3 px-2 w-full">
                                <ShoppingCart className="text-[#B4287C]" />
                                <Image src={"/logo.png"} alt="Company Logo" width={150} height={50} />
                            </Link>
                            <button className='bg-white/10 px-2 py-3 lg:hidden' onClick={() => setShowSidebar(false)}>
                                <X className='w-6 h-6 text-[#B4287C]' />
                            </button>
                        </div>

                        {/* Links */}
                        <nav className='flex flex-col gap-3 px-3 py-6 flex-grow overflow-y-auto'>
                            <Link href={"/dashboard/home/overview"} prefetch={false}
                                className='flex items-center space-x-2 bg-white/10 text-white p-2 rounded-md transition-colors duration-300 hover:bg-white/40'>
                                <Home className='w-4 h-4' />
                                <span>Home</span>
                            </Link>

                            <SidebarDropdownLink items={inventoryLinks} title="Inventory" icon={BaggageClaim} setShowSidebar={setShowSidebar} />
                            {/* <SidebarDropdownLink items={accountingLinks} title="Accounting" icon={BarChart4} setShowSidebar={setShowSidebar} /> */}
                            <SidebarDropdownLink items={posLinks} title="Point of Sales" icon={ShoppingBasket} setShowSidebar={setShowSidebar} />
                            <SidebarDropdownLink items={bankingLinks} title="Banking" icon={Landmark} setShowSidebar={setShowSidebar} />
                            <SidebarDropdownLink items={salesLinks} title="Sales" icon={BadgeDollarSign} setShowSidebar={setShowSidebar} />
                            {/* <SidebarDropdownLink items={receivingLinks} title="Receiving" icon={ShoppingBag} setShowSidebar={setShowSidebar} /> */}

                            <SidebarDropdownLink items={purchaseLinks} title="Purchases" icon={ShoppingCart} setShowSidebar={setShowSidebar} />
                        </nav>
                        <SubscriptionCard />
                    </div>

                    <div className="flex flex-col flex-shrink-0">
                        <button className="bg-white/10 flex space-x-2 items-center py-3 px-2 justify-center">
                            <ChevronLeft className="text-white" />
                        </button>
                    </div>
                </div>
            </RoleGuard>
        </>
    )
}

export default Sidebar;