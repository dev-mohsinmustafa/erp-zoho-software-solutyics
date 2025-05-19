"use client"

import FormHeader from "@/components/dashboard/FormHeader";
import SelectInput from "@/components/formInputs/SelectInput";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextareaInput";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const NewWarehouse = ({ initialData = {}, isUpdate = false }) => {

  const selectOptions = [
    {
      "title": "Main Warehouse",
      "id": "main"
    },
    {
      "title": "Regional Warehouse",
      "id": "regional"
    },
    {
      "title": "Distribution Center",
      "id": "distribution"
    },
    {
      "title": "Raw Material Storage",
      "id": "raw_material"
    },
    {
      "title": "Finished Goods Storage",
      "id": "finished_goods"
    },
    {
      "title": "Main Branch",
      "id": "main"
    },
    {
      "title": "Sub Branch",
      "id": "sub"
    },
  ];


  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData,
  });

  const router = useRouter();
  function redirect() {
    router.push("/dashboard/inventory/warehouse");
  }

  async function onSubmit(data) {
    console.log("Formdata", data);
    if (isUpdate) {
      // Update request
      makePutRequest(setLoading, `/api/inventory/warehouse/${initialData.id}`, data, "Warehouse", reset, redirect);
    } else {
      makePostRequest(setLoading, "/api/inventory/warehouse", data, "Warehouse", reset);
    }
  }

  return (
    <div>

      {/* Header */}
      <FormHeader title={isUpdate ? "Update Warehouse" : "New Warehouse"} href={"/dashboard/inventory/warehouse"} />

      {/* Form */}
      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700
      mx-auto my-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

            {/* Select */}
            <SelectInput label="Select the Warehouse Type" name="type" register={register} errors={errors}
              className="w-full" options={selectOptions} />

            {/* Title */}
            <TextInput label="Warehouse Title" name="title" register={register} errors={errors}
              className="w-full"
            />
            <TextInput label="Warehouse Location" name="location" register={register} errors={errors}
              className="w-full"
            />
            {/* <TextInput label="Stock Add in Warehouse" name="stockQty" register={register} errors={errors}
              className="w-full"
            /> */}
            <TextareaInput label="Warehouse Description" name="description" register={register} errors={errors} />
          </div>

          {/* Submit Button */}
          <SubmitButton title={isUpdate ? "Updated Warehouse" : "New Warehouse"} isLoading={loading} />

        </form>
      </div>

    </div>
  )
}

export default NewWarehouse;