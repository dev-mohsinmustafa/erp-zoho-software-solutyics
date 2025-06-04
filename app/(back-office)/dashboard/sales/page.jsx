
"use client"
import { useState, useEffect } from 'react';
import RoleGuard from '@/app/roleGuard/RoleGuard';
import FixedHeader from '@/components/dashboard/FixedHeader';
import { BarChart, DollarSign, ShoppingCart, Users, Clock, Settings, FileText } from 'lucide-react';

const SalesDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    averageOrderValue: 0
  });

  const cards = [
    {
      title: "Total Sales",
      value: metrics.totalSales,
      icon: ShoppingCart,
      color: "bg-blue-500"
    },
    {
      title: "Revenue",
      value: `PKR ${metrics.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-green-500"
    },
    {
      title: "Customers",
      value: metrics.totalCustomers,
      icon: Users,
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
      title: "New Sale",
      icon: FileText,
      href: "/dashboard/inventory/sales/new",
      color: "bg-blue-600"
    },
    {
      title: "View History",
      icon: Clock,
      href: "/dashboard/inventory/sales",
      color: "bg-green-600"
    },
    {
      title: "Manage Customers",
      icon: Users,
      href: "/dashboard/inventory/customers",
      color: "bg-yellow-600"
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/sales/settings",
      color: "bg-purple-600"
    }
  ];

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Fetch sales data
        const salesResponse = await fetch('/api/sales/invoices');
        const salesData = await salesResponse.json();

        // Fetch customers data
        const customersResponse = await fetch('/api/sales/customers');
        const customersData = await customersResponse.json();

        // Calculate metrics
        const totalSales = salesData.length;
        const totalRevenue = salesData.reduce((sum, sale) => sum + (sale.total || 0), 0);
        const totalCustomers = customersData.length;
        const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;

        setMetrics({
          totalSales,
          totalRevenue,
          totalCustomers,
          averageOrderValue
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <FixedHeader title="Sales Dashboard" newLink="/dashboard/inventory/sales/new" />

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Sales Dashboard</h1>

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

        {/* Recent Sales */}
        <h2 className="text-2xl font-semibold mb-6">Recent Sales</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Sample sales data - Replace with actual data */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">#INV001</td>
                <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                <td className="px-6 py-4 whitespace-nowrap">PKR 12,500.00</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-01-20</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Paid</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">#INV002</td>
                <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
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

export default SalesDashboard;