import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const MaterialRequestForm = async () => {
  const materialRequests = await getData("material-requests");
  const columns = [
    "mrfNo",
    "department",
    "requestedBy",
    "requestDate",
    "status",
    "priority"
  ];

  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Material Request Form (MRF)" newLink="/dashboard/inventory/material-request-form/new" />
      {/* Table */}
      <div className="my-4 p-8">
        {/* <DataTable data={materialRequests} columns={columns} resourceTitle={"material-requests"} /> */}
      </div>

    </div>
  )
}
export default MaterialRequestForm;