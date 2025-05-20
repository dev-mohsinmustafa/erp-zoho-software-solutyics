"use client";

import { getData } from "@/lib/getData";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useParams } from "next/navigation"; // ✅ Import useParams


const ViewSale = () => {
    const { id } = useParams(); // ✅ Get id using useParams()

    const [sale, setSale] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ Add loading state


    useEffect(() => {
        const fetchSale = async () => {
            try {
                const data = await getData(`inventory/sales/${id}`);
                setSale(data);
            } catch (error) {
                console.error("Error fetching sale:", error);

            } finally {
                setLoading(false); // ✅ Set loading to false
            }
        };
        fetchSale();
    }, [id]);

    // ✅ Show a loading message while fetching data
    if (loading) {
        return <div className="text-blue-500">Loading sale details...</div>;
    }
    if (!sale) {
        return <div className="text-red-500">Sale not found!</div>;
    }

    // Function to generate and download PDF
    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.text("Sale Details", 20, 10);

        autoTable(doc, {
            startY: 20,
            head: [["Field", "Value"]],
            body: [
                ["Customer Name", sale.customerName],
                ["Quantity", sale.quantity],
                ["Sale Date", new Date(sale.saleDate).toLocaleDateString()],
                ["Total Price", `$${sale.totalPrice}`],
                ["Payment Status", sale.paymentStatus],
            ],
        });

        doc.save(`Sale_${id}.pdf`);
    };

    return (
        <div className="p-8">
            <FixedHeader title="Sale Details" newLink="/dashboard/inventory/sales/new" />

            <div className="bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Sale Information</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p><strong>Customer Name:</strong> {sale.customerName}</p>
                        <p><strong>Quantity:</strong> {sale.quantity}</p>
                        <p><strong>Sale Date:</strong> {new Date(sale.saleDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p><strong>Total Price:</strong> ${sale.totalPrice}</p>
                        <p><strong>Payment Status:</strong> {sale.paymentStatus}</p>
                    </div>
                </div>

                {/* Download PDF Button */}
                <button
                    onClick={downloadPDF}
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default ViewSale;
