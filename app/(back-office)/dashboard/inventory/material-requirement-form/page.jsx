import DataTableMaterialRequirementForm from "@/components/dashboard/DataTableMaterialRequirementForm";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const MaterialRequirementForm = async () => {
  const materialRequirements = await getData("material-requirement-form");
  const columns = [
    "department",
    "requestedBy",
    "requestDate",
    "status",
  ];

  return (
    <div>
      <FixedHeader title="Material Requirement Form" newLink="/dashboard/inventory/material-requirement-form/new" />
      <div className="my-4 p-8">
        <DataTableMaterialRequirementForm data={materialRequirements} columns={columns} resourceTitle={"material-requirement-form"} />
      </div>
    </div>
  )
}
export default MaterialRequirementForm;