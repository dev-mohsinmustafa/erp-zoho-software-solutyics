"use client";
import DataTableInvoicesPayments from "@/components/dashboard/DataTableInvoicesPayments";
import FixedHeader from "@/components/dashboard/FixedHeader";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

const SalesReceivingPage = () => {
  // const invoices = await getData("sales/invoices");
  // const columns = ["invoiceNumber", "invoiceDate", "transactionDate", "transactionId", "status", "customer.name", "total"];
  const columns = ["receivingNumber", "receivingDate", "paymentMethod", "amountReceived", "remainingBalance", "paymentStatus"];

  const [receiving, setReceiving] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("sales/receiving");
        setReceiving(data);
      } catch (error) {
        console.error("Error fetching receiving:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Customer Invoices Receiving Payments" newLink="/dashboard/sales/receiving/new" />
      {/* Table */}
      <div className="my-4 p-8 relative">
        {loading ? <LoadingSpinner message="Loading invoices receiving payments data, please wait..." /> : null}
        <DataTableInvoicesPayments
          data={receiving}
          columns={columns}
          resourceTitle="sales/receiving"
        />
      </div>
    </div>
  )
}

export default SalesReceivingPage;