"use client";

import { getData } from "@/lib/getData";
import FormHeader from "@/components/dashboard/FormHeader";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";

const ViewPurchaseOrder = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData(`purchases/orders/${id}`);
                setOrder(data);
            } catch (error) {
                console.error("Error fetching order:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const getStatusColor = (status) => {
        const statusColors = {
            'Pending': 'bg-yellow-100 text-yellow-800',
            'Approved': 'bg-green-100 text-green-800',
            'Received': 'bg-blue-100 text-blue-800',
            'Cancelled': 'bg-red-100 text-red-800'
        };
        return statusColors[status] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return <LoadingSpinner message="Loading purchase order details..." />;
    }

    if (!order) {
        return <div>Purchase Order not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <FormHeader title="Purchase Order Details" href="/dashboard/purchases/orders" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800">PO #{order.purchaseOrderNumber}</h2>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            {new Date(order.orderDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>

                    {/* Supplier Information */}
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Supplier Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Supplier Name</p>
                                <p className="mt-1">{order.supplier?.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Contact</p>
                                <p className="mt-1">{order.supplier?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Order Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Expected Delivery</p>
                                <p className="mt-1">{new Date(order.expectedDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Payment Terms</p>
                                <p className="mt-1">{order.paymentTerms}</p>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="px-6 py-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {order.items?.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{item.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">${item.unitPrice}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">${item.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="px-6 py-4 bg-gray-50">
                        <div className="flex justify-end space-y-2">
                            <div className="text-right">
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium text-gray-500">Subtotal:</span>
                                    <span className="text-sm text-gray-900 ml-4">${order.subtotal}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-sm font-medium text-gray-500">Tax:</span>
                                    <span className="text-sm text-gray-900 ml-4">${order.tax}</span>
                                </div>
                                <div className="flex justify-between mt-2 text-lg font-bold">
                                    <span className="text-gray-900">Total:</span>
                                    <span className="text-gray-900 ml-4">${order.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPurchaseOrder;