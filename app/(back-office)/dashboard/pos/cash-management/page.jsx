"use client"

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const CashManagement = () => {
    const { data: session } = useSession();
    const [cashDrawerAmount, setCashDrawerAmount] = useState(0);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Cash Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Cash Drawer</h2>
                    <div className="mb-4">
                        <div className="flex justify-between mb-2">
                            <span>Current Balance:</span>
                            <span>${cashDrawerAmount.toFixed(2)}</span>
                        </div>
                        <div className="space-x-2">
                            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                                Add Cash
                            </button>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                                Remove Cash
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
                    <div className="overflow-y-auto max-h-64">
                        {/* Add your transaction history here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CashManagement;