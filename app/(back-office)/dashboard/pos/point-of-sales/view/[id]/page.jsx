"use client";

import { getData } from "@/lib/getData";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";

const ViewPointofSale = () => {
    const { data: session, status } = useSession();
    const name = session?.user?.name.toUpperCase();
    const companyName = session?.user?.companyName;
    const email = session?.user?.email;

    const { id } = useParams();
    const [pos, setPos] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPos = async () => {
            try {
                const data = await getData(`pos/point-of-sales/${id}`);
                setPos(data);
            } catch (error) {
                console.error("Error fetching POS:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPos();
    }, [id]);

    const downloadPDF = () => {
        const doc = new jsPDF();

        // Company Information
        doc.setFontSize(24);
        doc.text("Point of Sale Receipt", 20, 20);

        // Company details on the right
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 255);
        doc.text(companyName || '', 190, 20, { align: 'right' });
        doc.setTextColor(0, 0, 0);
        doc.text(name || '', 190, 27, { align: 'right' });
        doc.text(email || '', 190, 34, { align: 'right' });

        // Customer section (if available)
        doc.setFontSize(14);
        doc.text("Customer Information", 20, 50);
        doc.setFontSize(12);
        if (pos.customer) {
            doc.text(pos.customer.name || 'Walk-in Customer', 20, 60);
            doc.text(pos.customer.address || '', 20, 67);
            doc.text(pos.customer.town || '', 20, 74);
            doc.text(`Tax Number: ${pos.customer?.taxNumber || 'N/A'}`, 20, 81);
            doc.text(pos.customer.email || '', 20, 88);
        } else {
            doc.text('Walk-in Customer', 20, 60);
        }

        // Transaction Details on right
        doc.text(`Transaction ID: ${pos.transactionId}`, 190, 60, { align: 'right' });
        doc.text(`Invoice Number: ${pos.invoiceNumber}`, 190, 67, { align: 'right' });
        doc.text(`Date: ${new Date(pos.transactionDate).toLocaleDateString()}`, 190, 74, { align: 'right' });
        doc.text(`Payment Method: ${pos.paymentMethod}`, 190, 81, { align: 'right' });
        doc.text(`Status: ${pos.status}`, 190, 88, { align: 'right' });

        // Items Table
        const tableHeaders = [['Items', 'Quantity', 'Price', 'Amount']];
        const tableData = pos.items?.map(item => [
            item.title,
            item.quantity.toString(),
            `Rs${item.price.toFixed(2)}`,
            `Rs${item.amount.toFixed(2)}`
        ]) || [];

        autoTable(doc, {
            startY: 100,
            head: tableHeaders,
            body: tableData,
            headStyles: { fillColor: [84, 91, 150] },
            theme: 'grid',
            styles: { fontSize: 10 },
            columnStyles: {
                0: { cellWidth: 80 },
                1: { cellWidth: 30, halign: 'center' },
                2: { cellWidth: 40, halign: 'right' },
                3: { cellWidth: 40, halign: 'right' }
            }
        });

        const finalY = doc.lastAutoTable.finalY + 10;

        // Totals section
        doc.text(`Subtotal: Rs${pos.subTotal?.toFixed(2)}`, 190, finalY, { align: 'right' });
        if (pos.discount > 0) {
            doc.text(`Discount: Rs${pos.discountAmount?.toFixed(2)}`, 190, finalY + 7, { align: 'right' });
        }
        doc.setFontSize(12);
        doc.text(`Total: Rs${pos.total?.toFixed(2)}`, 190, finalY + 14, { align: 'right' });

        doc.save(`POS_Receipt_${pos.transactionId}.pdf`);
    };

    return (
        <div className="p-8">
            <FixedHeader title="Point of Sale Details" newLink="/dashboard/pos/point-of-sales/new" />

            <div className="bg-white p-6 shadow-md rounded-lg relative">
                {loading ? (
                    <LoadingSpinner message="Loading point of sale details, please wait..." />
                ) : (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Point of Sale Receipt</h2>
                        {/* Added Top Design */}
                        <div className="mb-6 bg-gradient-to-r from-[#545B96] to-[#444B86] p-6 rounded-lg shadow-lg text-white">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">Point of Sale Receipt</h1>
                                    <p className="text-lg opacity-90">Transaction Details</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm opacity-80">Invoice Number</p>
                                    <p className="text-2xl font-bold">{pos?.invoiceNumber}</p>
                                </div>
                            </div>
                        </div>
                        {/* Company Information */}
                        <div className="text-right mb-8">
                            <h3 className="text-lg text-blue-600 font-medium">{companyName || ''}</h3>
                            <p className="text-gray-600">{name || ""}</p>
                            <p className="text-gray-600">
                                <a href={`mailto:${email || ""}`} className="text-blue-600 hover:underline">
                                    {email || ""}
                                </a>
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-8">
                            {/* Left Side - Customer Info */}
                            <div>
                                <h2 className="text-lg font-medium mb-4">Customer Information</h2>
                                {pos.customer ? (
                                    <>
                                        <p className="text-gray-800 font-medium">{pos.customer.name}</p>
                                        <p className="text-gray-600">{pos.customer.address}</p>
                                        <p className="text-gray-600">{pos.customer.town}</p>
                                        <p className="text-gray-600 mt-2">
                                            <span className="font-medium">Tax Number:</span> {pos.customer.taxNumber}
                                        </p>
                                        <p className="text-gray-600">
                                            <a href={`mailto:${pos.customer.email}`} className="text-blue-600 hover:underline">
                                                {pos.customer.email}
                                            </a>
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-gray-600">Walk-in Customer</p>
                                )}
                            </div>

                            {/* Right Side - Transaction Details */}
                            <div className="text-right">
                                <div className="mb-4">
                                    <p className="mb-2">
                                        <span className="font-medium">Transaction ID: </span>
                                        <span className="text-blue-600">{pos.transactionId}</span>
                                    </p>
                                    <p className="mb-2">
                                        <span className="font-medium">Invoice Number: </span>
                                        <span className="text-blue-600">{pos.invoiceNumber}</span>
                                    </p>
                                    <p className="mb-2">
                                        <span className="font-medium">Transaction Date: </span>
                                        {new Date(pos.transactionDate).toLocaleDateString()}
                                    </p>
                                    <p className="mb-2">
                                        <span className="font-medium">Payment Method: </span>
                                        {pos.paymentMethod}
                                    </p>
                                    <p>
                                        <span className="font-medium">Status: </span>
                                        <span className={`${pos.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                                            {pos.status}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="mt-8">
                            <table className="w-full">
                                <thead className="bg-[#545B96] text-white">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Items</th>
                                        <th className="px-6 py-3 text-center">Quantity</th>
                                        <th className="px-6 py-3 text-right">Price</th>
                                        <th className="px-6 py-3 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pos.items?.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="px-6 py-4">
                                                <p className="font-medium">{item.title}</p>
                                            </td>
                                            <td className="px-6 py-4 text-center">{item.quantity}</td>
                                            <td className="px-6 py-4 text-right">Rs{item.price.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-right">Rs{item.amount.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals */}
                        <div className="mt-6 flex justify-end">
                            <div className="w-64">
                                <div className="flex justify-between py-2">
                                    <span>Subtotal:</span>
                                    <span>Rs{pos.subTotal?.toFixed(2)}</span>
                                </div>
                                {pos.discount > 0 && (
                                    <div className="flex justify-between py-2 border-b">
                                        <span>Discount:</span>
                                        <span>Rs{pos.discountAmount?.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between py-2 font-medium">
                                    <span>Total:</span>
                                    <span>Rs{pos.total?.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={downloadPDF}
                            className="mt-8 px-4 py-2 bg-[#545B96] text-white rounded-lg shadow-md hover:bg-[#444B86]"
                        >
                            Download Receipt
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ViewPointofSale;