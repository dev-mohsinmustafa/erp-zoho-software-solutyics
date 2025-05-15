"use client"

import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextareaInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import FormTextInput from "@/components/formInputs/FormTextInput";
import SelectInput from "../formInputs/SelectInput";

const CreateMaterialRequirementForm = memo(({ initialData = {}, isUpdate = false, items, units }) => {
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            ...initialData,
            department: initialData.department,
            remarks: initialData.remarks,
            status: "Pending",
            requestDate: new Date().toISOString().split('T')[0],
            requestedBy: session?.user?.name || '',
        },
    });



    function redirect() {
        router.push("/dashboard/inventory/material-requirement-form");
    }

    async function onSubmit(data) {
        const formattedData = {
            ...data,
            requestDate: new Date(),
            requestedBy: session?.user?.name,
            status: "Pending"
        };
        if (isUpdate) {
            makePutRequest(setLoading, `/api/material-requirement-form/${initialData.id}`, formattedData, "Material Requirement", reset, redirect);
        } else {
            makePostRequest(setLoading, "/api/material-requirement-form", formattedData, "Material Requirement", reset);
        }
    }

    // Watch for changes in itemId
    const selectedItemId = watch("itemId");

    // Update selectedItemId when item changes
    useEffect(() => {
        if (selectedItemId) {
            setValue("selectedItemId", selectedItemId);
        } else {
            setValue("selectedItemId", "");
        }
    }, [selectedItemId, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:gap-6">
                {/* Status Section */}
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

                <SelectInput label="Select the Item" name="itemId" register={register} errors={errors}
                    className="w-full" options={items} />
                <FormTextInput
                    label="Item ID"
                    name="selectedItemId"
                    register={register}
                    errors={errors}
                    disabled
                    className="w-full"
                />
                <FormTextInput label="Item Quantity" name="quantity" type="number" register={register} errors={errors} className="w-full" />
                <SelectInput label="Select the Item Unit" name="unitId" register={register} errors={errors}
                    className="w-full" options={units} />

                <TextareaInput
                    label="Remarks"
                    name="remarks"
                    register={register}
                    errors={errors}
                    placeholder="Optional remarks"
                />
            </div>

            <SubmitButton
                title={isUpdate ? "Update Material Requirement" : "Submit Material Requirement"}
                isLoading={loading}
            />
        </form>
    );
});

CreateMaterialRequirementForm.displayName = 'CreateMaterialRequirementForm';

export default CreateMaterialRequirementForm;