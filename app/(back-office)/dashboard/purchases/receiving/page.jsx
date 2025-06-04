"use client";
import DataTablePurchasesPayments from "@/components/dashboard/DataTablePurchasesPayments";
import FixedHeader from "@/components/dashboard/FixedHeader";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

const PurchasesReceivingPage = () => {
  const columns = ["receivingNumber", "receivingDate", "paymentMethod", "amountPaid", "remainingBalance", "paymentStatus"];

  const [purchasesReceiving, setPurchasesReceiving] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("purchases/receiving");
        setPurchasesReceiving(data);
      } catch (error) {
        console.error("Error fetching purchases receiving:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Purchases Orders Receiving Payments" newLink="/dashboard/purchases/receiving/new" />
      {/* Table */}
      <div className="my-4 p-8 relative">
        {loading ? <LoadingSpinner message="Loading purchases orders receiving payments data, please wait..." /> : null}
        <DataTablePurchasesPayments
          data={purchasesReceiving}
          columns={columns}
          resourceTitle="purchases/receiving"
        />
      </div>
    </div>
  )
}

export default PurchasesReceivingPage;