"use client"

import FormHeader from "@/components/dashboard/FormHeader";
import ImageInput from "@/components/formInputs/ImageInput";
import SelectInput from "@/components/formInputs/SelectInput";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextareaInput";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { getData } from "@/lib/getData";
import { UploadDropzone } from "@/lib/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelectInput from "../formInputs/MultiSelectInput";

const CreateItemForm = ({ categories, units, brands, suppliers, warehouses, taxes, initialData = {}, isUpdate = false }) => {
  console.log("Initial Data", initialData);

  // const [imageUrl, setImageUrl] = useState("");
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl);
  // const categories = [
  //   {
  //     "label": "Electronics",
  //     "value": "123"
  //     // this value is an id
  //   },
  //   {
  //     "label": "Clothes",
  //     "value": "345"
  //   },
  // ]
  //   const units = [
  //     {
  //       "label": "Kg",
  //       "value": "123"
  //     },
  //     {
  //       "label": "Pcs",
  //       "value": "345"
  //     },
  //   ]

  //   const brands = [
  //     {
  //       "label": "Hp",
  //       "value": "123"
  //     },
  //     {
  //       "label": "Dell",
  //       "value": "345"
  //     },
  //   ]

  //   const warehouses = [
  //     {
  //       "label": "Warehouse A",
  //       "value": "123"
  //     },
  //     {
  //       "label": "Warehouse B",
  //       "value": "345"
  //     },
  //     {
  //       "label": "Warehouse C",
  //       "value": "567"
  //     },
  //   ]

  //   const suppliers = [
  //     {
  //       "label": "Supplier A",
  //       "value": "123"
  //     },
  //     {
  //       "label": "Supplier B",
  //       "value": "345"
  //     },
  //     {
  //       "label": "Supplier C",
  //       "value": "567"
  //     },
  //   ]

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      ...initialData,
      qty: initialData.quantity
    },
  });


  const router = useRouter();
  function redirect() {
    router.push("/dashboard/inventory/items");
  }

  async function onSubmit(data) {
    data.imageUrl = imageUrl;
    console.log("Formdata", data);
    if (isUpdate) {
      makePutRequest(setLoading, `/api/inventory/items/${initialData.id}`, data, "Item", reset, redirect);
    } else {
      makePostRequest(setLoading, "/api/inventory/items", data, "Item", reset);
      setImageUrl("");
    }
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {/* Title */}
        <TextInput label="Item Title" name="title" register={register} errors={errors}
          className="w-full"
        />
        {/* Select */}
        <SelectInput label="Select the Item Category" name="categoryId" register={register} errors={errors}
          className="w-full" options={categories} />


        <TextInput label="Item SKU" name="sku" register={register} errors={errors} className="w-full" />
        {/* <TextInput label="Item Barcode" name="barcode" register={register} errors={errors} className="w-full"
        IsRequired="false"
        /> */}
        <TextInput label="Item Quantity" name="qty" register={register} errors={errors} className="w-full" />
        <SelectInput label="Select the Item Unit" name="unitId" register={register} errors={errors}
          className="w-full" options={units} />
        <SelectInput label="Select the Item Brand" name="brandId" register={register} errors={errors}
          className="w-full" options={brands} />
        <TextInput label="Purchase Price" name="purchasePrice" register={register} errors={errors}
          className="w-full" type="number"
        />
        <TextInput label="Sale Price" name="salePrice" register={register} errors={errors}
          className="w-full" type="number"
        />
        {/* <SelectInput label="Select the Item Supplier" name="supplierId" register={register} errors={errors}
          className="w-full" options={suppliers} /> */}

        <MultiSelectInput
          label="Select Item Suppliers"
          name="supplierIds"
          register={register}
          errors={errors}
          className="w-full"
          options={suppliers}
        // defaultValue={initialData?.suppliers || []}
        />


        <TextInput label="Re-Order Point" name="reOrderPoint" register={register} errors={errors}
          className="w-full" type="number"
        />
        <SelectInput label="Select the Item Warehouse" name="warehouseId" register={register} errors={errors}
          className="w-full" options={warehouses} />
        <TextInput label="Item Weight in Kgs" name="weight" register={register} errors={errors}
          className="w-full" type="number"
        />

        <TextInput label="Item Dimensions in cm (20 x 30 x 100)" name="dimensions" register={register} errors={errors}
          className="w-full"
        />
        {/* <TextInput label="Item Tax Rate in %" name="taxRate" register={register} errors={errors}
          className="w-full" type="number"
        /> */}
        <SelectInput label="Select the Taxes" name="taxId" register={register} errors={errors}
          className="w-full"
          // options={taxes} 
          options={taxes.map(tax => ({
            id: tax.id,
            title: `${tax.title} (${tax.rate}%)`
          }))}
        />


        <TextareaInput label="Item Description" name="description" register={register} errors={errors} />
        <TextareaInput label="Item Notes" name="notes" register={register} errors={errors} />

        {/* Image Upload */}
        {/* <div className="sm:col-span-2 ">
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Files: ", res);
                  alert("Upload Completed");
                  console.log("Image File Get", res[0].ufsUrl);
                  setImageUrl(res[0].ufsUrl);

                }}
                onUploadError={(error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div> */}

        {/* Upload thing */}
        <ImageInput label="Item Image" imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint="imageUploader"
        />
      </div>



      {/* Submit Button */}
      <SubmitButton title={isUpdate ? "Updated Item" : "New Item"} isLoading={loading} />

    </form>

  )
}

export default CreateItemForm;