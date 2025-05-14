"use client";
import { useState } from "react";
import FormHeader from "@/components/dashboard/FormHeader";

const NewIssuance = () => {
    const [formData, setFormData] = useState({
        issuanceNo: "",
        mrfReference: "", // Reference to original MRF
        issuanceDate: new Date().toISOString().split('T')[0],
        issuedBy: "",
        receivedBy: "",
        signature: null, // Digital signature
        items: [
            {
                itemCode: "",
                description: "",
                requestedQty: 0,
                issuedQty: 0, // For partial issuance
                currentStock: 0,
                batchNo: "", // Batch/lot tracking
                expiryDate: "",
                remarks: ""
            }
        ],
        returns: [ // Return handling
            {
                itemCode: "",
                returnQty: 0,
                returnDate: "",
                reason: "",
                condition: ""
            }
        ]
    });

    return (
        <div>
            <FormHeader title="New Material Issuance" href="/dashboard/inventory/issuance" />
            <div className="p-8">
                <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Issuance Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">MRF Reference</label>
                                <input
                                    type="text"
                                    name="mrfReference"
                                    value={formData.mrfReference}
                                    onChange={(e) => setFormData({ ...formData, mrfReference: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Issuance Date</label>
                                <input
                                    type="date"
                                    name="issuanceDate"
                                    value={formData.issuanceDate}
                                    onChange={(e) => setFormData({ ...formData, issuanceDate: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Items Section */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Items</h2>
                        {formData.items.map((item, index) => (
                            <div key={index} className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Item Code</label>
                                    <input
                                        type="text"
                                        value={item.itemCode}
                                        onChange={(e) => {
                                            const newItems = [...formData.items];
                                            newItems[index].itemCode = e.target.value;
                                            setFormData({ ...formData, items: newItems });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Batch No</label>
                                    <input
                                        type="text"
                                        value={item.batchNo}
                                        onChange={(e) => {
                                            const newItems = [...formData.items];
                                            newItems[index].batchNo = e.target.value;
                                            setFormData({ ...formData, items: newItems });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Issued Quantity</label>
                                    <input
                                        type="number"
                                        value={item.issuedQty}
                                        onChange={(e) => {
                                            const newItems = [...formData.items];
                                            newItems[index].issuedQty = parseFloat(e.target.value);
                                            setFormData({ ...formData, items: newItems });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Digital Signature */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Signatures</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Issued By</label>
                                <input
                                    type="text"
                                    value={formData.issuedBy}
                                    onChange={(e) => setFormData({ ...formData, issuedBy: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Received By</label>
                                <input
                                    type="text"
                                    value={formData.receivedBy}
                                    onChange={(e) => setFormData({ ...formData, receivedBy: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Save Issuance
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewIssuance;