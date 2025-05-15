import DataTableMRF from "@/components/dashboard/DataTableMRF";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const MaterialRequestForm = async () => {
  const materialRequests = await getData("material-request-form");
  const columns = [
    // "mrfNo",
    "department",
    "requestedBy",
    "requestDate",
    "status",
  ];

  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Material Request Form (MRF)" newLink="/dashboard/inventory/material-request-form/new" />
      {/* Table */}
      <div className="my-4 p-8">
        <DataTableMRF data={materialRequests} columns={columns} resourceTitle={"material-request-form"} />
      </div>

    </div>
  )
}
export default MaterialRequestForm;