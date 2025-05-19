import CreateMaterialRequirementForm from "@/components/dashboard/CreateMaterialRequirementForm";
import FormHeader from "@/components/dashboard/FormHeader";
import { getData } from "@/lib/getData";

const NewMaterialRequirement = async ({ initialData = {}, isUpdate = false }) => {

    const itemsData = getData("inventory/items");
    const unitsData = getData("inventory/units");
    const [items, units] = await Promise.all([itemsData, unitsData])
    return (
        <div>
            <FormHeader
                title={isUpdate ? "Update Material Requirement" : "New Material Requirement Form"}
                href="/dashboard/inventory/material-requirement-form"
            />

            <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <CreateMaterialRequirementForm
                    initialData={initialData}
                    isUpdate={isUpdate}
                    items={items}
                    units={units}
                />
            </div>
        </div>
    );
};

export default NewMaterialRequirement;