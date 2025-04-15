import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const Units = async () => {
  const units = await getData("units");
  const columns = ["title", "abbreviation", ];
  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Units" newLink="/dashboard/inventory/units/new" />
      {/* I need a Table that show all the units */}
      {/* Table */}
      <div className="my-4 p-8">
        <DataTable data={units} columns={columns} resourceTitle="units"/>
      </div>
    </div>
  )
}
export default Units;