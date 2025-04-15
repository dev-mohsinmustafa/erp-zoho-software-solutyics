import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const Adjustments = async () => {
  // const addStockAdjustments = await getData("adjustments/add");
  // const transferStockAdjustments = await getData("adjustments/transfer");
  const addStockAdjustmentsData = getData("adjustments/add");
  const transferStockAdjustmentsData = getData("adjustments/transfer");
  // now these can load faster
  const [addStockAdjustments, transferStockAdjustments] = await Promise.all([addStockAdjustmentsData, transferStockAdjustmentsData])
  // Log the results to check data
  // console.log("✅ addStockAdjustments:", addStockAdjustments);
  // console.log("✅ transferStockAdjustments:", transferStockAdjustments);

  const columnsAddStockAdjustments = ["addStockQty", "referenceNumber", "receivingWarehouseId", "createdAt"];
  const columnsTransferStockAdjustments = ["transferStockQty", "receivingWarehouseId", "givingWarehouseId", "createdAt"];
  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Adjustments" newLink="/dashboard/inventory/adjustments/new" />
      {/* I need a Table that show all the adjustments */}
      {/* Table */}
      <div className="my-4 p-8">
        <h2 className="py-4 text-xl font-semibold">Stock Increments Adjustments</h2>
        <DataTable data={addStockAdjustments} columns={columnsAddStockAdjustments} resourceTitle={"adjustments/add"} />
      </div>
      <div className="my-4 p-8">
        <h2 className="py-4 text-xl font-semibold">Stock Transfer Adjustments</h2>
        <DataTable data={transferStockAdjustments} columns={columnsTransferStockAdjustments} resourceTitle={"adjustments/transfer"} />
      </div>
    </div>
  )
}
export default Adjustments;