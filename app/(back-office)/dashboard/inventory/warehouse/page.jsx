import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const Warehouse = async () => {
  const warehouses = await getData("inventory/warehouse");
  const columns = ["title", "location", "warehouseType", "stockQty", "description"];
  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Warehouses" newLink="/dashboard/inventory/warehouse/new" />
      {/* I need a Table that show all the units */}
      {/* Table */}
      <div className="my-4 p-8">
        <DataTable data={warehouses} columns={columns} resourceTitle="warehouse" />
      </div>
    </div>
  )
}
export default Warehouse;