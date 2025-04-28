import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const StockAdjustments = async () => {
//   const stockAdjustments = await getData("stock-adjustments");
  const columns = [
    "itemName",
    "warehouse",
    "currentStock",
    "adjustedStock",
    "adjustmentType",
    "date",
    "status"
  ];

  return (
    <div>
      <FixedHeader 
        title="Stock Adjustments" 
        newLink="/dashboard/inventory/stock-adjustments/new" 
      />
      
      <div className="my-4 p-8">
        <DataTable 
        //   data={stockAdjustments} 
          columns={columns} 
          resourceTitle={"stock-adjustments"} 
        />
      </div>
    </div>
  );
};

export default StockAdjustments;