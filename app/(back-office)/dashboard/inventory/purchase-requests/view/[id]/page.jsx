"use client";

import { getData } from "@/lib/getData";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useParams } from "next/navigation"; // ✅ Import useParams
import Image from "next/image";


const ViewPurchaseRequest = () => {

    const { id } = useParams();
    const [purchaseRequest, setPurchaseRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("Component Rendered - ID from useParams:", id); // ✅ Log the ID from useParams


    useEffect(() => {
        const fetchPurchaseRequest = async () => {
            if (!id) return; // ✅ Prevents fetching if ID is not available
            console.log("Fetching purchase request for ID:", id); // ✅ Log API fetch attempt

            try {
                const data = await getData(`inventory/purchase-requests/${id}`);
                console.log("Fetched Purchase Request Data:", data); // ✅ Log API response

                setPurchaseRequest(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching purchase request:", error);

            } finally {
                setLoading(false); // ✅ Set loading to false
            }
        };
        fetchPurchaseRequest();
    }, [id]);

    // ✅ Show a loading message while fetching data
    if (loading) {
        return <div className="text-blue-500">Loading purchase request details...</div>;
    }
    if (!purchaseRequest) {
        return <div className="text-red-500">purchase request not found!</div>;
    }

    // Function to generate and download PDF
    // const downloadPDF = () => {
    //     const doc = new jsPDF();

    //     doc.text("Sale Details", 20, 10);

    //     autoTable(doc, {
    //         startY: 20,
    //         head: [["Field", "Value"]],
    //         body: [
    //             ["Customer Name", sale.customerName],
    //             ["Quantity", sale.quantity],
    //             ["Sale Date", new Date(sale.saleDate).toLocaleDateString()],
    //             ["Total Price", `$${sale.totalPrice}`],
    //             ["Payment Status", sale.paymentStatus],
    //         ],
    //     });

    //     doc.save(`Sale_${id}.pdf`);
    // };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">


            <FixedHeader title="Purchase Request Details" newLink="/dashboard/inventory/purchase-requests/new" />

            <div className="bg-white p-6 shadow-md rounded-lg">
                {/* <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg"> */}

                {/* ✅ Solutyics Logo */}
                <div className="flex justify-center mb-6">
                    <Image
                        src="/logo.png" // ✅ Replace with your logo path
                        alt="Solutyics Logo"
                        width={150}
                        height={50}
                        className="object-contain"
                    />
                </div>

                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Purchase Request Details</h1>



                <div className="grid grid-cols-2 gap-4 text-gray-700">
                    {purchaseRequest ?
                        (
                            <div>
                                <p><strong className="text-gray-900">ID:</strong> {purchaseRequest.id}</p>
                                <p><strong className="text-gray-900">Quantity:</strong> {purchaseRequest.quantity}</p>
                                <p><strong className="text-gray-900">Category:</strong> {purchaseRequest.categoryId}</p>
                                <p><strong className="text-gray-900">Unit:</strong> {purchaseRequest.unitId}</p>
                                <p><strong className="text-gray-900">Brand:</strong> {purchaseRequest.brandId}</p>
                                {/* <p><strong className="text-gray-900">Supplier:</strong> {purchaseRequest.supplierId}</p> */}
                                <p><strong className="text-gray-900">Warehouse:</strong> {purchaseRequest.warehouseId}</p>
                                <p><strong className="text-gray-900">Description:</strong> {purchaseRequest.description}</p>
                                <p><strong className="text-gray-900">Status:</strong>
                                    {/* {purchaseRequest.status} */}
                                    <span className={`ml-2 px-2 py-1 rounded-lg text-white ${purchaseRequest.status === 'Approved' ? 'bg-green-500' : purchaseRequest.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                                        {purchaseRequest.status}
                                    </span>
                                </p>
                                <p><strong className="text-gray-900">Requested By:</strong> {purchaseRequest.requestedBy}</p>
                                <p><strong className="text-gray-900">Date:</strong> {new Date(purchaseRequest.createdAt).toLocaleDateString()}</p>
                            </div>
                        )
                        :
                        (
                            <p>Purchase request not found.</p>
                        )}

                </div>

                {/* Download PDF Button */}
                {/* <button
                    onClick={downloadPDF}
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                >
                    Download PDF
                </button> */}
            </div>
        </div>
    );
};

export default ViewPurchaseRequest;
