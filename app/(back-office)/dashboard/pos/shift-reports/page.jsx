"use client"

import React from 'react';
import { useSession } from 'next-auth/react';

const ShiftReports = () => {
    const { data: session } = useSession();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Shift Reports</h1>
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Select Date</label>
                    <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cashier</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* Add your shift data here */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShiftReports;