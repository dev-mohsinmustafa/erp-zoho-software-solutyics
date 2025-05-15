import { getData } from "@/lib/getData";
import NewMaterialRequest from "../../new/page";

const UpdateMaterialRequest = async ({ params: { id } }) => {
    const TAG = "UpdateMaterialRequest.js"
    const data = await getData(`material-request-form/${id}`);
    console.log(TAG, "data", data);

    return (
        <NewMaterialRequest initialData={data} isUpdate={true} />
    )
}

export default UpdateMaterialRequest;