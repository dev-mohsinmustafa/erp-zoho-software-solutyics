"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getData } from '@/lib/getData';

const CustomerTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getData('sales/customers/transactions');
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Customer Transactions</h1>
                <Link
                    href="/dashboard/sales/customers/transactions/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    New Transaction
                </Link>
            </div>

            {transactions.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No transactions found</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="px-6 py-3 text-left">Transaction ID</th>
                                <th className="px-6 py-3 text-left">Date</th>
                                <th className="px-6 py-3 text-left">Type</th>
                                <th className="px-6 py-3 text-left">Amount</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id} className="border-b">
                                    <td className="px-6 py-4">{transaction.transactionId}</td>
                                    <td className="px-6 py-4">{new Date(transaction.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">{transaction.type}</td>
                                    <td className="px-6 py-4">{transaction.amount}</td>
                                    <td className="px-6 py-4">{transaction.status}</td>
                                    <td className="px-6 py-4">
                                        <Link href={`/dashboard/sales/customers/transactions/${transaction.id}`}
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

export default CustomerTransactions;