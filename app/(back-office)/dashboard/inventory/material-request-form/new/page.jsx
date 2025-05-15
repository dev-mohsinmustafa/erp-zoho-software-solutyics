"use client"

import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextareaInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSession } from "next-auth/react";
import FormTextInput from "@/components/formInputs/FormTextInput";
import { Trash2 } from "lucide-react";

const NewMaterialRequest = memo(() => {
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            department: "",
            remarks: "",
            status: "Pending",
            requestDate: new Date().toISOString().split('T')[0],
            requestedBy: session?.user?.name || '',
            items: [{ itemId: "", name: "", quantity: "", unit: "" }]
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    function redirect() {
        router.push("/dashboard/inventory/material-request-form");
    }

    async function onSubmit(data) {
        const formattedData = {
            ...data,
            requestDate: new Date(),
            requestedBy: session?.user?.name,
            status: "Pending"
        };
        if (isUpdate) {
            makePutRequest(setLoading, `/api/material-request-form/${initialData.id}`, formattedData, "Material Request", reset, redirect);
        } else {
            makePostRequest(setLoading, "/api/material-request-form", formattedData, "Material Request", reset,);
        }
    }

    return (
        <div>
            <FormHeader
                title="New Material Request Form"
                href="/dashboard/inventory/material-request-form"
            />

            <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 mx-auto my-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:gap-6">
                        {/* Request Information Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                                    Status
                                </label>
                                <div className="inline-flex items-center px-2.5 py-1.5 rounded-md text-sm font-medium bg-yellow-50 text-yellow-800 border border-yellow-200">
                                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>
                                    Pending
                                </div>
                                <input
                                    type="hidden"
                                    {...register("status")}
                                    value="Pending"
                                />
                            </div>

                            {/* Status color reference (hidden in production) */}
                            <div className="hidden">
                                {/* Approved Status */}
                                <div className="inline-flex items-center px-2.5 py-1.5 rounded-md text-sm font-medium bg-green-50 text-green-800 border border-green-200">
                                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                                    Approved
                                </div>

                                {/* Rejected Status */}
                                <div className="inline-flex items-center px-2.5 py-1.5 rounded-md text-sm font-medium bg-red-50 text-red-800 border border-red-200">
                                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-red-400 mr-2"></span>
                                    Rejected
                                </div>

                                {/* Processing Status */}
                                <div className="inline-flex items-center px-2.5 py-1.5 rounded-md text-sm font-medium bg-blue-50 text-blue-800 border border-blue-200">
                                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                                    Processing
                                </div>

                                {/* Completed Status */}
                                <div className="inline-flex items-center px-2.5 py-1.5 rounded-md text-sm font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                                    Completed
                                </div>
                            </div>


                        </div>

                        <FormTextInput
                            label="Request Date"
                            name="requestDate"
                            type="date"
                            register={register}
                            errors={errors}
                            disabled
                            className="w-full"
                        />
                        <FormTextInput
                            label="Requester"
                            name="requestedBy"
                            register={register}
                            errors={errors}
                            disabled
                            className="w-full"
                        />
                        <FormTextInput
                            label="Department"
                            name="department"
                            register={register}
                            errors={errors}
                            placeholder="e.g. Production"
                            className="w-full"
                        />

                        {/* Requested Items Section */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                                Requested Items
                            </label>
                            <div className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex flex-col sm:flex-row gap-3 items-center">
                                        <div className="w-full sm:w-1/5">
                                            <FormTextInput
                                                placeholder="Item ID"
                                                name={`items.${index}.itemId`}
                                                register={register}
                                                errors={errors}
                                                noLabel
                                            />
                                        </div>
                                        <div className="w-full sm:w-1/5">
                                            <FormTextInput
                                                placeholder="Item Name"
                                                name={`items.${index}.name`}
                                                register={register}
                                                errors={errors}
                                                noLabel
                                            />
                                        </div>
                                        <div className="w-full sm:w-1/5">
                                            <FormTextInput
                                                type="number"
                                                placeholder="Quantity"
                                                name={`items.${index}.quantity`}
                                                register={register}
                                                errors={errors}
                                                noLabel
                                            />
                                        </div>
                                        <div className="w-full sm:w-1/5">
                                            <FormTextInput
                                                placeholder="Unit"
                                                name={`items.${index}.unit`}
                                                register={register}
                                                errors={errors}
                                                noLabel
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-red-600 hover:text-red-800 p-2 flex-shrink-0"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => append({ itemId: "", name: "", quantity: "", unit: "" })}
                                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                                >
                                    + Add Item
                                </button>
                            </div>
                        </div>

                        <TextareaInput
                            label="Remarks"
                            name="remarks"
                            register={register}
                            errors={errors}
                            placeholder="Optional remarks"
                        />
                    </div>

                    <SubmitButton
                        title="Submit Material Request"
                        isLoading={loading}
                    />
                </form>
            </div>
        </div>
    );
});

NewMaterialRequest.displayName = 'NewMaterialRequest';

export default NewMaterialRequest;