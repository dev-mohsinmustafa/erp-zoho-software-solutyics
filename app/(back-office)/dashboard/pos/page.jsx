"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ShoppingCart, DollarSign, Clock, Settings, CreditCard, Users } from 'lucide-react';

const PointOfSalesDashboard = () => {
    const { data: session } = useSession();
    const [transactions, setTransactions] = useState([]);
    const [salesStats, setSalesStats] = useState({
        todaySales: 0,
        activeOrders: 0,
        pendingPayments: 0,
        totalCustomers: new Set()
    });

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await fetch('/api/pos/point-of-sales');
            const data = await response.json();
            setTransactions(data);

            // Calculate dashboard statistics
            const today = new Date().toISOString().split('T')[0];
            const stats = data.reduce((acc, transaction) => {
                // Today's sales
                if (transaction.transactionDate.split('T')[0] === today) {
                    acc.todaySales += transaction.total;
                }
                // Active orders (not completed)
                if (transaction.status !== 'Completed') {
                    acc.activeOrders++;
                }
                // Pending payments
                if (transaction.status === 'Pending') {
                    acc.pendingPayments++;
                }
                // Unique customers
                if (transaction.customerId) {
                    acc.totalCustomers.add(transaction.customerId);
                }
                return acc;
            }, {
                todaySales: 0,
                activeOrders: 0,
                pendingPayments: 0,
                totalCustomers: new Set()
            });

            setSalesStats({
                ...stats,
                totalCustomers: stats.totalCustomers.size
            });
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const statsCards = [
        {
            title: "Today's Sales",
            value: `$${salesStats.todaySales.toFixed(2)}`,
            icon: DollarSign,
            color: "bg-green-500"
        },
        {
            title: "Active Orders",
            value: salesStats.activeOrders.toString(),
            icon: ShoppingCart,
            color: "bg-blue-500"
        },
        {
            title: "Pending Payments",
            value: salesStats.pendingPayments.toString(),
            icon: Clock,
            color: "bg-yellow-500"
        },
        {
            title: "Total Customers",
            value: salesStats.totalCustomers.toString(),
            icon: Users,
            color: "bg-purple-500"
        }
    ];

    const quickActions = [
        {
            title: "New Sale",
            icon: ShoppingCart,
            href: "/dashboard/pos/terminal",
            color: "bg-blue-600"
        },
        {
            title: "View History",
            icon: Clock,
            href: "/dashboard/pos/sales-history",
            color: "bg-green-600"
        },
        {
            title: "Manage Cash",
            icon: DollarSign,
            href: "/dashboard/pos/cash-management",
            color: "bg-yellow-600"
        },
        {
            title: "Settings",
            icon: Settings,
            href: "/dashboard/pos/settings",
            color: "bg-purple-600"
        }
    ];

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Point of Sales Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsCards.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">{stat.title}</p>
                                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-full`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {quickActions.map((action, index) => (
                    <a
                        key={index}
                        href={action.href}
                        className={`${action.color} hover:opacity-90 transition-opacity rounded-lg p-6 text-white flex flex-col items-center justify-center text-center cursor-pointer`}
                    >
                        <action.icon className="w-8 h-8 mb-3" />
                        <span className="text-lg font-semibold">{action.title}</span>
                    </a>
                ))}
            </div>

            {/* Recent Transactions */}
            <h2 className="text-2xl font-semibold mb-6">Recent Transactions</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {transactions.slice(0, 5).map((transaction, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{transaction.transactionId}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{transaction.customer?.name || 'Walk-in Customer'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${transaction.total.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{transaction.paymentMethod}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${transaction.status === 'Completed' || transaction.status === 'Paid'
                                            ? 'text-green-800 bg-green-100'
                                            : transaction.status === 'Pending'
                                                ? 'text-yellow-800 bg-yellow-100'
                                                : 'text-gray-800 bg-gray-100'
                                        }`}>
                                        {transaction.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PointOfSalesDashboard;