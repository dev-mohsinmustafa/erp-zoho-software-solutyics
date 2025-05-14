"use client";
import { useState } from "react";
import FormHeader from "@/components/dashboard/FormHeader";

const NewBOM = () => {
    const [formData, setFormData] = useState({
        productName: "",
        version: "1.0",
        components: [
            {
                itemCode: "",
                description: "",
                quantity: 0,
                unit: "",
                remarks: ""
            }
        ],
        processSteps: [
            {
                stepNo: 1,
                description: "",
                machineRequired: "",
                timeRequired: 0,
                qualityParameters: ""
            }
        ]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleComponentChange = (index, field, value) => {
        setFormData(prev => {
            const newComponents = [...prev.components];
            newComponents[index] = {
                ...newComponents[index],
                [field]: value
            };
            return {
                ...prev,
                components: newComponents
            };
        });
    };

    const addComponent = () => {
        setFormData(prev => ({
            ...prev,
            components: [...prev.components, {
                itemCode: "",
                description: "",
                quantity: 0,
                unit: "",
                remarks: ""
            }]
        }));
    };

    const handleProcessStepChange = (index, field, value) => {
        setFormData(prev => {
            const newSteps = [...prev.processSteps];
            newSteps[index] = {
                ...newSteps[index],
                [field]: value
            };
            return {
                ...prev,
                processSteps: newSteps
            };
        });
    };

    const addProcessStep = () => {
        setFormData(prev => ({
            ...prev,
            processSteps: [...prev.processSteps, {
                stepNo: prev.processSteps.length + 1,
                description: "",
                machineRequired: "",
                timeRequired: 0,
                qualityParameters: ""
            }]
        }));
    };

    return (
        <div>
            <FormHeader title="Create New BOM" href="/dashboard/inventory/bom" />
            <div className="p-8">
                <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Version</label>
                                <input
                                    type="text"
                                    name="version"
                                    value={formData.version}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Components Section */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Components</h2>
                            <button
                                type="button"
                                onClick={addComponent}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Add Component
                            </button>
                        </div>
                        {formData.components.map((component, index) => (
                            <div key={index} className="grid grid-cols-5 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Item Code</label>
                                    <input
                                        type="text"
                                        value={component.itemCode}
                                        onChange={(e) => handleComponentChange(index, 'itemCode', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <input
                                        type="text"
                                        value={component.description}
                                        onChange={(e) => handleComponentChange(index, 'description', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                    <input
                                        type="number"
                                        value={component.quantity}
                                        onChange={(e) => handleComponentChange(index, 'quantity', parseFloat(e.target.value))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Unit</label>
                                    <input
                                        type="text"
                                        value={component.unit}
                                        onChange={(e) => handleComponentChange(index, 'unit', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Remarks</label>
                                    <input
                                        type="text"
                                        value={component.remarks}
                                        onChange={(e) => handleComponentChange(index, 'remarks', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Process Steps Section */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Process Steps</h2>
                            <button
                                type="button"
                                onClick={addProcessStep}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Add Process Step
                            </button>
                        </div>
                        {formData.processSteps.map((step, index) => (
                            <div key={index} className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <input
                                        type="text"
                                        value={step.description}
                                        onChange={(e) => handleProcessStepChange(index, 'description', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Machine Required</label>
                                    <input
                                        type="text"
                                        value={step.machineRequired}
                                        onChange={(e) => handleProcessStepChange(index, 'machineRequired', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Time Required (mins)</label>
                                    <input
                                        type="number"
                                        value={step.timeRequired}
                                        onChange={(e) => handleProcessStepChange(index, 'timeRequired', parseFloat(e.target.value))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Quality Parameters</label>
                                    <input
                                        type="text"
                                        value={step.qualityParameters}
                                        onChange={(e) => handleProcessStepChange(index, 'qualityParameters', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Save BOM
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewBOM;