import DataTableMaterialRequirementForm from "@/components/dashboard/DataTableMaterialRequirementForm";
import FixedHeader from "@/components/dashboard/FixedHeader";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { getData } from "@/lib/getData";
import { Suspense } from "react";


const MaterialRequirementFormContent = async () => {
  const materialRequirements = await getData("inventory/material-requirement-form");
  const columns = [
    "department",
    "requestedBy",
    "requestDate",
    "status",
  ];

  return (

    <DataTableMaterialRequirementForm data={materialRequirements} columns={columns} resourceTitle={"inventory/material-requirement-form"} />

  )
}


const MaterialRequirementForm = () => {
  return (
    <div>
      <FixedHeader title="Material Requirement Form" newLink="/dashboard/inventory/material-requirement-form/new" />
      <div className="my-4 p-8 relative">
        <Suspense fallback={<LoadingSpinner message="Loading material requirement form, please wait..." />} >
          <MaterialRequirementFormContent />
        </Suspense>
      </div>
    </div>
  )
}

export default MaterialRequirementForm;