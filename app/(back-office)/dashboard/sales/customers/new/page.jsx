"use client"

import FormHeader from "@/components/dashboard/FormHeader";
import SelectInput from "@/components/formInputs/SelectInput";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextareaInput";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const NewCustomer = ({ initialData = {}, isUpdate = false }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            ...initialData,
        }
    });

    const currencies = [
        { id: "USD", title: "US Dollar" },
        { id: "EUR", title: "Euro" },
        { id: "GBP", title: "British Pound" },
        { id: "PKR", title: "Pakistani Rupee" },
        { id: "AED", title: "United Arab Emirates Dirham" },
        { id: "SAR", title: "Saudi Arabian Riyal" },
        { id: "QAR", title: "Qatari Riyal" },
        { id: "OMR", title: "Omani Riyal" },
        // Add more currencies as needed
    ];


    const router = useRouter();
    function redirect() {
        router.push("/dashboard/sales/customers");
    }

    async function onSubmit(data) {
        if (isUpdate) {
            makePutRequest(setLoading, `/api/sales/customers/${initialData.id}`, data, "Customer", reset, redirect);
        } else {
            makePostRequest(setLoading, "/api/sales/customers", data, "Customer", reset);
        }
    }

    return (
        <div>
            <FormHeader title={isUpdate ? "Update Customer" : "New Customer"} href={"/dashboard/sales/customers"} />

            <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-8">
                        {/* General Section */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">General</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Your client's contact information will appear in invoices and their profiles. You can also allow your clients to login to track the invoices you send them.
                            </p>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <TextInput
                                    label="Customer Code"
                                    name="customerCode"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                    type="number"
                                />
                                <TextInput
                                    label="Customer Name"
                                    name="name"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />
                                <TextInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />
                                <TextInput
                                    label="Phone"
                                    name="phone"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />
                                <TextInput
                                    label="Website"
                                    name="website"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />
                                <TextInput
                                    label="Reference"
                                    name="reference"
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
                                The tax number appears in every invoice issued to the customer. The selected currency becomes the default currency for this customer.
                            </p>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <TextInput
                                    label="Tax Number"
                                    name="taxNumber"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />
                                {/* Select */}
                                <SelectInput label="Select the Currency Type" name="currency" register={register} errors={errors}
                                    className="w-full" options={currencies} />


                            </div>
                        </div>

                        {/* Address Section */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Address</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                The address is required for the invoices, so you need to add billing address details for your customer.
                            </p>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div className="sm:col-span-2">
                                    <TextInput
                                        label="Address"
                                        name="address"
                                        register={register}
                                        errors={errors}
                                        className="w-full"
                                    />
                                </div>
                                <TextInput
                                    label="Town/City"
                                    name="town"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />
                                <TextInput
                                    label="Postal / Zip Code"
                                    name="postalCode"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />
                                <TextInput
                                    label="Province / State"
                                    name="province"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />
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
                        <SubmitButton title={isUpdate ? "Update Customer" : "New Customer"} isLoading={loading} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewCustomer;