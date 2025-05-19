"use client"

import DataTableStockAdjustment from "@/components/dashboard/DataTableStockAdjustment";
import FixedHeader from "@/components/dashboard/FixedHeader";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { getData } from "@/lib/getData";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download, Filter, ListRestart } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const StockAdjustments = () => {
  // const stockAdjustments = await getData("inventory/stock-adjustments");
  // const columns = [
  //   // "adjustmentNumber",
  //   // "adjustmentType",
  //   "quantity",
  //   "currentStock",
  //   // "adjustmentDate",
  //   "reason",
  // ];


  const columns = ["adjustmentNumber", "adjustmentType", "quantity", "currentStock", "adjustmentDate"];
  const [stockAdjustments, setStockAdjustments] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);


  async function fetchData() {
    setLoading(true);
    try {
      const data = await getData("inventory/stock-adjustments");
      console.log("Stock Adjustments Data", data);
      setStockAdjustments(data);
      setFilteredStocks(data);
    } catch (error) {
      console.error("Error Fetching Stock Adjustments:", error);
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {

    fetchData();
  }, []);



  // Filter stocks on button click
  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = stockAdjustments.filter((stock) => {
        const stockDate = new Date(stock.adjustmentDate);
        return stockDate >= new Date(startDate) && stockDate <= new Date(endDate);
      });
      setFilteredStocks(filtered);
    } else {
      setFilteredSales(stockAdjustments);
    }
  };


  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFilteredStocks(stockAdjustments); // Reset to original stockAdjustments data
  };




  // Generate PDF
  const handleDownloadPDF = () => {
    if (!startDate || !endDate) {
      toast.success("Please select a start and end date before downloading the PDF.");
      return;
    }

    const doc = new jsPDF();
    doc.text("Stock Adjustments Report", 14, 10);
    doc.text(`From: ${startDate} To: ${endDate}`, 14, 20);

    const tableColumn = ["SrNo", "Adjustment Number", "Adjustment Type", "Quantity", "Current Stock", "Adjustment Date"];
    const tableRows = filteredStocks.map((stock, index) => [
      index + 1,
      stock.adjustmentNumber,
      stock.adjustmentType,
      stock.quantity,
      stock.currentStock,
      new Date(stock.adjustmentDate).toLocaleDateString(),
    ]);


    // Ensure autoTable is being called correctly
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save(`Stock_Adjustments_Report_${startDate}_to_${endDate}.pdf`);
  };

  return (
    <div>
      <FixedHeader title="Stock Adjustments" newLink="/dashboard/inventory/stock-adjustments/new" />

      {/* I need a Table that show all the brands */}
      {/* Table */}
      <div className="my-4 p-8 ">
        <h2 className="py-4 text-xl font-semibold">Stocks Record</h2>
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


      <div className="my-4 p-8 relative">
        {loading ? <LoadingSpinner message="Loading stock adjustments data, please wait..." /> : null}
        <DataTableStockAdjustment
          // data={stockAdjustments} 
          data={filteredStocks}
          columns={columns}
          resourceTitle={"stock-adjustments"}
        />
      </div>

    </div>
  );
};

export default StockAdjustments;