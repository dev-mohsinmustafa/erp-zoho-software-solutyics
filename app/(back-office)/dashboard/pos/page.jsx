"use client"

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
// import { Card } from '@/components/ui/card';
import { ShoppingCart, DollarSign, Clock, Settings, CreditCard, Users } from 'lucide-react';

const PointOfSalesDashboard = () => {
    const { data: session } = useSession();

    const salesStats = [
        {
            title: "Today's Sales",
            value: "$1,234.56",
            icon: DollarSign,
            color: "bg-green-500"
        },
        {
            title: "Active Orders",
            value: "12",
            icon: ShoppingCart,
            color: "bg-blue-500"
        },
        {
            title: "Pending Payments",
            value: "3",
            icon: Clock,
            color: "bg-yellow-500"
        },
        {
            title: "Total Customers",
            value: "156",
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
                {salesStats.map((stat, index) => (
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
                        {/* Sample transaction data - Replace with actual data */}
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">#TRX001</td>
                            <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                            <td className="px-6 py-4 whitespace-nowrap">$125.00</td>
                            <td className="px-6 py-4 whitespace-nowrap">Credit Card</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Completed</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">#TRX002</td>
                            <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                            <td className="px-6 py-4 whitespace-nowrap">$75.50</td>
                            <td className="px-6 py-4 whitespace-nowrap">Cash</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Completed</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PointOfSalesDashboard;