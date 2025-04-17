"use client"

import SelectInput from "@/components/formInputs/SelectInput";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextareaInput";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CreateRequestBasedPurchaseOrdersForm = ({ categories, units, brands, suppliers, warehouses, purchaseRequests, initialData = {}, isUpdate = false }) => {

    const [selectedRequest, setSelectedRequest] = useState(null);

    const status = [
        { id: "pending", title: "Pending" },
        { id: "open", title: "Open" },
        { id: "received", title: "Received" },
    ]



    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            ...initialData,
            qty: initialData.quantity,
            title: initialData.orderBy,
            orderDate: initialData.requestDate ? new Date(initialData.requestDate).toISOString().split("T")[0] : "",
            orderStatus: initialData.orderStatus, // ✅ Default status is "Pending"
            receivedDate: initialData.receivedDate ? new Date(initialData.receivedDate).toISOString().split("T")[0] : "",
            goodsStatus: initialData.goodsStatus, // ✅ Default status is "Pending"

        },
    });



    // Watch for changes in purchaseRequestId
    const selectedPurchaseRequestId = watch("purchaseRequestId");

    // Update form when purchase request changes
    useEffect(() => {
        if (selectedPurchaseRequestId) {
            const request = purchaseRequests.find(req => req.id === selectedPurchaseRequestId);
            if (request) {
                setSelectedRequest(request);
                // Auto-fill form fields based on selected request
                setValue("categoryId", request.categoryId);
                setValue("qty", request.quantity);
                setValue("unitId", request.unitId);
                setValue("brandId", request.brandId);
                setValue("warehouseId", request.warehouseId);
                setValue("description", request.description);
                setValue("orderBy", request.requestedBy);
                setValue("purchaseReceive", request.reference);
                // Format the date properly
                setValue("orderDate", request.requestDate ? new Date(request.requestDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]);
            }
        }
        else {
            setSelectedRequest(null); // Reset selected request when empty option is selected
        }
    }, [selectedPurchaseRequestId, purchaseRequests, setValue]);


    // Add this near the top of your component
    const approvedRequests = purchaseRequests.filter(req => req.status === "approved");



    const router = useRouter();
    function redirect() {
        router.push("/dashboard/inventory/purchase-orders");
    }
    async function onSubmit(data) {
        console.log("Formdata", data);
        const formattedData = {
            ...data,
            orderBy: data.orderBy,  // Ensure correct field is sent
            orderStatus: data.orderStatus, // ✅ Include status in submission
            purchaseOrder: `PO-${Date.now()}`,
            goodsStatus: data.goodsStatus, // ✅ Include status in submission
        };
        if (isUpdate) {
            makePutRequest(setLoading, `/api/purchase-orders/${initialData.id}`, formattedData, "Purchase Order", reset, redirect);
        } else {
            makePostRequest(setLoading, "/api/purchase-orders/request-based", formattedData, "Purchase Order", reset);
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



                {/* Show only filtered purchase requests when a supplier is selected */}
                <SelectInput label="Select the Purchase Request Order" name="purchaseRequestId" register={register} errors={errors}
                    className="w-full" options={[
                        { id: "", title: "Select Purchase Request" }, // Add default option
                        ...approvedRequests.map((req) => ({
                            id: req.id,
                            // title: req.purchaseOrder,
                            title: `${req.purchaseOrder} - ${req.description}`
                        }))
                    ]
                    }
                />

                {/* Show fields only if a purchase request is selected */}
                {/* Display selected request details */}
                {selectedRequest && (
                    <>
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
                        <TextInput label="Order By" name="orderBy" register={register} errors={errors}
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

                    </>
                )}


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

export default CreateRequestBasedPurchaseOrdersForm;  