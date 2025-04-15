import { getData } from "@/lib/getData";
import NewUnit from "../../new/page";

const UpdateUnit = async({ params: { id } }) => {
    const TAG = "UpdateUnit.js"
    const data = await getData(`units/${id}`);
    console.log(TAG, "data", data);
     
    return (
        <NewUnit initialData={data} isUpdate={true}/>
    )
}

export default UpdateUnit;