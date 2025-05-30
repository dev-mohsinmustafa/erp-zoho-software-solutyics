"use client"

import React from 'react';
import { useSession } from 'next-auth/react';

const POSSettings = () => {
    const { data: session } = useSession();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">POS Settings</h1>
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Store Name</label>
                                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Receipt Header</label>
                                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" rows="3"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Receipt Footer</label>
                                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" rows="3"></textarea>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm" />
                                <label className="ml-2 text-sm text-gray-700">Accept Cash</label>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm" />
                                <label className="ml-2 text-sm text-gray-700">Accept Credit Cards</label>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm" />
                                <label className="ml-2 text-sm text-gray-700">Accept Digital Payments</label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default POSSettings;