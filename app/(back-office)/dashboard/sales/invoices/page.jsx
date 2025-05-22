"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getData } from '@/lib/getData';

const CustomerInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const data = await getData('sales/customers');
                setInvoices(data);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Customer Invoices</h1>
                <Link
                    href="/dashboard/sales/customers/invoices/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    New Invoice
                </Link>
            </div>

            {invoices.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No invoices found</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="px-6 py-3 text-left">Invoice #</th>
                                <th className="px-6 py-3 text-left">Date</th>
                                <th className="px-6 py-3 text-left">Amount</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice) => (
                                <tr key={invoice.id} className="border-b">
                                    <td className="px-6 py-4">{invoice.invoiceNumber}</td>
                                    <td className="px-6 py-4">{new Date(invoice.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">{invoice.amount}</td>
                                    <td className="px-6 py-4">{invoice.status}</td>
                                    <td className="px-6 py-4">
                                        <Link href={`/dashboard/sales/customers/invoices/${invoice.id}`}
                                            className="text-blue-600 hover:text-blue-800">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomerInvoices;