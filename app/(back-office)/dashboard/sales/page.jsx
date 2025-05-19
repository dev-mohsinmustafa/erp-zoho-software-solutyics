
"use client"
import { useState, useEffect } from 'react';
import RoleGuard from '@/app/roleGuard/RoleGuard';
import FixedHeader from '@/components/dashboard/FixedHeader';
import { BarChart, DollarSign, ShoppingCart, Users } from 'lucide-react';

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
      value: `$${metrics.totalRevenue.toFixed(2)}`,
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
      value: `$${metrics.averageOrderValue.toFixed(2)}`,
      icon: BarChart,
      color: "bg-orange-500"
    }
  ];

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div>
        <FixedHeader title="Sales Dashboard" newLink="/dashboard/inventory/sales/new" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
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
      </div>
    </RoleGuard>
  );
};

export default SalesDashboard;