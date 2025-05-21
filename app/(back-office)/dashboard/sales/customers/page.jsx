"use client"

import DataTableSalesCustomers from "@/components/dashboard/DataTableSalesCustomers";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [activeTab, setActiveTab] = useState("invoices");
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    const columns = ["customerCode", "name", "phone", "email", "address", "currency"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData("sales/customers");
                setCustomers(data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div>
            <FixedHeader title="Customers" newLink="/dashboard/sales/customers/new" />

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-8">
                    <button
                        onClick={() => setActiveTab("invoices")}
                        className={`py-4 px-1 text-sm font-medium border-b-2 ${activeTab === "invoices"
                            ? "text-blue-600 border-blue-600"
                            : "text-gray-500 border-transparent hover:text-gray-700"
                            }`}
                    >
                        Invoices
                    </button>
                    <button
                        onClick={() => setActiveTab("transactions")}
                        className={`py-4 px-1 text-sm font-medium border-b-2 ${activeTab === "transactions"
                            ? "text-blue-600 border-blue-600"
                            : "text-gray-500 border-transparent hover:text-gray-700"
                            }`}
                    >
                        Transactions
                    </button>
                </nav>
            </div>

            {/* Content based on active tab */}
            <div className="my-4">
                {activeTab === "invoices" && (
                    <div className="flex flex-col items-center justify-center bg-gray-50 p-8 rounded-lg mx-8">
                        <Image
                            src="/images/customersInvoices.png"
                            alt="Customers Invoices"
                            width={300}
                            height={300}
                            priority
                        />
                        <div className="text-center mt-4">
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                There is no invoice for this customer yet. Create a new one now.
                            </h3>
                            <Link
                                href="/dashboard/sales/invoices/new"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                New Invoice
                            </Link>
                        </div>
                    </div>
                )}

                {activeTab === "transactions" && (
                    <div className="flex flex-col items-center justify-center bg-gray-50 p-8 rounded-lg mx-8">
                        <Image
                            src="/images/customersTransactions.png"
                            alt="Customers Transactions"
                            width={300}
                            height={300}
                            priority
                        />
                        <div className="text-center mt-4">
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                There is no transaction for this customer yet. Create a new one now.
                            </h3>
                            <Link
                                href="/dashboard/sales/customers/transactions/new"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                New Transaction
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Existing Customer Table */}
            <div className="my-4 p-8">
                <DataTableSalesCustomers
                    data={customers}
                    columns={columns}
                    resourceTitle={"sales/customers"}
                />
            </div>
        </div>
    );
};

export default Customers;