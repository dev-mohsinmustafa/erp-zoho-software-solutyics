"use client"

import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
import { Download, Filter, ListRestart } from "lucide-react";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DataTablePOGoodReceivedRequestBasedPurchaseOrder from "@/components/dashboard/DataTablePOGoodReceivedRequestBasedPurchaseOrder";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";

// const GoodsReceived = async () => {
const POGoodsReceived = () => {
  // const poGoodsReceived = await getData("goods-received");
  const columns = ["grnNumber", "requestBasedPurchaseOrderId", "receivedBy", "receivedDate", "grnRemarks", "totalPayment"];
  // "category.title", "warehouse.title", "quantity", "description" , "orderBy", "orderDate", "purchaseReceive", "purchaseOrder", "orderStatus", "goodsStatus"

  const [goodReceived, setGoodReceived] = useState([]);
  const [filteredGoodReceived, setFilteredGoodReceived] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getData("poGoods-received");
        setGoodReceived(data);
        setFilteredGoodReceived(data);
      } catch (error) {
        console.error("Error fetching goods received:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter goodReceived on button click
  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = goodReceived.filter((good) => {
        const receivedDate = new Date(good.receivedDate);
        return receivedDate >= new Date(startDate) && receivedDate <= new Date(endDate);
      });
      setFilteredGoodReceived(filtered);
    } else {
      setFilteredGoodReceived(goodReceived); // Reset to all data if no date selected
    }
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFilteredGoodReceived(goodReceived); // Reset to original sales data
  };



  // Generate PDF
  const handleDownloadPDF = () => {
    if (!startDate || !endDate) {
      toast.success("Please select a start and end date before downloading the PDF.");
      return;
    }

    const doc = new jsPDF();
    doc.text("Goods Report", 14, 10);
    doc.text(`From: ${startDate} To: ${endDate}`, 14, 20);

    const tableColumn = ["SrNo", "Received By", "grnNumber", "requestBasedPurchaseOrderId", "Received Date", "totalPayment", "grnRemarks"];
    const tableRows = filteredGoodReceived.map((good, index) => [
      index + 1,
      good.receivedBy,
      good.grnNumber,
      good.requestBasedPurchaseOrderId,
      new Date(good.receivedDate).toLocaleDateString(),
      good.totalPayment,
      good.grnRemarks,
    ]);


    // Ensure autoTable is being called correctly
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save(`Goods_Report_${startDate}_to_${endDate}.pdf`);
  };





  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Goods Received Create Goods Received Note (GRN) against RB PO" newLink="/dashboard/inventory/poGoods-received/new" />

      {/* Table */}
      <div className="my-4 p-8 ">
        <h2 className="py-4 text-xl font-semibold">Purchase Order Goods Record</h2>
        {/* Date Filters */}
        <div className="flex gap-4 p-4 ">
          <label className="block">
            <span className="text-gray-700">Start Date:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">End Date:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
          </label>

        </div>

        <div className="flex space-x-28 pl-4">
          {/* Filter Button */}
          <button
            onClick={handleFilter}
            className="p-1 rounded-sm bg-blue-600 px-3 flex items-center space-x-2 text-white transition-colors duration-300 hover:bg-gray-200 hover:text-black">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>


          {/* Reset Button */}
          {/* Clear Filters Button */}
          <button
            onClick={handleReset}
            className="p-1 rounded-sm bg-blue-600 px-3 flex items-center space-x-2 text-white transition-colors duration-300 hover:bg-gray-300 hover:text-black"
          >
            <ListRestart className="w-4 h-4" />
            <span>Reset</span>
          </button>

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPDF}
            className="p-1 rounded-sm bg-green-600 px-3 flex items-center space-x-2 text-white transition-colors duration-300 hover:bg-gray-300 hover:text-black"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>

      </div>


      {/* I need a Table that show all the items */}
      {/* Table */}
      <div className="px-8">
        <h2 className="text-xl font-semibold">Table Request-Based Purchase Order Management Goods Received</h2>
      </div>
      <div className="my-4 p-8 relative">
        {loading ? <LoadingSpinner message="Loading goods received data, please wait..." /> : null}
        <DataTablePOGoodReceivedRequestBasedPurchaseOrder
          data={filteredGoodReceived}
          columns={columns}
          resourceTitle="poGoods-received"
        />
      </div>
    </div>
  )
}
export default POGoodsReceived;