"use client"

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

const CreatePurchaseOrderForm = ({ items, initialData = {}, isUpdate = false }) => {

    const [loading, setLoading] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [taxes, setTaxes] = useState([]);


    const { register, handleSubmit, control, reset, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            ...initialData,
            items: initialData.items || [{ itemId: "", title: "", quantity: 1, price: 0, amount: 0, taxRate: 0, taxAmount: 0 }],
            discount: 0,
            discountAmount: 0,
            orderDate: initialData.orderDate || new Date().toISOString().split('T')[0],
            expectedDeliveryDate: initialData.expectedDeliveryDate || new Date().toISOString().split('T')[0],
            purchaseOrderNumber: initialData.purchaseOrderNumber || `ORD-${Date.now()}`,
            referenceNumber: initialData.referenceNumber || `REF-${Date.now()}`

        }
    });



    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    const router = useRouter();
    function redirect() {
        router.push("/dashboard/purhases/orders");
    }

    async function onSubmit(data) {
        if (isUpdate) {
            makePutRequest(setLoading, `/api/purchases/orders/${initialData.id}`, data, "Order", reset, redirect);
        } else {
            makePostRequest(setLoading, "/api/purchases/orders", data, "Order", reset);
        }
    }

    // Add useEffect to fetch suppliers
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await fetch('/api/inventory/suppliers');
                const data = await response.json();
                setSuppliers(data);
                console.log("SUPPLIERS DATA", data)
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };
        fetchSuppliers();
    }, []);




    // Add useEffect to fetch taxes
    useEffect(() => {
        const fetchTaxes = async () => {
            try {
                const response = await fetch('/api/banking/taxes');
                const data = await response.json();
                setTaxes(data);
                console.log("TAXES DATA", data);
            } catch (error) {
                console.error('Error fetching taxes:', error);
            }
        };
        fetchTaxes();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-8">
                    {/* Supplier Information */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Supplier Information</h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Enter the supplier's billing details to generate the purchase invoice. The <strong>Invoice Date</strong> is used for accounting and reports. Set the <strong>Due Date</strong> based on your agreed payment terms with the supplier.
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                            <SelectInput
                                label="Select Supplier"
                                name="supplierId"
                                register={register}
                                errors={errors}
                                className="w-full"
                                options={[
                                    { id: "", title: "Select the Supplier" },
                                    ...suppliers
                                ]}
                            />
                            <TextInput
                                label="Purchase Order Number"
                                name="purchaseOrderNumber"
                                register={register}
                                errors={errors}
                                className="w-full"
                            />





                        </div>
                    </div>



                    {/* Order Details */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextInput
                                label="Order Date"
                                name="orderDate"
                                type="date"
                                register={register}
                                errors={errors}
                                className="w-full"
                            />
                            <TextInput
                                label="Expected Delivery Date"
                                name="expectedDeliveryDate"
                                type="date"
                                register={register}
                                errors={errors}
                                className="w-full"
                            />
                            <TextInput
                                label="Reference Number"
                                name="referenceNumber"
                                register={register}
                                errors={errors}
                                className="w-full"
                            />
                        </div>
                    </div>




                    {/* Order Items */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Order Items</h3>
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
                                                    // console.log("SELECTED ITEM", selectedItem)
                                                    // setValue(`items.${index}.itemId`, selectedItem.id);
                                                    // setValue(`items.${index}.title`, selectedItem.title);
                                                    // setValue(`items.${index}.price`, selectedItem.salePrice);
                                                    // Calculate amount based on quantity and price
                                                    // const quantity = watch(`items.${index}.quantity`) || 1;
                                                    // setValue(`items.${index}.amount`, parseFloat(quantity * selectedItem.salePrice));
                                                    const quantity = watch(`items.${index}.quantity`) || 1;
                                                    const price = selectedItem.salePrice;
                                                    const amount = quantity * price;

                                                    // Assume selectedItem.taxRate exists. If it's fetched from API, ensure it's part of `items`.
                                                    const taxRate = selectedItem.tax?.rate || 0;
                                                    const taxAmount = (taxRate / 100) * amount;

                                                    setValue(`items.${index}.itemId`, selectedItem.id);
                                                    setValue(`items.${index}.title`, selectedItem.title);
                                                    setValue(`items.${index}.price`, price);
                                                    setValue(`items.${index}.amount`, amount);
                                                    setValue(`items.${index}.taxRate`, taxRate);
                                                    setValue(`items.${index}.taxAmount`, taxAmount);
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
                                    <div className="w-full sm:w-1/5">
                                        <SelectInput
                                            label="Tax Rate"
                                            name={`items.${index}.taxRate`}
                                            register={register}
                                            errors={errors}
                                            className="w-full"
                                            onChange={(e) => {
                                                const taxRate = Number(e.target.value) || 0;
                                                setValue(`items.${index}.taxRate`, taxRate);
                                                const amount = watch(`items.${index}.amount`) || 0;
                                                const taxAmount = (taxRate / 100) * amount;
                                                setValue(`items.${index}.taxAmount`, taxAmount);
                                            }}
                                            options={[
                                                { id: "", title: "Select a tax rate" },
                                                ...taxes.map(tax => ({
                                                    id: tax.rate,
                                                    // title: item.title,
                                                    title: `${tax.title} (TAX: ${tax.rate}%)`
                                                }))
                                            ]}
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
                                onClick={() => append({ itemId: "", title: "", quantity: 1, price: 0, amount: 0, taxRate: 0, taxAmount: 0 })}
                                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                            >
                                + Add Item
                            </button>
                        </div>
                    </div>



                    {/* Calculations Section */}
                    <div className="flex flex-col gap-4 items-end">
                        <div className="w-full max-w-xs">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-700">Subtotal</span>
                                <span className="font-medium">
                                    Rs{watch('items')?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0).toFixed(2)}
                                </span>
                            </div>

                            {/* Add Tax Total row */}
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-700">Tax Total</span>
                                <span className="font-medium">
                                    Rs{watch('items')?.reduce((sum, item) => sum + (Number(item.taxAmount) || 0), 0).toFixed(2)}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex-1">
                                    <FormTextInput
                                        label="Discount"
                                        name="discount"
                                        type="number"
                                        register={register}
                                        errors={errors}
                                        className="w-full"
                                        onChange={(e) => {
                                            const discountValue = Number(e.target.value) || 0;
                                            setValue('discount', discountValue);
                                            const subtotal = watch('items')?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
                                            const discountAmount = (discountValue / 100) * subtotal;
                                            setValue('discountAmount', discountAmount);
                                        }}
                                    />
                                </div>
                                <div className="flex items-center gap-1 mt-8">
                                    <span>%</span>
                                    <span className="text-gray-700">Rs</span>
                                    <span>{watch('discountAmount')?.toFixed(2) || '0.00'}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                                <span className="text-gray-700">Total</span>
                                {/* <span className="font-medium">
                                    Rs{(
                                        watch('items')?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) -
                                        (watch('discountAmount') || 0)
                                    ).toFixed(2)}
                                </span> */}
                                <span className="font-medium">
                                    Rs{(
                                        watch('items')?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) +
                                        watch('items')?.reduce((sum, item) => sum + (Number(item.taxAmount) || 0), 0) -
                                        (watch('discountAmount') || 0)
                                    ).toFixed(2)}
                                </span>
                            </div>


                            {/* <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-700">Total</span>
                                    <SelectInput
                                        name="currency"
                                        register={register}
                                        className="w-40"
                                        options={[
                                            { id: "PKR", title: "Pakistan Rupee" },
                                            { id: "USD", title: "US Dollar" },
                                            { id: "EUR", title: "Euro" },
                                            { id: "GBP", title: "British Pound" }
                                        ]}
                                    />
                                </div>
                                <span className="font-medium">
                                    Rs{(
                                        watch('items')?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) -
                                        (watch('discountAmount') || 0)
                                    ).toFixed(2)}
                                </span>
                            </div> */}



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
                    <SubmitButton title={isUpdate ? "Update Purchase Invoice Order" : "Create Purchase Invoice Order"} isLoading={loading} />
                </div>
            </form>
        </div>
    );
};

export default CreatePurchaseOrderForm;
