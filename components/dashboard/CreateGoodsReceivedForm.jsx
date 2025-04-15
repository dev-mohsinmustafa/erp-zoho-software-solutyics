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
    // console.log("Initial Data", initialData);
    // console.log("Fetched Purchase Requests Data Mohsin:", purchaseRequests[0].purchaseOrder);


    const status = [
        { id: "pending", title: "Pending" },
        { id: "open", title: "Open" },
        { id: "received", title: "Received" },
    ]
    // const suppliers = [
    //     { id: "1", title: "Ahmad" },
    //     { id: "2", title: "Ali" },
    //     { id: "3", title: "Khalid" },
    // ]
    // const suppliers = [
    //     {
    //         "title": "Supplier Ali",
    //         "id": "123"
    //     },
    //     {
    //         "title": "Supplier John",
    //         "id": "345"
    //     },
    //     {
    //         "title": "Supplier Carlos",
    //         "id": "567"
    //     },
    // ]

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
            goodsStatus: data.goodsStatus, // ✅ Include status in submission
            // purchaseOrder: `PO-${Date.now()}`
            purchaseOrderId: purchaseOrdersId.id // Add purchaseOrderId to the submission
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


                {/* <SelectInput label="Select the Supplier" name="supplierId" register={register} errors={errors}
                    className="w-full" options={suppliers} /> */}
                {/* Purchase Order Received By */}
                {/* <TextInput label="Purchase Order#" name="purchaseOrder" register={register} errors={errors}
                    className="w-full"
                /> */}

                {/* Show fields only when a supplier is selected */}

                {/* <SelectInput label="Select the Purchase Request Order" name="purchaseRequestId" register={register} errors={errors}
                    className="w-full" options={purchaseRequests.map((req) => ({
                        id: req.id,
                        title: req.purchaseOrder
                    }))} /> */}

                {/* Show fields only if a purchase request is selected */}

                {/* <TextInput label="Purchase Receive#" name="purchaseReceive" register={register} errors={errors}
                    className="w-full"
                /> */}
                {/* <TextInput label="Reference#" name="reference" register={register} errors={errors}
                    className="w-full"
                /> */}

                {/* Title */}

                {/* Order Received Date */}
                {/* <TextInput
                    label="Order Date"
                    name="orderDate"
                    register={register}
                    errors={errors}
                    className="w-full"
                    type="date"
                /> */}
                {/* Order Received By */}
                {/* <TextInput label="Order By" name="title" register={register} errors={errors}
                    className="w-full"
                /> */}


                {/* Select */}
                {/* <SelectInput
                    label="Order Status"
                    name="orderStatus"
                    register={register}
                    errors={errors}
                    className="w-full"
                    options={status}
                /> */}

                {/* <SelectInput label="Select the Item Category" name="categoryId" register={register} errors={errors}
                    className="w-full" options={categories} /> */}



                {/* <TextInput label="Item Quantity" name="qty" register={register} errors={errors} className="w-full" /> */}
                {/* <SelectInput label="Select the Item Unit" name="unitId" register={register} errors={errors}
                    className="w-full" options={units} />
                <SelectInput label="Select the Item Brand" name="brandId" register={register} errors={errors}
                    className="w-full" options={brands} /> */}

                {/* <SelectInput label="Select the Item Supplier" name="supplierId" register={register} errors={errors}
                    className="w-full" options={suppliers} /> */}


                {/* <SelectInput label="Select the Item Warehouse" name="warehouseId" register={register} errors={errors}
                    className="w-full" options={warehouses} /> */}



            </div>


           
            {/* Submit Button */}
            <SubmitButton title={isUpdate ? "Updated Existing Goods Received" : "New Goods Received"} isLoading={loading} />

        </form>

    )
}

export default CreateGoodsReceivedForm;  