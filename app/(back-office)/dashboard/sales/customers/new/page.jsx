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
        defaultValues: initialData,
    });

    const customerTypes = [
        { id: "INDIVIDUAL", name: "Individual" },
        { id: "COMPANY", name: "Company" }
    ];

    const customerStatus = [
        { id: "ACTIVE", name: "Active" },
        { id: "INACTIVE", name: "Inactive" }
    ];

    const router = useRouter();
    function redirect() {
        router.push("/dashboard/sales/customers");
    }

    async function onSubmit(data) {
        if (isUpdate) {
            makePutRequest(setLoading, `/api/customers/${initialData.id}`, data, "Customer", reset, redirect);
        } else {
            makePostRequest(setLoading, "/api/customers", data, "Customer", reset);
        }
    }

    return (
        <div>
            <FormHeader title={isUpdate ? "Update Customer" : "New Customer"} href={"/dashboard/sales/customers"} />

            <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <TextInput
                            label="Customer Code"
                            name="customerCode"
                            register={register}
                            errors={errors}
                            className="w-full"
                        />
                        <TextInput
                            label="Customer Name"
                            name="name"
                            register={register}
                            errors={errors}
                            className="w-full"
                        />
                        <SelectInput
                            label="Customer Type"
                            name="type"
                            register={register}
                            errors={errors}
                            className="w-full"
                            options={customerTypes.map(type => ({
                                id: type.id,
                                title: type.name
                            }))}
                        />

                        <SelectInput
                            label="Status"
                            name="status"
                            register={register}
                            errors={errors}
                            className="w-full"
                            options={customerStatus.map(status => ({
                                id: status.id,
                                title: status.name
                            }))}
                        />

                        <TextInput
                            label="Phone"
                            name="phone"
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
                            label="Address"
                            name="address"
                            register={register}
                            errors={errors}
                            className="w-full"
                        />
                        <TextInput
                            label="Tax ID/VAT Number"
                            name="taxID"
                            register={register}
                            errors={errors}
                            className="w-full"
                        />
                        <TextareaInput
                            label="Payment Terms"
                            name="paymentTerms"
                            register={register}
                            errors={errors}
                        />
                        <TextareaInput
                            label="Notes"
                            name="notes"
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <SubmitButton title={isUpdate ? "Update Customer" : "New Customer"} isLoading={loading} />
                </form>
            </div>
        </div>
    )
}

export default NewCustomer;