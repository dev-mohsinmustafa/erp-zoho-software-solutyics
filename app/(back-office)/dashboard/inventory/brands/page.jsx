import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const Brands = async () => {
  const brands = await getData("inventory/brands");
  const columns = ["title", "createdAt", "updatedAt"];
  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Brands" newLink="/dashboard/inventory/brands/new" />
      {/* I need a Table that show all the brands */}
      {/* Table */}
      <div className="my-4 p-8">
        <DataTable data={brands} columns={columns} resourceTitle="inventory/brands" />
      </div>
    </div>
  )
}
export default Brands;