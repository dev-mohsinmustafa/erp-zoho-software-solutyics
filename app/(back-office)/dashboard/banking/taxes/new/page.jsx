"use client"

import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextInput from "@/components/formInputs/TextInput";
import SelectInput from "@/components/formInputs/SelectInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const NewTax = ({ initialData = {}, isUpdate = false }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialData,
    });

    // For redirecting to page
    const router = useRouter();
    function redirect() {
        router.push("/dashboard/banking/taxes");
    }

    async function onSubmit(data) {
        console.log("Formdata", data);
        const formattedData = {
            ...data,
            rate: data.type === "percentage" ? `${data.rate}%` : data.rate
        };

        if (isUpdate) {
            makePutRequest(setLoading, `/api/banking/taxes/${initialData.id}`, formattedData, "Tax", reset, redirect);
        } else {
            makePostRequest(setLoading, "/api/banking/taxes", formattedData, "Tax", reset);
        }
    }

    const taxTypes = [
        { id: "percentage", title: "Percentage" },
        { id: "fixed", title: "Fixed" }
    ];

    return (
        <div>
            {/* Header */}
            <FormHeader title={isUpdate ? "Update Tax" : "New Tax"} href={"/dashboard/banking/taxes"} />

            {/* Form */}
            <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        {/* Name */}
                        <TextInput
                            label="Tax Name"
                            name="title"
                            register={register}
                            errors={errors}
                            className="w-full"
                        />

                        {/* Rate */}
                        <TextInput
                            label="Tax Rate %"
                            name="rate"
                            register={register}
                            errors={errors}
                            type="number"
                            step="0.01"
                            className="w-full"
                        />

                        {/* Type */}
                        <SelectInput
                            label="Tax Type"
                            name="type"
                            register={register}
                            errors={errors}
                            options={taxTypes}
                            className="w-full"
                        />

                        {/* Description */}
                        <TextInput
                            label="Description"
                            name="description"
                            register={register}
                            errors={errors}
                            className="w-full"
                        />

                        {/* Is Default */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                {...register("isDefault")}
                                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Set as Default Tax
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <SubmitButton title={isUpdate ? "Update Tax" : "New Tax"} isLoading={loading} />
                </form>
            </div>
        </div>
    )
}

export default NewTax;