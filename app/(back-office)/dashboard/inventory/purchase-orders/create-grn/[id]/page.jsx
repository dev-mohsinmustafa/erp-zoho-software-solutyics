// import { getData } from "@/lib/getData";
// import FormHeader from "@/components/dashboard/FormHeader";

// const CreateGRNPage = async ({ params }) => {
//   const { id } = params;
//   const purchaseOrder = await getData(`purchase-orders/${id}`);

//   return (
//     <div>
//       <FormHeader 
//         title="Create Goods Received Note (GRN)" 
//         href="/dashboard/inventory/purchase-orders"
//       />

//       <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
//         <form className="space-y-6">
//           <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
//             {/* Purchase Order Details (Read-only) */}
//             <div className="sm:col-span-2">
//               <h3 className="text-lg font-semibold mb-4">Purchase Order Details</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Purchase Order #</label>
//                   <div className="mt-1 p-2 bg-gray-50 rounded-md">{purchaseOrder.purchaseOrder}</div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Order Date</label>
//                   <div className="mt-1 p-2 bg-gray-50 rounded-md">
//                     {new Date(purchaseOrder.orderDate).toLocaleDateString()}
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Supplier</label>
//                   <div className="mt-1 p-2 bg-gray-50 rounded-md">{purchaseOrder.supplier.title}</div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Status</label>
//                   <div className="mt-1 p-2 bg-gray-50 rounded-md capitalize">{purchaseOrder.orderStatus}</div>
//                 </div>
//               </div>
//             </div>

//             {/* GRN Form Fields */}
//             <div className="sm:col-span-2">
//               <h3 className="text-lg font-semibold mb-4">GRN Details</h3>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">GRN Number</label>
//               <input
//                 type="text"
//                 name="grnNumber"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Received Date</label>
//               <input
//                 type="date"
//                 name="receivedDate"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Received By</label>
//               <input
//                 type="text"
//                 name="receivedBy"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 required
//               />
//             </div>

//             <div className="sm:col-span-2">
//               <label className="block text-sm font-medium text-gray-700">Remarks</label>
//               <textarea
//                 name="remarks"
//                 rows={4}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//               Create GRN
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateGRNPage;




// "use client"

import CreateGoodsReceivedForm from "@/components/dashboard/CreateGoodsReceivedForm";
import FormHeader from "@/components/dashboard/FormHeader";
import { getData } from "@/lib/getData";


const CreateGRNPage = async ({ params, initialData = {}, isUpdate = false }) => {
  const TAG = "CreateGRNPage.js"

  const { id } = params;
  // const purchaseOrder = await getData(`purchase-orders/${id}`);
  const purchaseOrderDataId = getData(`inventory/purchase-orders/${id}`);

  const categoriesData = getData("inventory/categories");
  const unitsData = getData("inventory/units");
  const brandsData = getData("inventory/brands");
  const warehousesData = getData("inventory/warehouse");
  const suppliersData = getData("inventory/suppliers");
  const purchaseRequestsData = getData("inventory/purchase-requests");
  const purchaseOrdersData = getData("inventory/purchase-orders");




  // instead of this we use 
  // PARALLEL FETCHING is more faster and did't block the code
  // 2- 
  const [categories, units, brands, warehouses, suppliers, purchaseRequests, purchaseOrders, purchaseOrdersId] = await Promise.all([
    categoriesData, unitsData, brandsData, warehousesData, suppliersData, purchaseRequestsData, purchaseOrdersData, purchaseOrderDataId
  ])


  // console.log("Fetched Purchase Requests Data:", purchaseRequests); 
  // console.log("Fetched Purchase Orders Data:", purchaseOrders); 
  console.log("Fetched Purchase Orders Data Id:", purchaseOrdersId);


  return (
    <div>

      {/* Header */}
      <FormHeader title={isUpdate ? "Update Existing Goods Received Note (GRN)" : "Create New Goods Received Note (GRN)"} href={"/dashboard/inventory/goods-received"} />

      {/* Form */}
      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700
      mx-auto my-3">


        {/* Now remove this form code after creating CreatingForm.jsx component */}
        <CreateGoodsReceivedForm categories={categories} units={units} brands={brands} warehouses={warehouses} suppliers={suppliers} purchaseRequests={purchaseRequests} purchaseOrders={purchaseOrders} purchaseOrdersId={purchaseOrdersId} initialData={initialData} isUpdate={isUpdate} />
      </div>

    </div>
  )
}

export default CreateGRNPage;