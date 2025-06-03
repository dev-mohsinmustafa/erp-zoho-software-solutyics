"use client";
import DataTableInvoices from "@/components/dashboard/DataTableInvoices";
import FixedHeader from "@/components/dashboard/FixedHeader";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

const PurchasesOrderPage = () => {
    // const invoices = await getData("sales/invoices");
    const columns = ["invoiceNumber", "invoiceDate", "dueDate", "status", "customer.name", "total"];

    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData("sales/invoices");
                setInvoices(data);
            } catch (error) {
                console.error("Error fetching invoices:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* Fixed Header */}
            <FixedHeader title="Purchase Orders" newLink="/dashboard/purchases/orders/new" />
            {/* Table */}
            <div className="my-4 p-8 relative">
                {loading ? <LoadingSpinner message="Loading invoices data, please wait..." /> : null}
                <DataTableInvoices
                    data={invoices}
                    columns={columns}
                    resourceTitle="sales/invoices"
                // resourceTitle="purchases/orders"
                />
            </div>
        </div>
    )
}

export default PurchasesOrderPage;