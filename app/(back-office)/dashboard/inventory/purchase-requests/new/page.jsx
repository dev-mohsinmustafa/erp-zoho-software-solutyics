// "use client"

import CreatePurchaseRequestsForm from "@/components/dashboard/CreatePurchaseRequestsForm";
import FormHeader from "@/components/dashboard/FormHeader";
import { getData } from "@/lib/getData";


const NewPurchaseRequest = async ({ initialData = {}, isUpdate = false }) => {
  const TAG = "NewPurchaseRequest.js"

  const categoriesData = getData("categories");
  const unitsData = getData("units");
  const brandsData = getData("brands");
  const warehousesData = getData("warehouse");
  // const suppliersData = getData("suppliers");

  


  // instead of this we use 
  // PARALLEL FETCHING is more faster and did't block the code
  // 2- 
  // suppliersData
  const [categories, units, brands, warehouses, suppliers] = await Promise.all([
    categoriesData, unitsData, brandsData, warehousesData, 
  ])



  return (
    <div>

      {/* Header */}
      <FormHeader title={isUpdate ? "Update Existing Purchase Request" : "Create New Purchase Request"} href={"/dashboard/inventory/purchase-requests"} />

      {/* Form */}
      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700
      mx-auto my-3">


        {/* Now remove this form code after creating CreatingForm.jsx component */}

        <CreatePurchaseRequestsForm categories={categories} units={units} brands={brands} warehouses={warehouses}  initialData ={initialData} isUpdate = {isUpdate}/>
        {/* suppliers={suppliers} */}

        
      </div>

    </div>
  )
}

export default NewPurchaseRequest;