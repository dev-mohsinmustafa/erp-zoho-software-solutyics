"use client"

import FormHeader from "@/components/dashboard/FormHeader";
import ImageInput from "@/components/formInputs/ImageInput";
import SelectInput from "@/components/formInputs/SelectInput";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextareaInput";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { getData } from "@/lib/getData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

// suppliers,
const CreatePurchaseRequestsForm = ({ categories, units, brands,  warehouses, initialData = {}, isUpdate = false }) => {
    console.log("Initial Data", initialData);

    const status = [
        { id: "pending", title: "Pending" },
        { id: "approved", title: "Approved" },
        { id: "rejected", title: "Rejected" },
    ]

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            ...initialData,
            qty: initialData.quantity,
            title: initialData.requestedBy,
            requestDate: initialData.requestDate ? new Date(initialData.requestDate).toISOString().split("T")[0] : "",
            status: initialData.status || "Pending", // ✅ Default status is "Pending"

        },
    });


    const router = useRouter();
    function redirect() {
        router.push("/dashboard/inventory/purchase-requests");
    }

    async function onSubmit(data) {
        console.log("Formdata", data);
        const formattedData = {
            ...data,
            requestedBy: data.title,  // Ensure correct field is sent
            status: data.status, // ✅ Include status in submission
        };
        if (isUpdate) {
            makePutRequest(setLoading, `/api/purchase-requests/${initialData.id}`, formattedData, "Purchase Request", reset, redirect);
        } else {
            makePostRequest(setLoading, "/api/purchase-requests", formattedData, "Purchase Request", reset);
        }
    }

    return (
        // Purchase Order#
        // Reference#


        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* Title */}
                <TextInput label="Requested By" name="title" register={register} errors={errors}
                    className="w-full"
                />
                <TextInput
                    label="Request Date"
                    name="requestDate"
                    register={register}
                    errors={errors}
                    className="w-full"
                    type="date"
                />


                <TextInput label="Purchase Order#" name="purchaseOrder" register={register} errors={errors}
                    className="w-full"
                />
                <TextInput label="Reference#" name="reference" register={register} errors={errors}
                    className="w-full"
                />

                {/* Select */}
                <SelectInput
                    label="Request Status"
                    name="requestStatus"
                    register={register}
                    errors={errors}
                    className="w-full"
                    options={status}
                />

                <SelectInput label="Select the Item Category" name="categoryId" register={register} errors={errors}
                    className="w-full" options={categories} />



                <TextInput label="Item Quantity" name="qty" register={register} errors={errors} className="w-full" />
                <SelectInput label="Select the Item Unit" name="unitId" register={register} errors={errors}
                    className="w-full" options={units} />
                <SelectInput label="Select the Item Brand" name="brandId" register={register} errors={errors}
                    className="w-full" options={brands} />

                {/* <SelectInput label="Select the Item Supplier" name="supplierId" register={register} errors={errors}
                    className="w-full" options={suppliers} /> */}


                <SelectInput label="Select the Item Warehouse" name="warehouseId" register={register} errors={errors}
                    className="w-full" options={warehouses} />





                <TextareaInput label="Item Description" name="description" register={register} errors={errors} />
                {/* <TextareaInput label="Item Notes" name="notes" register={register} errors={errors} /> */}




            </div>


            {/* Submit Button */}
            <SubmitButton title={isUpdate ? "Updated Existing Purchase Request" : "New Purchase Request"} isLoading={loading} />

        </form>

    )
}

export default CreatePurchaseRequestsForm;