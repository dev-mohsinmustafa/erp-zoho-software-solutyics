
"use client"

import { useState, useEffect } from 'react';
import RoleGuard from '@/app/roleGuard/RoleGuard';
import FixedHeader from '@/components/dashboard/FixedHeader';
import { BarChart, DollarSign, Truck, Package, Clock, Settings, FileText } from 'lucide-react';

const Purchases = () => {
  const [metrics, setMetrics] = useState({
    totalPurchases: 0,
    totalExpenditure: 0,
    totalSuppliers: 0,
    averageOrderValue: 0
  });
  const [recentPurchases, setRecentPurchases] = useState([]);


  const cards = [
    {
      title: "Total Purchases",
      value: metrics.totalPurchases,
      icon: Package,
      color: "bg-blue-500"
    },
    {
      title: "Total Expenditure",
      value: `PKR ${metrics.totalExpenditure.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-red-500"
    },
    {
      title: "Suppliers",
      value: metrics.totalSuppliers,
      icon: Truck,
      color: "bg-purple-500"
    },
    {
      title: "Avg. Order Value",
      value: `PKR ${metrics.averageOrderValue.toFixed(2)}`,
      icon: BarChart,
      color: "bg-orange-500"
    }
  ];

  const quickActions = [
    {
      title: "New Purchase Order",
      icon: FileText,
      href: "/dashboard/purchases/orders/new",
      color: "bg-blue-600"
    },
    {
      title: "View History",
      icon: Clock,
      href: "/dashboard/purchases/orders",
      color: "bg-green-600"
    },
    {
      title: "Manage Suppliers",
      icon: Truck,
      href: "/dashboard/inventory/suppliers",
      color: "bg-yellow-600"
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/purchases/settings",
      color: "bg-purple-600"
    }
  ];

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const purchasesResponse = await fetch('/api/purchases/orders');
        const purchasesData = await purchasesResponse.json();

        const suppliersResponse = await fetch('/api/inventory/suppliers');
        const suppliersData = await suppliersResponse.json();

        const totalPurchases = purchasesData.length;
        const totalExpenditure = purchasesData.reduce((sum, order) => sum + (order.total || 0), 0);
        const totalSuppliers = suppliersData.length;
        const averageOrderValue = totalPurchases > 0 ? totalExpenditure / totalPurchases : 0;

        setMetrics({
          totalPurchases,
          totalExpenditure,
          totalSuppliers,
          averageOrderValue
        });
        // Set recent purchases data (last 10 purchases)
        setRecentPurchases(purchasesData.slice(0, 10));
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <FixedHeader title="Purchases Dashboard" newLink="/dashboard/purchases/orders/new" />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Purchases Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <h3 className="text-2xl font-bold mt-2">{card.value}</h3>
                </div>
                <div className={`${card.color} p-3 rounded-full`}>
                  <card.icon className="w-6 h-6 text-white" />
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

        {/* Recent Purchase Orders */}
        <h2 className="text-2xl font-semibold mb-6">Recent Purchase Orders</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentPurchases.map((purchase, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{purchase.orderNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{purchase.supplier?.name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">PKR {purchase.total?.toFixed(2) || '0.00'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(purchase.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${purchase.status?.toLowerCase() === 'completed'
                        ? 'text-green-800 bg-green-100'
                        : purchase.status?.toLowerCase() === 'draft'
                          ? 'text-gray-800 bg-gray-100'
                          : purchase.status?.toLowerCase() === 'pending'
                            ? 'text-yellow-800 bg-yellow-100'
                            : purchase.status?.toLowerCase() === 'cancelled'
                              ? 'text-red-800 bg-red-100'
                              : 'text-yellow-800 bg-yellow-100'
                      }`}>
                      {purchase.status?.charAt(0).toUpperCase() + purchase.status?.slice(1) || 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
              {recentPurchases.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No recent purchases found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Recent Purchase Orders */}
        <h2 className="text-2xl font-semibold mb-6">Recent Purchase Orders</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Sample purchase order data - Replace with actual data */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">#PO001</td>
                <td className="px-6 py-4 whitespace-nowrap">Supplier Co.</td>
                <td className="px-6 py-4 whitespace-nowrap">PKR 12,500.00</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-01-20</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Completed</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">#PO002</td>
                <td className="px-6 py-4 whitespace-nowrap">Vendor Ltd.</td>
                <td className="px-6 py-4 whitespace-nowrap">PKR 8,750.00</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-01-19</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </RoleGuard>
  );
};

export default Purchases;