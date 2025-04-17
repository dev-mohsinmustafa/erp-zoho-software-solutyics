"use client"
import DataTableRequestBasedPurchaseOrder from "@/components/dashboard/DataTableRequestBasedPurchaseOrder";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { useEffect, useState } from "react";

const RequestBasedPurchaseOrders =  () => {

  // const columns = ["orderBy", "orderDate", "purchaseReceive", "purchaseOrder", "supplier.title", "orderStatus"];


  const [purchaseRequests, setPurchaseRequests] = useState([]);
  useEffect(() => {
    // Fetch approved purchase requests
    const fetchPurchaseRequests = async () => {
        try {
            const response = await fetch('/api/purchase-requests?status=approved');
            if (!response.ok) throw new Error('Failed to fetch requests');
            const data = await response.json();
            setPurchaseRequests(data);
        } catch (error) {
            console.error('Error fetching purchase requests:', error);
        }
    };

    fetchPurchaseRequests();
}, []);

  return (
    <>
      <div>
        {/* Fixed Header */}
        <FixedHeader title="Request-Based Purchase Order Management" newLink="/dashboard/inventory/purchase-orders/request-based/new" />
        {/* I need a Table that show all the items */}
        {/* Table */}
        <div className="my-4 p-8">
          <DataTableRequestBasedPurchaseOrder purchaseRequests={purchaseRequests}  resourceTitle="purchase-orders/request-based" />
        </div>
      </div>
    </>
  )
}
export default RequestBasedPurchaseOrders;
