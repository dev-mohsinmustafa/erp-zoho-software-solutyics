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

const CreatePurchaseOrdersForm = ({ categories, units, brands, suppliers, warehouses, purchaseRequests, initialData = {}, isUpdate = false }) => {
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
            qty: initialData.quantity,
            title: initialData.orderBy,
            orderDate: initialData.orderDate ? new Date(initialData.orderDate).toISOString().split("T")[0] : "",
            orderStatus: initialData.orderStatus, // ✅ Default status is "Pending"
            receivedDate: initialData.receivedDate ? new Date(initialData.receivedDate).toISOString().split("T")[0] : "",
            goodsStatus: initialData.goodsStatus, // ✅ Default status is "Pending"

        },
    });



    // Watch supplier selection
    // const selectedSupplier = watch("supplierId");
    // ✅ Filter purchase requests based on selected supplier
    // const filteredPurchaseRequests = selectedSupplier
    //     ? purchaseRequests.filter(req => req.supplierId === selectedSupplier)
    //     : [];
    // const filteredPurchaseRequests = purchaseRequests.filter(req => req.supplierId == selectedSupplier);
    // const orderStatus = watch("orderStatus"); // Watching order status


    const router = useRouter();
    function redirect() {
        router.push("/dashboard/inventory/purchase-orders");
    }
    async function onSubmit(data) {
        console.log("Formdata", data);
        const formattedData = {
            ...data,
            orderBy: data.title,  // Ensure correct field is sent
            orderStatus: data.orderStatus, // ✅ Include status in submission
            purchaseOrder: `PO-${Date.now()}`,
            goodsStatus: data.goodsStatus, // ✅ Include status in submission
        };
        if (isUpdate) {
            makePutRequest(setLoading, `/api/inventory/purchase-orders/${initialData.id}`, formattedData, "Purchase Order", reset, redirect);
        } else {
            makePostRequest(setLoading, "/api/inventory/purchase-orders", formattedData, "Purchase Order", reset);
        }
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                {/* <SelectInput label="Select the Item Supplier" name="supplierId" register={register} errors={errors}
                    className="w-full" options={suppliers} /> */}
                <SelectInput label="Select the Supplier" name="supplierId" register={register} errors={errors}
                    className="w-full"
                    // options={supplier}
                    options={[
                        { id: "", title: "Select the Supplier" },
                        ...suppliers
                    ]}
                />
                {/* Purchase Order Received By */}
                {/* <TextInput label="Purchase Order#" name="purchaseOrder" register={register} errors={errors}
                    className="w-full"
                /> */}



                {/* Show fields only when a supplier is selected */}
                {/* {selectedSupplier && (
                    <> */}
                <SelectInput label="Select the Purchase Request Order" name="purchaseRequestId" register={register} errors={errors}
                    className="w-full" options={
                        [
                            { id: "", title: "Select Purchase Request" }, // Add default option
                            ...purchaseRequests.map((req) => ({
                                id: req.id,
                                title: req.purchaseOrder
                            }))
                        ]
                    } />

                {/* Show fields only if a purchase request is selected */}

                <TextInput label="Purchase Receive#" name="purchaseReceive" register={register} errors={errors}
                    className="w-full"
                />
                {/* <TextInput label="Reference#" name="reference" register={register} errors={errors}
                    className="w-full"
                /> */}

                {/* Title */}

                {/* Order Received Date */}
                <TextInput
                    label="Order Date"
                    name="orderDate"
                    register={register}
                    errors={errors}
                    className="w-full"
                    type="date"
                />
                {/* Order Received By */}
                <TextInput label="Order By" name="title" register={register} errors={errors}
                    className="w-full"
                />


                {/* Select */}
                <SelectInput
                    label="Order Status"
                    name="orderStatus"
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




                <SelectInput label="Select the Item Warehouse" name="warehouseId" register={register} errors={errors}
                    className="w-full" options={warehouses} />





                <TextareaInput label="Goods Received Remarks" name="description" register={register} errors={errors} />
                {/* <TextareaInput label="Item Notes" name="notes" register={register} errors={errors} /> */}


                {/* </> */}
                {/* )} */}

            </div>


            {/* GRN Form Section - Display when orderStatus is "Open" */}
            {/* {orderStatus === "open" && (
                <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold">Goods Received Note (GRN) Details</h3>

                    <TextInput label="GRN Number" name="grnNumber" register={register} errors={errors} className="w-full" />
                    <TextInput label="Received Date" name="receivedDate" register={register} errors={errors} className="w-full" type="date" />
                    <TextInput label="Received By" name="receivedBy" register={register} errors={errors} className="w-full" />
                    <TextareaInput label="GRN Remarks" name="grnRemarks" register={register} errors={errors} />

                </div>
            )} */}

            {/* Submit Button */}
            <SubmitButton title={isUpdate ? "Updated Existing Purchase Order" : "New Purchase Order"} isLoading={loading} />

        </form>

    )
}

export default CreatePurchaseOrdersForm;  