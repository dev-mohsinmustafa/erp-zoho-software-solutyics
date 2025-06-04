"use client"

import FormHeader from "@/components/dashboard/FormHeader";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";


const ViewPurchaseReceivePayment = () => {
    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData(`purchases/receiving/${id}`);
                setPayment(data);
            } catch (error) {
                console.error("Error fetching payment:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (!payment) {
    //     return <div>Payment not found</div>;
    // }

    const getStatusColor = (status) => {
        const statusColors = {
            'Paid': 'bg-green-100 text-green-800',
            'Partial': 'bg-yellow-100 text-yellow-800',
            'Pending': 'bg-red-100 text-red-800'
        };
        return statusColors[status] || 'bg-gray-100 text-gray-800';
    };
    return (
        <div>
            <FormHeader title="View Payment Details" href="/dashboard/purchases/receiving" />



            <div className="w-full max-w-3xl p-8 bg-white border border-gray-200 rounded-lg shadow-sm mx-auto my-3">

                {loading ? (
                    <LoadingSpinner message="Loading receiving purchases orders details, please wait..." />
                ) : (
                    <>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="col-span-2">
                                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Receiving Number</label>
                                <p className="mt-1 text-sm text-gray-900">{payment.receivingNumber}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Receiving Date</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(payment.receivingDate).toLocaleDateString()}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                                <p className="mt-1 text-sm text-gray-900">{payment.paymentMethod}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Amount Paid</label>
                                <p className="mt-1 text-sm text-gray-900">{payment.amountPaid}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Remaining Balance</label>
                                <p className="mt-1 text-sm text-gray-900">{payment.remainingBalance}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                                <p className="mt-1 text-sm text-gray-900">{payment.paymentStatus}</p>
                            </div>

                            {payment.bankName && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                                    <p className="mt-1 text-sm text-gray-900">{payment.bankName}</p>
                                </div>
                            )}

                            {payment.chequeNumber && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cheque Number</label>
                                    <p className="mt-1 text-sm text-gray-900">{payment.chequeNumber}</p>
                                </div>
                            )}

                            {payment.transactionReference && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Transaction Reference</label>
                                    <p className="mt-1 text-sm text-gray-900">{payment.transactionReference}</p>
                                </div>
                            )}

                            {payment.notes && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                                    <p className="mt-1 text-sm text-gray-900">{payment.notes}</p>
                                </div>
                            )}
                        </div>

                    </>
                )}
            </div>
            {/*  */}
            <div className="min-h-screen bg-gray-50 py-8">
                {loading ? (
                    <LoadingSpinner message="Loading receiving purchases orders details, please wait..." />
                ) : (
                    <>
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                {/* Header Section */}
                                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-bold text-gray-800">Receipt #{payment.receivingNumber}</h2>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.paymentStatus)}`}>
                                            {payment.paymentStatus}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {new Date(payment.receivingDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>

                                {/* Payment Details Grid */}
                                <div className="px-6 py-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Payment Method Section */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Payment Method</label>
                                                <p className="mt-1 text-base font-medium text-gray-900">{payment.paymentMethod}</p>
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Amount Paid</label>
                                                <p className="mt-1 text-base font-medium text-gray-900">
                                                    Rs.{Number(payment.amountPaid).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Remaining Balance</label>
                                                <p className="mt-1 text-base font-medium text-gray-900">
                                                    Rs.{Number(payment.remainingBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Additional Details Section */}
                                        <div className="space-y-4">
                                            {payment.bankName && (
                                                <div>
                                                    <label className="text-sm font-medium text-gray-500">Bank Name</label>
                                                    <p className="mt-1 text-base font-medium text-gray-900">{payment.bankName}</p>
                                                </div>
                                            )}

                                            {payment.chequeNumber && (
                                                <div>
                                                    <label className="text-sm font-medium text-gray-500">Cheque Number</label>
                                                    <p className="mt-1 text-base font-medium text-gray-900">{payment.chequeNumber}</p>
                                                </div>
                                            )}

                                            {payment.transactionReference && (
                                                <div>
                                                    <label className="text-sm font-medium text-gray-500">Transaction Reference</label>
                                                    <p className="mt-1 text-base font-medium text-gray-900">{payment.transactionReference}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Notes Section */}
                                    {payment.notes && (
                                        <div className="mt-8 pt-6 border-t border-gray-200">
                                            <label className="text-sm font-medium text-gray-500">Notes</label>
                                            <p className="mt-2 text-base text-gray-900 whitespace-pre-wrap">{payment.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {/*  */}
        </div>
    );
};

export default ViewPurchaseReceivePayment;