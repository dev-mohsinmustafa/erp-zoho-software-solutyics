"use client"

import FormHeader from "@/components/dashboard/FormHeader";
import FormTextInput from "@/components/formInputs/FormTextInput";
import SelectInput from "@/components/formInputs/SelectInput";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextareaInput";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const NewInvoice = ({ initialData = {}, isUpdate = false }) => {
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);


    const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            ...initialData,
            title: "Invoice",
            items: initialData.items || [{ description: '', quantity: 1, price: 0, amount: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    const router = useRouter();
    function redirect() {
        router.push("/dashboard/sales/invoices");
    }

    async function onSubmit(data) {
        if (isUpdate) {
            makePutRequest(setLoading, `/api/sales/invoices/${initialData.id}`, data, "Invoice", reset, redirect);
        } else {
            makePostRequest(setLoading, "/api/sales/invoices", data, "Invoice", reset);
        }
    }

    // Add useEffect to fetch customers
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('/api/sales/customers');
                const data = await response.json();
                setCustomers(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, []);
    // Handle customer selection
    const handleCustomerChange = (e) => {
        const customerId = e.target.value;
        if (!customerId) {
            setSelectedCustomer(null);
            setValue('companyAddress', '');
            setValue('email', '');
            setValue('taxNumber', '');
            return;
        }
        
        const customer = customers.find(c => c.id === customerId);
        if (customer) {
            console.log('Selected customer:', customer); // Add this to debug
            setSelectedCustomer(customer);
            
            // Force update the form values
            setValue('companyAddress', customer.address || '');
            setValue('email', customer.email || '');
            setValue('taxNumber', customer.taxNumber || '');
            
            // Trigger form validation
            trigger(['companyAddress', 'email', 'taxNumber']);
        }
    };
    return (
        <div>
            <FormHeader title={isUpdate ? "Update Invoice" : "New Invoice"} href="/dashboard/sales/invoices" />

            <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-8">
                        {/* General Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">General Information</h3>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Company</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Change the address, logo, and other information for your company.
                            </p>

                            {/* Display customer details when selected */}
                            {selectedCustomer && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Customer Email</h4>
                                        <p className="mt-1 text-sm text-gray-900">{selectedCustomer.email || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Tax Number</h4>
                                        <p className="mt-1 text-sm text-gray-900">{selectedCustomer.taxNumber || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Address</h4>
                                        <p className="mt-1 text-sm text-gray-900">{selectedCustomer.address || 'N/A'}</p>
                                    </div>
                                </div>
                            )}

                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <TextInput
                                    label="Title"
                                    name="title"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                    defaultValue="Invoice"
                                />
                                <TextInput
                                    label="Company Address"
                                    name="companyAddress"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />
                                <TextInput
                                    label="Email"
                                    name="email"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />
                                <TextInput
                                    label="Tax Number"
                                    name="taxNumber"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />





                            </div>
                        </div>

                        {/* Billing Section */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Billing</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Billing details appear in your invoice. Invoice Date is used in the dashboard and reports. Select the date you expect to get paid as the Due Date.
                            </p>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">


                                {/* Add Customer Select */}
                                <SelectInput
                                    label="Select Customer"
                                    name="customerId"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                    onChange={handleCustomerChange}
                                    options={[
                                        { id: "", title: "Select a customer" },
                                        ...customers.map(customer => ({
                                            id: customer.id,
                                            title: customer.name
                                        }))
                                    ]}
                                />

                                <TextInput
                                    label="Invoice Date"
                                    name="invoiceDate"
                                    type="date"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />

                                <TextInput
                                    label="Invoice Number"
                                    name="invoiceNumber"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />
                                <TextInput
                                    label="Due Date"
                                    name="dueDate"
                                    type="date"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />
                                <TextInput
                                    label="Order Number"
                                    name="orderNumber"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Invoice Items */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Invoice Items</h3>
                            <div className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                                        <div className="w-full sm:w-1/5">
                                            <FormTextInput
                                                label="Description"
                                                name={`items.${index}.description`}
                                                register={register}
                                                errors={errors}
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="w-full sm:w-1/5">
                                            <FormTextInput
                                                label="Quantity"
                                                name={`items.${index}.quantity`}
                                                type="number"
                                                register={register}
                                                errors={errors}
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="w-full sm:w-1/5">
                                            <FormTextInput
                                                label="Price"
                                                name={`items.${index}.price`}
                                                type="number"
                                                register={register}
                                                errors={errors}
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="w-full sm:w-1/5">
                                            <FormTextInput
                                                label="Amount"
                                                name={`items.${index}.amount`}
                                                type="number"
                                                register={register}
                                                errors={errors}
                                                className="w-full"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-red-600 hover:text-red-800 p-2 flex-shrink-0 self-end"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => append({ description: '', quantity: 1, price: 0, amount: "" })}
                                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                                >
                                    + Add Item
                                </button>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Additional Information</h3>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div className="sm:col-span-2">
                                    <TextareaInput
                                        label="Notes"
                                        name="notes"
                                        register={register}
                                        errors={errors}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <SubmitButton title={isUpdate ? "Update Invoice" : "Create Invoice"} isLoading={loading} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewInvoice;