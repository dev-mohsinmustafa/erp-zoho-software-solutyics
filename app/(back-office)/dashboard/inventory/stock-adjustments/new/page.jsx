
import CreateStockAdjustmentForm from "@/components/dashboard/CreateStockAdjustmentForm";
import FormHeader from "@/components/dashboard/FormHeader";
import { getData } from "@/lib/getData";

const NewStockAdjustment = async ({ initialData = {}, isUpdate = false }) => {
  const TAG = "NewStockAdjustment.js"

  const itemsData = getData("inventory/items");
  const warehousesData = getData("inventory/warehouse");


  // Parallel fetching
  const [items, warehouses,] = await Promise.all([
    itemsData, warehousesData
  ]);

  return (
    <div>
      <FormHeader
        title={isUpdate ? "Update Stock Adjustment" : "Create New Stock Adjustment"}
        href={"/dashboard/inventory/stock-adjustments"}
      />

      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
        <CreateStockAdjustmentForm
          items={items}
          warehouses={warehouses}
          initialData={initialData}
          isUpdate={isUpdate}
        />
      </div>
    </div>
  );
};

export default NewStockAdjustment;