"use client";
import DataTablePurchases from "@/components/dashboard/DataTablePurchases";
import FixedHeader from "@/components/dashboard/FixedHeader";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

const PurchasesOrderPage = () => {
    const columns = ["purchaseOrderNumber", "orderDate", "expectedDeliveryDate", "status", "supplier.title", "total"];

    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData("purchases/orders");
                setPurchases(data);
            } catch (error) {
                console.error("Error fetching purchases:", error);
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
                {loading ? <LoadingSpinner message="Loading purchases orders data, please wait..." /> : null}
                <DataTablePurchases
                    data={purchases}
                    columns={columns}
                    resourceTitle="purchases/orders"
                />
            </div>
        </div>
    )
}

export default PurchasesOrderPage;