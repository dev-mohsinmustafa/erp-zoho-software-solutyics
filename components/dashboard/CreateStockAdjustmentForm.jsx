"use client"
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SelectInput from '@/components/formInputs/SelectInput';
import TextInput from '@/components/formInputs/TextInput';
import TextareaInput from '@/components/formInputs/TextareaInput';
import SubmitButton from '@/components/formInputs/SubmitButton';
import { makePostRequest, makePutRequest } from '@/lib/apiRequest';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';


const CreateStockAdjustmentForm = ({ items, warehouses, initialData = {}, isUpdate = false }) => {
    const [loading, setLoading] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);


    const adjustmentTypes = [
        { id: "addition", title: "Addition" },
        { id: "subtraction", title: "Subtraction" },
    ];

    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            ...initialData,
            quantity: initialData.quantity,
            adjustmentDate: initialData.adjustmentDate ? new Date(initialData.adjustmentDate).toISOString().split("T")[0] : "",
            adjustmentNumber: initialData.adjustmentNumber,
        }
    });



    // Watch for changes in warehouseId
    const selectedWarehouseId = watch("warehouseId");
    const selectedItemId = watch("itemId");
    // Watch for changes in adjustmentType
    const selectedAdjustmentType = watch("adjustmentType");

    // Update form when warehouse  changes
    useEffect(() => {
        if (selectedWarehouseId) {
            const warehouse = warehouses.find(war => war.id === selectedWarehouseId);
            if (warehouse) {
                setSelectedWarehouse(warehouse);
                // Auto-fill form fields based on selected request
                setValue("warehouseId", warehouse.id);
                setValue("currentStock", warehouse.stockQty);
                // setValue("itemId", warehouse.items.title);
                // Reset item selection when warehouse changes
                setValue("itemId", "");

                // Generate unique adjustment number
                const generatedNumber = `WH-${selectedWarehouseId}-ADJ-${Date.now()}`;
                setValue("adjustmentNumber", generatedNumber);
            }
        }
        else {
            setSelectedWarehouse(null); // Reset selected warehouse when empty option is selected
            // Reset fields when warehouse is deselected
            setValue("itemId", "");
            setValue("currentStock", "");
            setValue("adjustmentNumber", ""); // Clear adjustment number when warehouse is cleared
        }
    }, [selectedWarehouseId, warehouses, setValue]);

    // New useEffect to handle item selection
    useEffect(() => {
        if (selectedWarehouseId && selectedWarehouse) {
            if (selectedItemId) {
                // If item is selected, show item's stock
                const selectedItem = selectedWarehouse.items.find(item => item.id === selectedItemId);
                if (selectedItem) {
                    setValue("currentStock", selectedItem.quantity);
                }
            } else {
                // If item is deselected, show warehouse stock
                setValue("currentStock", selectedWarehouse.stockQty);
            }
        }
    }, [selectedItemId, selectedWarehouse, selectedWarehouseId, setValue]);



    // Add useEffect for adjustment type changes
    useEffect(() => {
        if (selectedAdjustmentType && !initialData.adjustmentType) {
            const message = selectedAdjustmentType === "addition"
                ? "You are about to add stock to the inventory"
                : "You are about to subtract stock from the inventory";

            const icon = selectedAdjustmentType === "addition" ? "info" : "warning";

            Swal.fire({
                title: 'Stock Adjustment Type Selected',
                text: message,
                icon: icon,
                showCancelButton: true,
                confirmButtonText: 'Continue',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33'
            }).then((result) => {
                if (!result.isConfirmed) {
                    // If user clicks Cancel, reset the adjustment type
                    setValue("adjustmentType", "");
                }
            });
        }
    }, [selectedAdjustmentType, setValue, initialData.adjustmentType]);
    //

    const router = useRouter();
    function redirect() {
        router.push("/dashboard/inventory/stock-adjustments");
    }

    async function onSubmit(data) {
        //
        // Show confirmation dialog before proceeding
        const result = await Swal.fire({
            title: 'Confirm Stock Adjustment',
            html: `
        <div class="text-left">
            <p><strong>Warehouse:</strong> ${selectedWarehouse?.title}</p>
            <p><strong>Item:</strong> ${selectedWarehouse?.items.find(i => i.id === data.itemId)?.title}</p>
            <p><strong>Current Stock:</strong> ${data.currentStock}</p>
            <p><strong>Adjustment Type:</strong> ${data.adjustmentType}</p>
            <p><strong>Adjustment Quantity:</strong> ${data.quantity}</p>
            <p><strong>New Stock will be:</strong> ${data.adjustmentType === "addition"
                    ? parseFloat(data.currentStock) + parseFloat(data.quantity)
                    : parseFloat(data.currentStock) - parseFloat(data.quantity)
                }</p>
        </div>
    `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, proceed!',
            cancelButtonText: 'Cancel'
        });

        //
        //
        if (result.isConfirmed) {
            //
            const formattedData = {
                ...data,
                quantity: parseFloat(data.quantity)
            };
            if (isUpdate) {
                makePutRequest(setLoading, `/api/stock-adjustments/${initialData.id}`, formattedData, 'Stock Adjustment', reset, redirect);
            } else {
                makePostRequest(setLoading, '/api/stock-adjustments', formattedData, 'Stock Adjustment', reset);
            }
            //
        }
        //
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">


                <SelectInput
                    label="Select Warehouse"
                    name="warehouseId"
                    register={register}
                    errors={errors}
                    // options={warehouses}
                    options={[
                        { id: "", title: "Select the Warehouse" },
                        ...warehouses.map(warehouse => ({
                            id: warehouse.id,
                            title: `${warehouse.title} (${warehouse.location})`
                        }))
                    ]}
                    className='w-full'
                />



                {selectedWarehouse && (
                    <>
                        <SelectInput
                            label="Select Item"
                            name="itemId"
                            register={register}
                            errors={errors}
                            // options={items}
                            options={[
                                { id: "", title: "Select an Item" },
                                ...(selectedWarehouse.items || []).map(item => ({
                                    id: item.id,
                                    title: `${item.title} (Stock: ${item.quantity})`
                                }))
                            ]}
                            className="w-full"
                        />

                        <TextInput
                            label="Current Stock"
                            name="currentStock"
                            type="number"
                            register={register}
                            errors={errors}
                            className="w-full"
                            readOnly
                        />


                        <TextInput
                            label="Adjustment Number"
                            name="adjustmentNumber"
                            register={register}
                            errors={errors}
                            className="w-full"
                            readOnly
                        />




                        <SelectInput
                            label="Adjustment Type"
                            name="adjustmentType"
                            register={register}
                            errors={errors}
                            // options={adjustmentTypes}
                            options={[
                                { id: "", title: "Select the Adjustment Type" },
                                ...adjustmentTypes.map(type => ({
                                    id: type.id,
                                    title: type.title
                                }))
                            ]}
                            className="w-full"
                        />

                        <TextInput
                            // label="Adjustment Quantity"
                            label="No. of Adjustment Quantity to be added"
                            name="quantity"
                            type="number"
                            register={register}
                            errors={errors}
                            className='w-full'
                            min="0"  // Add this to prevent negative numbers
                        />

                        <TextInput
                            label="Adjustment Date"
                            name="adjustmentDate"
                            type="date"
                            register={register}
                            errors={errors}
                            className="w-full"
                            defaultValue={new Date().toISOString().split('T')[0]}
                        />

                        <TextareaInput
                            label="Adjustment Reason"
                            name="reason"
                            register={register}
                            errors={errors}
                            className="sm:col-span-2"
                        />

                        <SubmitButton
                            title={isUpdate ? "Update Stock Adjustment" : "Create Stock Adjustment"}
                            isLoading={loading}
                        />

                    </>
                )}


            </div>
        </form>
    );
};

export default CreateStockAdjustmentForm;