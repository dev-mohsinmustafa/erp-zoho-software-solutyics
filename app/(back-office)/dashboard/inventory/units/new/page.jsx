"use client"

import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const NewUnit = ({ initialData = {}, isUpdate = false }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData,
  });

  // For redirecting to page
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/inventory/units");
  }

  async function onSubmit(data) {
    console.log("Formdata", data);
    if (isUpdate) {
      // Update request
      makePutRequest(setLoading, `/api/inventory/units/${initialData.id}`, data, "Unit", reset, redirect,);
    } else {
      makePostRequest(setLoading, "/api/inventory/units", data, "Unit", reset,);
    }
  }

  return (
    <div>
      {/* Header */}
      <FormHeader title={isUpdate ? "Update Unit" : "New Unit"} href={"/dashboard/inventory/units"} />

      {/* Form */}
      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700
      mx-auto my-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

            {/* Title */}
            <TextInput label="Unit Title" name="title" register={register} errors={errors}
              className="w-full"
            />
            <TextInput label="Unit Abbreviation" name="abbreviation" register={register} errors={errors}
              className="w-full"
            />

          </div>

          {/* Submit Button */}
          <SubmitButton title={isUpdate ? "Updated Unit" : "New Unit"} isLoading={loading} />
        </form>
      </div>

    </div>
  )
}

export default NewUnit;