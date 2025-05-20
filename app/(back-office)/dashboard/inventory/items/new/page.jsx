// "use client"

import CreateItemForm from "@/components/dashboard/CreateItemForm";
import FormHeader from "@/components/dashboard/FormHeader";
import { getData } from "@/lib/getData";
// import ImageInput from "@/components/formInputs/ImageInput";
// import SelectInput from "@/components/formInputs/SelectInput";
// import SubmitButton from "@/components/formInputs/SubmitButton";
// import TextareaInput from "@/components/formInputs/TextareaInput";
// import TextInput from "@/components/formInputs/TextInput";
// import { makePostRequest } from "@/lib/apiRequest";
// import { getData } from "@/lib/getData";
// import { UploadDropzone } from "@/lib/uploadthing";
// import { Pencil } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";
// import { useForm } from "react-hook-form";

const NewItem = async ({ initialData = {}, isUpdate = false }) => {
  const TAG = "NewItem.js"
  // const [imageUrl, setImageUrl] = useState("");
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
  // const units = [
  //   {
  //     "label": "Kg",
  //     "value": "123"
  //   },
  //   {
  //     "label": "Pcs",
  //     "value": "345"
  //   },
  // ]
  // const brands = [
  //   {
  //     "label": "Hp",
  //     "value": "123"
  //   },
  //   {
  //     "label": "Dell",
  //     "value": "345"
  //   },
  // ]
  // const warehouses = [
  //   {
  //     "label": "Warehouse A",
  //     "value": "123"
  //   },
  //   {
  //     "label": "Warehouse B",
  //     "value": "345"
  //   },
  //   {
  //     "label": "Warehouse C",
  //     "value": "567"
  //   },
  // ]

  // const suppliers = [
  //   {
  //     "label": "Supplier A",
  //     "value": "123"
  //   },
  //   {
  //     "label": "Supplier B",
  //     "value": "345"
  //   },
  //   {
  //     "label": "Supplier C",
  //     "value": "567"
  //   },
  // ]

  // Instead of this 
  // const categories = []
  // const units = []
  // const brands = []
  // const warehouses = []
  // const suppliers = []

  // Now we fetch all these things 
  // await await this is broking
  // SEQUENTIAL FETCHING ==> Waterfall
  // 1- 
  // const categories = await getData("categories");
  // // console.log(TAG, "Categories", categories);
  // const units = await getData("units");
  // const brands = await getData("brands");
  // const warehouses = await getData("warehouse");
  // const suppliers = await getData("suppliers");

  const categoriesData = getData("inventory/categories");
  const unitsData = getData("inventory/units");
  const brandsData = getData("inventory/brands");
  const warehousesData = getData("inventory/warehouse");
  const suppliersData = getData("inventory/suppliers");


  // instead of this we use 
  // PARALLEL FETCHING is more faster and did't block the code
  // 2- 
  const [categories, units, brands, warehouses, suppliers] = await Promise.all([
    categoriesData, unitsData, brandsData, warehousesData, suppliersData
  ])

  // Now remove this  
  // const [loading, setLoading] = useState(false);
  // const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // async function onSubmit(data) {
  //   data.imageUrl = imageUrl;
  //   console.log("Formdata", data);

  //   makePostRequest(setLoading, "/api/items", data, "Item", reset);
  // }

  return (
    <div>

      {/* Header */}
      <FormHeader title={isUpdate ? "Update Item" : "New Item"} href={"/dashboard/inventory/items"} />

      {/* Form */}
      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700
      mx-auto my-3">


        {/* Now remove this form code after creating CreatingForm.jsx component */}

        <CreateItemForm categories={categories} units={units} brands={brands} warehouses={warehouses} suppliers={suppliers} initialData={initialData} isUpdate={isUpdate} />


        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        {/* <div className="grid gap-4 sm:grid-cols-2 sm:gap-6"> */}
        {/* Title */}
        {/* <TextInput label="Item Title" name="title" register={register} errors={errors}
              className="w-full"
            /> */}
        {/* Select */}
        {/* <SelectInput label="Select the Item Category" name="categoryId" register={register} errors={errors}
              className="w-full" options={categories} /> */}


        {/* <TextInput label="Item SKU" name="sku" register={register} errors={errors} className="w-full" /> */}
        {/* <TextInput label="Item Barcode" name="barcode" register={register} errors={errors} className="w-full" */}
        {/* // IsRequired="false" */}
        {/* // /> */}
        {/* <TextInput label="Item Quantity" name="qty" register={register} errors={errors} className="w-full" />
            <SelectInput label="Select the Item Unit" name="unitId" register={register} errors={errors}
              className="w-full" options={units} />
            <SelectInput label="Select the Item Brand" name="brandId" register={register} errors={errors}
              className="w-full" options={brands} />
            <TextInput label="Buying Price" name="buyingPrice" register={register} errors={errors}
              className="w-full" type="number"
            />
            <TextInput label="Selling Price" name="sellingPrice" register={register} errors={errors}
              className="w-full" type="number"
            />
            <SelectInput label="Select the Item Supplier" name="supplierId" register={register} errors={errors}
              className="w-full" options={suppliers} />

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
            <TextInput label="Item Tax Rate in %" name="taxRate" register={register} errors={errors}
              className="w-full" type="number"
            />


            <TextareaInput label="Item Description" name="description" register={register} errors={errors} />
            <TextareaInput label="Item Notes" name="notes" register={register} errors={errors} /> */}

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
        {/* <ImageInput label="Item Image" imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint="imageUploader"
            /> */}
        {/* </div> */}



        {/* Submit Button */}
        {/* <SubmitButton title="Item" isLoading={loading} /> */}

        {/* </form> */}





      </div>

    </div>
  )
}

export default NewItem;