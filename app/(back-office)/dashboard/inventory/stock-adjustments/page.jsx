import DataTableStockAdjustment from "@/components/dashboard/DataTableStockAdjustment";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const StockAdjustments = async () => {
//   const stockAdjustments = await getData("stock-adjustments");
//   const columns = [
//     "itemName",
//     "warehouse",
//     "currentStock",
//     "adjustedStock",
//     "adjustmentType",
//     "date",
//     "status"
//   ];
const stockAdjustments = await getData("items");
const columns = ["imageUrl", "title", "quantity", "category.title", "warehouse.title" ];

  return (
    <div>
      <FixedHeader 
        title="Stock Adjustments" 
        newLink="/dashboard/inventory/stock-adjustments/new" 
      />
      
      <div className="my-4 p-8">
        <DataTableStockAdjustment
          data={stockAdjustments} 
          columns={columns} 
          resourceTitle={"stock-adjustments"} 
        />
      </div>
    </div>
  );
};

export default StockAdjustments;