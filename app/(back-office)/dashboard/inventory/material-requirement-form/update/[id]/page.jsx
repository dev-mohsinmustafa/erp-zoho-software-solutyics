import { getData } from "@/lib/getData";
import NewMaterialRequirement from "../../new/page";

const UpdateMaterialRequirement = async ({ params: { id } }) => {
    const data = await getData(`material-requirement-form/${id}`);
    return (
        <NewMaterialRequirement initialData={data} isUpdate={true} />
    )
}

export default UpdateMaterialRequirement;