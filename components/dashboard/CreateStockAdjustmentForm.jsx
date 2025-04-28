"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SelectInput from '@/components/formInputs/SelectInput';
import TextInput from '@/components/formInputs/TextInput';
import TextareaInput from '@/components/formInputs/TextareaInput';
import SubmitButton from '@/components/formInputs/SubmitButton';
import { makePostRequest } from '@/lib/apiRequest';

const CreateStockAdjustmentForm = ({ items, warehouses }) => {
    const [loading, setLoading] = useState(false);

    const adjustmentTypes = [
        { id: "addition", title: "Addition" },
        { id: "subtraction", title: "Subtraction" },
        { id: "damage", title: "Damage" },
        { id: "lost", title: "Lost" }
    ];

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const formattedData = {
            ...data,
            adjustmentDate: new Date().toISOString(),
            quantity: parseFloat(data.quantity)
        };

        try {
            await makePostRequest(
                setLoading,
                '/api/stock-adjustments',
                formattedData,
                'Stock Adjustment',
                reset
            );
        } catch (error) {
            console.error('Error creating stock adjustment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

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
                    defaultValue={`ADJ-${Date.now()}`}
                    readOnly
                />


                <SelectInput
                    label="Select Warehouse"
                    name="warehouseId"
                    register={register}
                    errors={errors}
                    options={warehouses}
                    className='w-full'
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