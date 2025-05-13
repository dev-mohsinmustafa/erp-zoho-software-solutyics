"use client"

import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextareaInput";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSession } from "next-auth/react";

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
            items: [{ itemId: "", name: "", quantity: "", unit: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    function redirect() {
        router.push("/dashboard/inventory/material-request-form");
    }

    async function onSubmit(data) {
        const formData = {
            ...data,
            requestDate: new Date(),
            requestedBy: session?.user?.name,
            status: "Pending"
        };
        makePostRequest(
            setLoading,
            "/api/material-requests",
            formData,
            "Material Request",
            reset,
            redirect
        );
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
                        <TextInput
                            label="Department"
                            name="department"
                            register={register}
                            errors={errors}
                            placeholder="e.g. Production"
                        />

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                                Requested Items
                            </label>
                            <div className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
                                        <TextInput
                                            placeholder="Item ID"
                                            name={`items.${index}.itemId`}
                                            register={register}
                                            errors={errors}
                                            noLabel
                                        />
                                        <TextInput
                                            placeholder="Item Name"
                                            name={`items.${index}.name`}
                                            register={register}
                                            errors={errors}
                                            noLabel
                                        />
                                        <TextInput
                                            type="number"
                                            placeholder="Quantity"
                                            name={`items.${index}.quantity`}
                                            register={register}
                                            errors={errors}
                                            noLabel
                                        />
                                        <div className="flex items-center gap-2">
                                            <TextInput
                                                placeholder="Unit"
                                                name={`items.${index}.unit`}
                                                register={register}
                                                errors={errors}
                                                noLabel
                                            />
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="text-red-600 hover:text-red-800 p-2"
                                            >
                                                ✕
                                            </button>
                                        </div>
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