
"use client"
// if use async then remove use client

import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
import { Download, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Filter } from 'lucide-react';
import { ListRestart } from 'lucide-react';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DataTableSales from "@/components/dashboard/DataTableSales";



// const Sales = async () => {
const Sales = () => {
  // const sales = await getData("sales");
  const columns = ["customerName", "quantity", "saleDate",];
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  async function fetchData() {
    const data = await getData("sales");
    console.log("Sales Data", data);
    setSales(data);
    setFilteredSales(data); // Initialize filtered sales with all data
  }
  useEffect(() => {
   
    fetchData();
  }, []);

  // // Filter sales based on date range
  // useEffect(() => {
  //   if (startDate && endDate) {
  //     const filtered = sales.filter((sale) => {
  //       const saleDate = new Date(sale.saleDate);
  //       return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
  //     });
  //     setFilteredSales(filtered);
  //   } else {
  //     setFilteredSales(sales);
  //   }
  // }, [startDate, endDate, sales]);

  // Filter sales on button click
  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = sales.filter((sale) => {
        const saleDate = new Date(sale.saleDate);
        return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
      });
      setFilteredSales(filtered);
    } else {
      setFilteredSales(sales); // Reset to all data if no date selected
    }
  };


  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFilteredSales(sales); // Reset to original sales data
  };




  // Generate PDF
  const handleDownloadPDF = () => {
    if (!startDate || !endDate) {
      alert("Please select a start and end date before downloading the PDF.");
      return;
    }

    const doc = new jsPDF();
    doc.text("Sales Report", 14, 10);
    doc.text(`From: ${startDate} To: ${endDate}`, 14, 20);

    const tableColumn = ["Customer Name", "Quantity", "Sale Date"];
    const tableRows = filteredSales.map((sale) => [
      sale.customerName,
      sale.quantity,
      new Date(sale.saleDate).toLocaleDateString(),
    ]);

  
    // Ensure autoTable is being called correctly
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save(`Sales_Report_${startDate}_to_${endDate}.pdf`);
  };

  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Sales Management" newLink="/dashboard/inventory/sales/new" />

      {/* I need a Table that show all the brands */}
      {/* Table */}
      <div className="my-4 p-8 ">
        <h2 className="py-4 text-xl font-semibold">Sales Record</h2>
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

      <div className="my-4 p-8 ">
        <DataTableSales data={filteredSales} columns={columns} resourceTitle={"sales"} 
        onRefresh={fetchData}
        />
      </div>

      {/* <DataTable data={sales} columns={columns} resourceTitle={"sales"} /> */}

    </div>
  )
}
export default Sales;