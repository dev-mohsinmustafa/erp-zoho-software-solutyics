"use client"

import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextareaInput";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { Plus } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const NewCategory = memo(({ initialData = {}, isUpdate = false }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData,
  });
  // const onSubmit = data => console.log(data);

  const router = useRouter();
  function redirect() {
    router.push("/dashboard/inventory/categories");
  }
  async function onSubmit(data) {
    console.log("Formdata", data);
    if (isUpdate) {
      makePutRequest(setLoading, `/api/inventory/categories/${initialData.id}`, data, "Category", reset, redirect);
    } else {
      makePostRequest(setLoading, "/api/inventory/categories", data, "Category", reset);
    }
  }


  return (
    <div>

      {/* Header */}
      <FormHeader title={isUpdate ? "Update Category" : "New Category"} href={"/dashboard/inventory/categories"} />

      {/* Form */}
      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700
      mx-auto my-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

            {/* Title */}
            <TextInput label="Category Title" name="title" register={register} errors={errors} />

            {/* make a component */}
            {/* <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
              >
                Category Title
              </label>
              <div className="mt-2">
                <input
                  {...register("title", { required: true })}
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Type the Category title"
                />
                {errors.title && (
                  <span className="text-sm text-red-600 ">
                    Category title is required
                  </span>
                )}
              </div>
            </div> */}


            <TextareaInput label="Category Description" name="description" register={register} errors={errors} />

            {/* Description make a component*/}
            {/* <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category Description
              </label>
              <div className="mt-2">
                <textarea
                  {...register("description", { required: true })}
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
                {errors.title && (
                  <span className="text-sm text-red-600 ">
                    Category description is required
                  </span>
                )}
              </div>
            </div> */}


          </div>

          {/* Submit Button */}
          <SubmitButton title={isUpdate ? "Updated Category" : "New Category"} isLoading={loading} />
          {/* <div className="sm:col-span-1">
            {loading ? (
              <button
                disabled
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Saving Course Please wait...
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                <Plus className="w-5 h-5 mr-2" />
                <span>Save Category</span>
              </button>
            )}


          </div> */}


        </form>
      </div>

      {/* Form */}
    </div>
  )
}
);
NewCategory.displayName = 'NewCategory';

export default NewCategory;