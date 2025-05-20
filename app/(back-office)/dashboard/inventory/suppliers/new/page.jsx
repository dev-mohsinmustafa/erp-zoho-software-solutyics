"use client"

import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextareaInput";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const NewSupplier = ({ initialData = {}, isUpdate = false }) => {
  const selectOptions = [
    {
      "label": "Main",
      "value": "main"
    },
    {
      "label": "Branch",
      "value": "branch"
    },
  ]

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData,
  });

  const router = useRouter();
  function redirect() {
    router.push("/dashboard/inventory/suppliers");
  }
  async function onSubmit(data) {
    console.log("Formdata", data);
    //  make a function apiRequest in lib to reuse code
    // api/suppliers this is folder name
    if (isUpdate) {
      makePutRequest(setLoading, `/api/inventory/suppliers/${initialData.id}`, data, "Supplier", reset, redirect);
    } else {
      makePostRequest(setLoading, "/api/inventory/suppliers", data, "Supplier", reset);
    }

    // setLoading(true);
    // try {
    //   const response = await fetch(`${baseUrl}/api/supplier`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data)
    //   })
    //   if (response.ok) {
    //     console.log(response);
    //     setLoading(false);
    //     reset();
    //     toast.success("New Supplier Created Successfully");
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   console.log(error);
    // }
  }

  return (
    <div>

      {/* Header */}
      <FormHeader title={isUpdate ? "Update Supplier" : "New Supplier"} href={"/dashboard/inventory/suppliers"} />

      {/* Form */}
      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700
      mx-auto my-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">



            {/* Title */}
            <TextInput label="Suppliers Name" name="title" register={register} errors={errors}
              className="w-full"
            />
            <TextInput label="Supplier Phone" name="phone" register={register} errors={errors}
              className="w-full"
            />
            <TextInput label="Supplier Email" name="email" type="email" register={register} errors={errors}
              className="w-full"
            />
            <TextInput label="Supplier Address" name="address" register={register} errors={errors}
              className="w-full"
            />
            <TextInput label="Supplier Contact Person" name="contactPerson" register={register} errors={errors}
              className="w-full"
            />
            <TextInput label="Supplier Code" name="supplierCode" register={register} errors={errors}
              className="w-full"
            />
            <TextInput label="Supplier TIN" name="taxID" register={register} errors={errors}
            // className="w-full"
            />
            <TextareaInput label="Supplier Payment Terms" name="paymentTerms" register={register} errors={errors} />
            <TextareaInput label="Notes" name="notes" register={register} errors={errors} />

          </div>

          {/* Submit Button */}
          <SubmitButton title={isUpdate ? "Updated Supplier" : "New Supplier"} isLoading={loading} />

        </form>
      </div>

    </div>
  )
}

export default NewSupplier;