// "use client"

import CreatePurchaseOrdersForm from "@/components/dashboard/CreatePurchaseOrdersForm";
import FormHeader from "@/components/dashboard/FormHeader";
import { getData } from "@/lib/getData";


const NewPurchaseOrder = async ({ initialData = {}, isUpdate = false }) => {
  const TAG = "NewPurchaseOrder.js"

  const categoriesData = getData("categories");
  const unitsData = getData("units");
  const brandsData = getData("brands");
  const warehousesData = getData("warehouse");
  const suppliersData = getData("suppliers");
  const purchaseRequestsData = getData("purchase-requests");




  // instead of this we use 
  // PARALLEL FETCHING is more faster and did't block the code
  // 2- 
  const [categories, units, brands, warehouses, suppliers, purchaseRequests] = await Promise.all([
    categoriesData, unitsData, brandsData, warehousesData, suppliersData, purchaseRequestsData
  ])


  // console.log("Fetched Purchase Requests Data:", purchaseRequests); 


  return (
    <div>

      {/* Header */}
      <FormHeader title={isUpdate ? "Update Existing Purchase Order" : "Create New Purchase Order"} href={"/dashboard/inventory/purchase-orders"} />

      {/* Form */}
      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700
      mx-auto my-3">

        <h2 className="py-4 text-xl font-semibold">Approval Request</h2>

        {/* Now remove this form code after creating CreatingForm.jsx component */}
        <CreatePurchaseOrdersForm categories={categories} units={units} brands={brands} warehouses={warehouses} suppliers={suppliers}  purchaseRequests={purchaseRequests} initialData={initialData} isUpdate={isUpdate} />
      </div>

    </div>
  )
}

export default NewPurchaseOrder;