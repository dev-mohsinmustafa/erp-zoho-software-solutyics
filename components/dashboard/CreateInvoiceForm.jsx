"use client"

import FormHeader from "@/components/dashboard/FormHeader";
import FormTextInput from "@/components/formInputs/FormTextInput";
import SelectInput from "@/components/formInputs/SelectInput";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextareaInput";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const CreateInvoiceForm = ({ items, initialData = {}, isUpdate = false }) => {
    console.log("INITIAL DATA ITEMS", items)
    const { data: session, status } = useSession();
    const name = session?.user?.name.toUpperCase();
    const companyName = session?.user?.companyName;
    const email = session?.user?.email;


    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    // const [inventoryItems, setInventoryItems] = useState([]);

    const { register, handleSubmit, control, reset, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            ...initialData,
            title: "Invoice",
            name: session?.user?.name?.toUpperCase() || '',
            email: session?.user?.email || '',
            address: session?.user?.companyName || '',
            items: initialData.items || [{ itemId: "", title: "", quantity: 1, price: 0, amount: 0 }]
        }
    });
    // console.log("WATCH DATA", watch()); // Log all form values

    // Add this useEffect to update form values when session loads
    useEffect(() => {
        if (session?.user) {
            setValue('name', session.user.name.toUpperCase());
            setValue('email', session.user.email);
            setValue('address', session.user.companyName);
        }
    }, [session, setValue]);

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
                console.log("CUSTOMERS DATA", data)
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, []);

    // useEffect(() => {
    //     const fetchInventoryItems = async () => {
    //         try {
    //             const response = await fetch('/api/inventory/items');
    //             const data = await response.json();
    //             setInventoryItems(data);
    //             console.log("Inventory data", data)
    //         } catch (error) {
    //             console.error('Error fetching inventory items:', error);
    //         }
    //     };
    //     fetchInventoryItems();
    // }, []);


    // Add this effect to watch and update amounts
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name?.includes('quantity') || name?.includes('price')) {
                const index = parseInt(name.split('.')[1]);
                const item = value.items[index];
                if (item.quantity && item.price) {
                    setValue(`items.${index}.amount`, item.quantity * item.price);
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue]);

    // Watch for changes in purchaseRequestId
    const selectedItemId = watch("itemId");

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-8">
                    {/* General Information */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">General Information</h3>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Company</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Change the address, logo, and other information for your company.
                        </p>



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
                                name="address"
                                register={register}
                                errors={errors}
                                className="w-full"
                                defaultValue={companyName || ''}
                            />
                            <TextInput
                                label="Email"
                                name="email"
                                register={register}
                                errors={errors}
                                className="w-full"
                                defaultValue={email || ''}
                            />
                            <TextInput
                                label="User Name"
                                name="name"
                                register={register}
                                errors={errors}
                                className="w-full"
                                defaultValue={name || ''}
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
                                        <SelectInput
                                            label="Item"
                                            name={`items.${index}.itemId`}
                                            register={register}
                                            errors={errors}
                                            className="w-full"
                                            onChange={(e) => {

                                                console.log("Selected Value:", e.target.value); // Add this to debug

                                                const selectedItem = items.find(item => item.id === e.target.value);
                                                console.log("All Inventory Items:", items); // Add this line
                                                if (selectedItem) {
                                                    console.log("SELECTED ITEM", selectedItem)
                                                    // Update all fields for this item
                                                    setValue(`items.${index}.itemId`, selectedItem.id);
                                                    setValue(`items.${index}.title`, selectedItem.title);
                                                    setValue(`items.${index}.price`, parseFloat(selectedItem.salePrice));
                                                    setValue(`items.${index}.quantity`, 1);
                                                    // Fix: Calculate amount using the quantity we're setting (1)
                                                    setValue(`items.${index}.amount`, parseFloat(selectedItem.salePrice * 1));
                                                    // setValue(`items.${index}.amount`, selectedItem.salePrice * selectedItem.quantity);
                                                }
                                            }}
                                            options={[
                                                { id: "", title: "Select an item" },
                                                ...items.map(item => ({
                                                    id: item.id,
                                                    // title: item.title,
                                                    title: `${item.title} (Price: ${item.salePrice})`
                                                }))
                                            ]}
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
                                            // defaultValue={1}

                                            // value={watch(`items.${index}.quantity`)}
                                            onChange={(e) => {
                                                const quantity = Number(e.target.value) || 0;
                                                setValue(`items.${index}.quantity`, quantity);
                                                const price = watch(`items.${index}.price`) || 0;
                                                setValue(`items.${index}.amount`, quantity * price);
                                            }}
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
                                            // value={watch(`items.${index}.price`)}
                                            onChange={(e) => {
                                                const price = Number(e.target.value) || 0;
                                                setValue(`items.${index}.price`, price);
                                                const quantity = watch(`items.${index}.quantity`) || 0;
                                                setValue(`items.${index}.amount`, quantity * price);
                                            }}

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
                                            // value={watch(`items.${index}.amount`)}
                                            readOnly
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
                                onClick={() => append({ itemId: "", title: "", quantity: 1, price: 0, amount: 0 })}
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
    );
};

export default CreateInvoiceForm;
