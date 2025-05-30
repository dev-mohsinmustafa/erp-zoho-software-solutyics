"use client"

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const POSTerminal = () => {
    const { data: session } = useSession();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">POS Terminal</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Products Section */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Products</h2>
                    {/* Add your product grid here */}
                </div>

                {/* Cart Section */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Cart</h2>
                    <div className="mb-4">
                        {/* Cart items will go here */}
                    </div>
                    <div className="border-t pt-4">
                        <div className="flex justify-between mb-2">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                            Complete Sale
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default POSTerminal;