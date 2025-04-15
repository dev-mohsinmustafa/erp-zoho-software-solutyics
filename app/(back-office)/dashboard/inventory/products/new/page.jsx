// "use client"

import CreateProductForm from "@/components/dashboard/CreateProductForm";
import FormHeader from "@/components/dashboard/FormHeader";
import { getData } from "@/lib/getData";


const NewProduct = async ({ initialData = {}, isUpdate = false }) => {
  const TAG = "NewProducts.js"
  
  const categoriesData = getData("categories");
  const unitsData = getData("units");
  const brandsData = getData("brands");
  const warehousesData = getData("warehouse");
  const suppliersData = getData("suppliers");


  // instead of this we use 
  // PARALLEL FETCHING is more faster and did't block the code
  // 2- 
  const [categories, units, brands, warehouses, suppliers] = await Promise.all([
    categoriesData, unitsData, brandsData, warehousesData, suppliersData
  ])

 

  return (
    <div>

      {/* Header */}
      <FormHeader title={isUpdate ? "Update Product" : "New Product"} href={"/dashboard/inventory/products"} />

      {/* Form */}
      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700
      mx-auto my-3">


        {/* Now remove this form code after creating CreatingForm.jsx component */}

        <CreateProductForm categories={categories} units={units} brands={brands} warehouses={warehouses} suppliers={suppliers} initialData ={initialData} isUpdate = {isUpdate}/>



      </div>

    </div>
  )
}

export default NewProduct;