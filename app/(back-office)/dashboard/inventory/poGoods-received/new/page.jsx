// "use client"

import CreateGoodsReceivedFormRequestBasedPurchaseOrder from "@/components/dashboard/CreatePOGoodsReceivedFormRequestBasedPurchaseOrder";
import FormHeader from "@/components/dashboard/FormHeader";
import { getData } from "@/lib/getData";


const NewPOGoodsReceived = async ({ initialData = {}, isUpdate = false }) => {
  const TAG = "NewPOGoodsReceived.js"



  const categoriesData = getData("categories");
  const unitsData = getData("units");
  const brandsData = getData("brands");
  const warehousesData = getData("warehouse");
  const suppliersData = getData("suppliers");
  const purchaseOrdersRequestBasedData = getData("purchase-orders/request-based");



  // instead of this we use 
  // PARALLEL FETCHING is more faster and did't block the code
  // 2- 
  const [categories, units, brands, warehouses, suppliers, purchaseOrderRB] = await Promise.all([
    categoriesData, unitsData, brandsData, warehousesData, suppliersData, purchaseOrdersRequestBasedData])


  // console.log("Fetched Purchase Requests Data:", purchaseRequests); 
  // console.log("Fetched Purchase Orders Data:", purchaseOrders); 


  return (
    <div>

      {/* Header */}
      <FormHeader title={isUpdate ? "Update Existing Goods Received Note (GRN)" : "Create New Goods Received Note (GRN)"} href={"/dashboard/inventory/poGoods-received"} />

      {/* Form */}
      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700
      mx-auto my-3">


        {/* Now remove this form code after creating CreatingForm.jsx component */}
        <CreateGoodsReceivedFormRequestBasedPurchaseOrder categories={categories} units={units} brands={brands} warehouses={warehouses} suppliers={suppliers} purchaseOrderRB={purchaseOrderRB} initialData={initialData} isUpdate={isUpdate} />
      </div>

    </div>
  )
}

export default NewPOGoodsReceived;