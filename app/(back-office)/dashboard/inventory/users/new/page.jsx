"use client"

import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const NewUser = ({ initialData = {}, isUpdate = false }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData,
  });

  // For redirecting to page
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/inventory/users");
  }

  async function onSubmit(data) {
    console.log("Formdata", data);
    if (isUpdate) {
      // Update request
      makePutRequest(setLoading, `/api/user/${initialData.id}`, data, "User", reset, redirect,);
    } else {
      makePostRequest(setLoading, "/api/user", data, "User", reset,);
    }
  }


  const roles = [
    { id: "admin", title: "Administrator" },
    { id: "user", title: "Regular User" },
    // { id: "manager", title: "Manager" }
  ];

  return (
    <div>
      {/* Header */}
      <FormHeader title={isUpdate ? "Update User" : "New User"} href={"/dashboard/inventory/users"} />

      {/* Form */}
      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700
      mx-auto my-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

            {/* Title */}
            <TextInput label="User Name" name="name" register={register} errors={errors}
              className="w-full"
            />
            <TextInput label="User Company Name" name="companyName" register={register} errors={errors}
              className="w-full"
            />
            <TextInput label="User Email" name="email" type="email" register={register} errors={errors}
              className="w-full"
            />
            {/* Password Field - Only show for new users */}
            {!isUpdate && (
              <TextInput
                label="Password"
                name="password"
                type="password"
                register={register}
                errors={errors}
                className="w-full"
                required={true}
              />
            )}

            {/* Role Selection */}
            <div className="w-full">
              <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                User Role
              </label>
              <select
                id="role"
                {...register("role", { required: "Role is required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.title}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.role.message}
                </p>
              )}
            </div>



          </div>

          {/* Submit Button */}
          <SubmitButton title={isUpdate ? "Updated User" : "New User"} isLoading={loading} />
        </form>
      </div>

    </div>
  )
}

export default NewUser;