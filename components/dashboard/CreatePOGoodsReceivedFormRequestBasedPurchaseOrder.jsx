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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CreatePOGoodsReceivedFormRequestBasedPurchaseOrder = ({ categories, units, brands, suppliers, warehouses, purchaseOrderRB, initialData = {}, isUpdate = false }) => {


    const status = [
        { id: "pending", title: "Pending" },
        { id: "open", title: "Open" },
        { id: "received", title: "Received" },
    ]

    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [availablePOs, setAvailablePOs] = useState(purchaseOrderRB.filter(req => req.orderStatus === "received"));
    // Add this near the top of your component
    //    const receivedPurchaseOrderRB = purchaseOrderRB.filter(req => req.orderStatus === "received");
    // const receivedPurchaseOrderRB = availablePOs.filter(req => req.orderStatus === "received");

    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
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
            totalPayment: parseFloat(data.totalPayment),
            // requestBasedPurchaseOrderId: data.purchaseOrderId,
            // purchaseOrder: `PO-${Date.now()}`
            purchaseOrderId: data.purchaseOrderId,
            // for statues change in purchase Requests table
            purchaseRequestId: selectedOrder?.purchaseRequestId
        };
        if (isUpdate) {
            makePutRequest(setLoading, `/api/poGoods-received/${initialData.id}`, formattedData, "Request Based PO Goods Received", reset, redirect);
        } else {
            makePostRequest(setLoading, "/api/poGoods-received", formattedData, "Request Based PO Goods Received", reset);
            // Update available POs after successful submission
            setAvailablePOs(prev => prev.filter(po => po.id !== data.purchaseOrderId));
            setSelectedOrder(null);
        }
    }


    // Watch for changes in purchaseOrderId
    const selectedPurchaseOrderId = watch("purchaseOrderId");

    // Update form when purchase order changes
    useEffect(() => {
        if (selectedPurchaseOrderId) {
            const selectedPO = purchaseOrderRB.find(req => req.id === selectedPurchaseOrderId);
            if (selectedPO) {
                setSelectedOrder(selectedPO);
                // Auto-fill form fields based on selected selectedPO
                setValue("supplierId", selectedPO.supplierId);
                setValue("categoryId", selectedPO.categoryId);
                setValue("qty", selectedPO.quantity);
                setValue("unitId", selectedPO.unitId);
                setValue("brandId", selectedPO.brandId);
                setValue("warehouseId", selectedPO.warehouseId);
                setValue("description", selectedPO.description);
                setValue("orderBy", selectedPO.orderBy);
                setValue("purchaseReceive", selectedPO.purchaseReceive);
                // Format the date properly
                setValue("orderDate", selectedPO.requestDate ? new Date(selectedPO.requestDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]);
            }
        }
        else {
            setSelectedOrder(null); // Reset selected order when empty option is selected
        }
    }, [selectedPurchaseOrderId, purchaseOrderRB, setValue]);




    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                {/* Purchase Order Details (Read-only) */}
                <div className="sm:col-span-2">
                    <h3> Fetch Request-Based Purchase Order Management Details</h3>
                    <h3 className="text-lg font-semibold mb-4">Purchase Order Details</h3>
                </div>

                <SelectInput label="Select the Purchase Request Order" name="purchaseOrderId" register={register} errors={errors}
                    // className="w-full"
                    options={[
                        { id: "", title: "Select Request Based PO" }, // Add default option
                        ...availablePOs.map((req) => ({
                            id: req.id,
                            // title: req.purchaseOrder,
                            title: `${req.purchaseOrder} - ${req.orderBy}`
                        }))
                    ]}
                />

                {selectedOrder && (
                    <>

                        <SelectInput label="Select the Supplier" name="supplierId" register={register} errors={errors}
                            className="w-full"
                            // options={supplier}
                            options={[
                                { id: "", title: "Select the Supplier" },
                                ...suppliers
                            ]}
                        />


                        <TextInput label="Purchase Receive#" name="purchaseReceive" register={register} errors={errors}
                            className="w-full"
                        />



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


                    </>
                )}


                {/* GRN Form Fields */}
                <div className="sm:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">GRN Received Details Add</h3>
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
                <TextInput label="Total Payment" name="totalPayment" register={register} errors={errors}
                    className="w-full" type="number"
                />
                <TextareaInput label="Goods Received Remarks" name="grnRemarks" register={register} errors={errors} />





            </div>



            {/* Submit Button */}
            <SubmitButton title={isUpdate ? "Updated Existing Goods Received" : "New Goods Received"} isLoading={loading} />

        </form>

    )
}

export default CreatePOGoodsReceivedFormRequestBasedPurchaseOrder;  