"use client";

import { getData } from "@/lib/getData";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";

const ViewInvoice = () => {
    const { data: session, status } = useSession();
    const name = session?.user?.name.toUpperCase();
    const companyName = session?.user?.companyName;
    const email = session?.user?.email;

    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const data = await getData(`sales/invoices/${id}`);
                setInvoice(data);
            } catch (error) {
                console.error("Error fetching invoice:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoice();
    }, [id]);

    // if (loading) {
    //     return <div className="text-blue-500">Loading invoice details...</div>;
    // }
    // if (!invoice) {
    //     return <div className="text-red-500">Invoice not found!</div>;
    // }

    const downloadPDF = () => {
        const doc = new jsPDF();

        // Company Information
        doc.setFontSize(24);
        doc.text("Invoice Information", 20, 20);

        // Company details on the right
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 255);
        doc.text(companyName || '', 190, 20, { align: 'right' });
        doc.setTextColor(0, 0, 0);
        doc.text(name || '', 190, 27, { align: 'right' });
        doc.text(email || '', 190, 34, { align: 'right' });

        // Bill To section
        doc.setFontSize(14);
        doc.text("Bill To", 20, 50);
        doc.setFontSize(12);
        doc.text(invoice.customer?.name || '', 20, 60);
        doc.text(invoice.customer?.address || '', 20, 67);
        doc.text(invoice.customer?.town || '', 20, 74);
        doc.text(`Tax Number: ${invoice.customer?.taxNumber || ''}`, 20, 81);
        doc.text(invoice.customer?.email || '', 20, 88);
        doc.text(invoice.customer?.website || '', 20, 95);

        // Invoice Details on right
        doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 190, 60, { align: 'right' });
        doc.text(`Invoice Date: ${new Date(invoice.invoiceDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })}`, 190, 67, { align: 'right' });
        doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })}`, 190, 74, { align: 'right' });

        // Items Table
        const tableHeaders = [['Items', 'Quantity', 'Price', 'Amount']];
        const tableData = invoice.items?.map(item => [
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

        // Calculate the Y position after the table
        const finalY = doc.lastAutoTable.finalY + 10;

        // Totals section
        const totalsX = 150;
        doc.text(`Subtotal: Rs${invoice.subTotal?.toFixed(2)}`, 190, finalY, { align: 'right' });
        doc.text(`Paid: -Rs${invoice.paid || 0?.toFixed(2)}`, 190, finalY + 7, { align: 'right' });
        doc.setFontSize(12);
        doc.text(`Total: Rs${invoice.total?.toFixed(2)}`, 190, finalY + 14, { align: 'right' });

        doc.save(`Invoice_${invoice.invoiceNumber}.pdf`);
    };


    return (
        <div className="p-8">
            <FixedHeader title="Invoice Details" newLink="/dashboard/sales/invoices/new" />

            <div className="bg-white p-6 shadow-md rounded-lg">
                {loading ? (
                    <LoadingSpinner message="Loading invoice details, please wait..." />
                ) : (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Invoice Information</h2>
                        {/* Company Information */}
                        <div className="text-right mb-8">
                            <h3 className="text-lg text-blue-600 font-medium">{companyName || ''}</h3>
                            <p className="text-gray-600">{name || ""}</p>
                            {/* <p className="text-gray-600">{email || ""}</p> */}
                            {/* <p className="text-gray-600 mt-2">
                        <span className="font-medium">Tax Number:</span> 1440
                    </p> */}
                            <p className="text-gray-600">
                                <a href={`mailto:${email || ""}`} className="text-blue-600 hover:underline">
                                    {email || ""}
                                </a>
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            {/* Left Side - Bill To */}
                            <div>
                                <h2 className="text-lg font-medium mb-4">Bill To</h2>
                                <p className="text-gray-800 font-medium">{invoice.customer?.name}</p>
                                <p className="text-gray-600">{invoice.customer?.address}</p>
                                <p className="text-gray-600">{invoice.customer?.town}</p>
                                <p className="text-gray-600 mt-2">
                                    <span className="font-medium">Tax Number:</span> {invoice.customer?.taxNumber}
                                </p>
                                <p className="text-gray-600">
                                    <a href={`mailto:${invoice.customer?.email}`} className="text-blue-600 hover:underline">
                                        {invoice.customer?.email}
                                    </a>
                                </p>
                                <p className="text-gray-600">
                                    <a href={invoice.customer?.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        {invoice.customer?.website}
                                    </a>
                                </p>
                            </div>

                            {/* Right Side - Invoice Details */}
                            <div className="text-right">
                                <div className="mb-4">
                                    <p className="mb-2">
                                        <span className="font-medium">Invoice Number: </span>
                                        <span className="text-blue-600">{invoice.invoiceNumber}</span>
                                    </p>
                                    <p className="mb-2">
                                        <span className="font-medium">Invoice Date: </span>
                                        {new Date(invoice.invoiceDate).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </p>
                                    <p>
                                        <span className="font-medium">Due Date: </span>
                                        {new Date(invoice.dueDate).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
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
                                    {invoice.items?.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="px-6 py-4">
                                                <p className="font-medium">{item.title}</p>
                                                <p className="text-gray-600">{item.description}</p>
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
                                    <span>Rs{invoice.subTotal?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span>Paid:</span>
                                    <span>- Rs{invoice.paid?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 font-medium">
                                    <span>Total:</span>
                                    <span>Rs{invoice.total?.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={downloadPDF}
                            className="mt-8 px-4 py-2 bg-[#545B96] text-white rounded-lg shadow-md hover:bg-[#444B86]"
                        >
                            Download PDF
                        </button>
                    </>
                )}
            </div>

        </div>
    );
};

export default ViewInvoice;