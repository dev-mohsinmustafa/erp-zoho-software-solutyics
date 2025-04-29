"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SelectInput from '@/components/formInputs/SelectInput';
import TextInput from '@/components/formInputs/TextInput';
import TextareaInput from '@/components/formInputs/TextareaInput';
import SubmitButton from '@/components/formInputs/SubmitButton';
import { makePostRequest } from '@/lib/apiRequest';
import { useRouter } from 'next/navigation';

const CreateStockAdjustmentForm = ({ items, warehouses, categories, brands, units, initialData = {}, isUpdate = false }) => {
    const [loading, setLoading] = useState(false);


    const adjustmentTypes = [
        { id: "addition", title: "Addition" },
        { id: "subtraction", title: "Subtraction" },
    ];

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            ...initialData,
            quantity: initialData.quantity,
            adjustmentDate: initialData.adjustmentDate ? new Date(initialData.adjustmentDate).toISOString().split("T")[0] : "",
            adjustmentNumber: initialData.adjustmentNumber,
        }
    });


    const router = useRouter();
    function redirect() {
        router.push("/dashboard/inventory/stock-adjustments");
    }

    async function onSubmit(data) {
        const formattedData = {
            ...data,
            quantity: parseFloat(data.quantity)
        };
        if (isUpdate) {
            makePostRequest(setLoading, `/api/stock-adjustments/${initialData.id}`, formattedData, 'Stock Adjustment', reset, redirect);
        } else {
            makePostRequest(setLoading, '/api/stock-adjustments', formattedData, 'Stock Adjustment', reset);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">


                <SelectInput
                    label="Select Warehouse"
                    name="warehouseId"
                    register={register}
                    errors={errors}
                    options={warehouses}
                    className='w-full'
                />

                <SelectInput
                    label="Select Item"
                    name="itemId"
                    register={register}
                    errors={errors}
                    options={items}
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
                    options={adjustmentTypes}
                    className="w-full"
                />

                <TextInput
                    label="Adjustment Quantity"
                    name="quantity"
                    type="number"
                    register={register}
                    errors={errors}
                    className='w-full'
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



            </div>
        </form>
    );
};

export default CreateStockAdjustmentForm;