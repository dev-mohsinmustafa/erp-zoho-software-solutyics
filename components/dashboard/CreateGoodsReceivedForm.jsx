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

const CreateGoodsReceivedForm = ({ categories, units, brands, suppliers, warehouses, purchaseRequests, purchaseOrders,purchaseOrdersId, initialData = {}, isUpdate = false }) => {
    

    const status = [
        { id: "pending", title: "Pending" },
        { id: "open", title: "Open" },
        { id: "received", title: "Received" },
    ]
    
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            ...initialData,
            // qty: initialData.quantity,
            title: initialData.receivedBy,
            receivedDate: initialData.receivedDate ? new Date(initialData.receivedDate).toISOString().split("T")[0] : "",
            goodsStatus: initialData.goodsStatus, // ✅ Default status is "Pending"

        },
    });



    const router = useRouter();
    function redirect() {
        router.push("/dashboard/inventory/goods-received");
    }
    async function onSubmit(data) {
        console.log("Formdata", data);
        const formattedData = {
            ...data,
            receivedBy: data.title,  // Ensure correct field is sent
            goodsStatus: data.goodsStatus, 
            // purchaseOrder: `PO-${Date.now()}`
            purchaseOrderId: purchaseOrdersId.id 
        };
        if (isUpdate) {
            makePutRequest(setLoading, `/api/goods-received/${initialData.id}`, formattedData, "Goods Received", reset, redirect);
        } else {
            makePostRequest(setLoading, "/api/goods-received", formattedData, "Goods Received", reset);
        }
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                {/* Purchase Order Details (Read-only) */}
                <div className="sm:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">Purchase Order Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Purchase Order #</label>
                            <div className="mt-1 p-2 bg-gray-50 rounded-md">{purchaseOrdersId.purchaseOrder}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Order Date</label>
                            <div className="mt-1 p-2 bg-gray-50 rounded-md">
                                {new Date(purchaseOrdersId.orderDate).toLocaleDateString()}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Supplier</label>
                            <div className="mt-1 p-2 bg-gray-50 rounded-md">{purchaseOrdersId.supplier.title}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <div className="mt-1 p-2 bg-gray-50 rounded-md capitalize">{purchaseOrdersId.orderStatus}</div>
                        </div>
                    </div>
                </div>




                {/* GRN Form Fields */}
                <div className="sm:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">GRN Details</h3>
                </div>


                <TextInput label="GRN Number#" name="grnNumber" register={register} errors={errors}
                    className="w-full"
                />

                <TextInput
                    label="Received Date"
                    name="receivedDate"
                    register={register}
                    errors={errors}
                    className="w-full"
                    type="date"
                />

                <TextInput label="Received By" name="title" register={register} errors={errors}
                    className="w-full"
                />
                 <SelectInput
                    label="Goods Status"
                    name="goodsStatus"
                    register={register}
                    errors={errors}
                    className="w-full"
                    options={status}
                />
                <TextareaInput label="Goods Received Remarks" name="grnRemarks" register={register} errors={errors} />





            </div>


           
            {/* Submit Button */}
            <SubmitButton title={isUpdate ? "Updated Existing Goods Received" : "New Goods Received"} isLoading={loading} />

        </form>

    )
}

export default CreateGoodsReceivedForm;  