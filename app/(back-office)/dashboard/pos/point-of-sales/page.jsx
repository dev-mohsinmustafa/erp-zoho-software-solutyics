"use client";
import DataTablePointofSales from "@/components/dashboard/DataTablePointofSales";
import FixedHeader from "@/components/dashboard/FixedHeader";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

const CustomerPointofSales = () => {
    const columns = ["transactionId", "invoiceNumber", "invoiceDate", "dueDate", "status", "customer.name", "total", "paymentMethod"];

    const [pointOfSales, setPointOfSales] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData("pos/point-of-sales");
                setPointOfSales(data);
            } catch (error) {
                console.error("Error fetching point of sales:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* Fixed Header */}
            <FixedHeader title="Customer Point of Sales" newLink="/dashboard/pos/point-of-sales/new" />
            {/* Table */}
            <div className="my-4 p-8 relative">
                {loading ? <LoadingSpinner message="Loading point of sales data, please wait..." /> : null}
                <DataTablePointofSales
                    data={pointOfSales}
                    columns={columns}
                    resourceTitle="pos/point-of-sales"
                />
            </div>
        </div>
    )
}

export default CustomerPointofSales;