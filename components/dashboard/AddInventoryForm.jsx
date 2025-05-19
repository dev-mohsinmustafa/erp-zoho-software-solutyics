"use client"
import { memo } from 'react';

import SelectInput from "@/components/formInputs/SelectInput";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextareaInput";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest } from "@/lib/apiRequest";
import { useCallback } from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";

const AddInventoryForm = memo(({ items, warehouses, suppliers }) => {
  // Now remove this because we fetch from db now

  // const branches = [
  //   {
  //     "label": "Branch A",
  //     "value": "32923"
  //   },
  //   {
  //     "label": "Branch B",
  //     "value": "3434"
  //   },
  //   {
  //     "label": "Main A",
  //     "value": "3434"
  //   },
  //   {
  //     "label": "Main B",
  //     "value": "3434"
  //   },
  // ]
  // instead of branches we use warehouses

  // const items = [
  //   {
  //     "label": "Item A",
  //     "value": "32923"
  //   },
  //   {
  //     "label": "Item B",
  //     "value": "3434"
  //   },
  //   {
  //     "label": "Item C",
  //     "value": "3434"
  //   },
  // ]

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  async function onSubmit(data) {
    console.log("Formdata", data);
    makePostRequest(setLoading, "/api/inventory/adjustments/add", data, "Add Stock Adjustment", reset);
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700
      mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

        {/* Title */}
        <TextInput label="Reference Number" type="text" name="referenceNumber" register={register} errors={errors}
        // className="w-full"
        />

        {/* when we add 200 quantity then also add of which item so we have 2 selects  */}
        <SelectInput label="Select the Item" name="itemId" register={register} errors={errors}
          className="w-full" options={items} />

        {/* supplierId   */}
        <SelectInput label="Select the Supplier" name="supplierId" register={register} errors={errors}
          className="w-full" options={suppliers} />

        <TextInput label="Enter Quantity of Stock to Add" type="number" name="addStockQty" register={register} errors={errors}
          className="w-full"
        />


        {/* Select the inventory qty which you transfer*/}
        {/* receivingBranchId of warehouse */}
        <SelectInput label="Select the Warehouse that will receive the Stock" name="receivingWarehouseId" register={register} errors={errors}
          className="w-full" options={warehouses} />


        <TextareaInput label="Adjustments Notes" name="notes" register={register} errors={errors} />
      </div>

      {/* Submit Button */}
      <SubmitButton title="Adjustments" isLoading={loading} />

    </form>

  )
}
);

AddInventoryForm.displayName = 'AddInventoryForm';

export default AddInventoryForm;