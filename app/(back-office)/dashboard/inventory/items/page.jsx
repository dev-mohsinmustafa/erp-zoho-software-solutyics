import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const Items = async () => {
  const items = await getData("items");
  const columns = ["imageUrl", "title", "quantity", "category.title", "warehouse.title" ];
  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Items" newLink="/dashboard/inventory/items/new" />
      {/* I need a Table that show all the brands */}
      {/* Table */}
      <div className="my-4 p-8">
        <DataTable data={items} columns={columns} resourceTitle={"items"} />
      </div>
    </div>
  )
}
export default Items;