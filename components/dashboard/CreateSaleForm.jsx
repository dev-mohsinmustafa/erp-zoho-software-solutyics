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

const CreateSaleForm = ({ categories, units, brands, suppliers, warehouses, items, products, initialData = {}, isUpdate = false }) => {
    console.log("Initial Data", initialData);

    // const [imageUrl, setImageUrl] = useState(initialData.imageUrl);

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            ...initialData,
            qty: initialData.quantity,
            title: initialData.customerName,
            saleDate: initialData.saleDate ? new Date(initialData.saleDate).toISOString().split("T")[0] : "",

        },
    });


    const router = useRouter();
    function redirect() {
        router.push("/dashboard/inventory/sales");
    }

    async function onSubmit(data) {
        // data.imageUrl = imageUrl;
        console.log("Formdata", data);
        const formattedData = {
            ...data,
            customerName: data.title,  // Ensure correct field is sent
        };
        if (isUpdate) {
            makePutRequest(setLoading, `/api/inventory/sales/${initialData.id}`, formattedData, "Sale", reset, redirect);
        } else {
            makePostRequest(setLoading, "/api/inventory/sales", formattedData, "Sale", reset);
            // setImageUrl("");
        }
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* Title */}
                <TextInput label="Customer Name" name="title" register={register} errors={errors}
                    className="w-full"
                />
                <TextInput
                    label="Sale Date"
                    name="saleDate"
                    register={register}
                    errors={errors}
                    className="w-full"
                    type="date"
                />

                {/* Select */}
                {/* when we add 200 quantity then also add of which item so we have 2 selects  */}
                <SelectInput label="Select the Item" name="itemId" register={register} errors={errors}
                    className="w-full" options={items} />
                <SelectInput label="Select the Product" name="productId" register={register} errors={errors}
                    className="w-full" options={products} />
                <SelectInput label="Select the Item Category" name="categoryId" register={register} errors={errors}
                    className="w-full" options={categories} />


                {/* <TextInput label="Item SKU" name="sku" register={register} errors={errors} className="w-full" /> */}
                {/* <TextInput label="Item Barcode" name="barcode" register={register} errors={errors} className="w-full"
        // IsRequired="false"
        /> */}
                <TextInput label="Item Quantity Sold" name="qty" register={register} errors={errors} className="w-full" />
                <SelectInput label="Select the Item Unit" name="unitId" register={register} errors={errors}
                    className="w-full" options={units} />
                <SelectInput label="Select the Item Brand" name="brandId" register={register} errors={errors}
                    className="w-full" options={brands} />
                {/* <TextInput label="Buying Price" name="buyingPrice" register={register} errors={errors}
          className="w-full" type="number"
        />
        <TextInput label="Selling Price" name="sellingPrice" register={register} errors={errors}
          className="w-full" type="number"
        /> */}
                <SelectInput label="Select the Item Supplier" name="supplierId" register={register} errors={errors}
                    className="w-full" options={suppliers} />

                {/* <TextInput label="Re-Order Point" name="reOrderPoint" register={register} errors={errors}
          className="w-full" type="number"
        /> */}
                <SelectInput label="Select the Item Warehouse" name="warehouseId" register={register} errors={errors}
                    className="w-full" options={warehouses} />
                {/* <TextInput label="Item Weight in Kgs" name="weight" register={register} errors={errors}
          className="w-full" type="number"
        /> */}

                {/* <TextInput label="Item Dimensions in cm (20 x 30 x 100)" name="dimensions" register={register} errors={errors}
          className="w-full"
        />
        <TextInput label="Item Tax Rate in %" name="taxRate" register={register} errors={errors}
          className="w-full" type="number"
        /> */}

                <TextInput
                    label="Delivery Location"
                    name="location"
                    register={register}
                    errors={errors}
                    className="w-full"
                />

                <TextareaInput label="Item Sale Description" name="description" register={register} errors={errors} />
                {/* <TextareaInput label="Item Notes" name="notes" register={register} errors={errors} /> */}


                {/* Image Upload */}
                {/* Upload thing */}
                {/* <ImageInput label="Item Image" imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint="imageUploader"
        /> */}
            </div>


            {/* Submit Button */}
            <SubmitButton title={isUpdate ? "Updated Sale" : "New Sale"} isLoading={loading} />

        </form>

    )
}

export default CreateSaleForm;