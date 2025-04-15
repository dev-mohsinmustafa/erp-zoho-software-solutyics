import { getData } from "@/lib/getData";
import NewWarehouse from "../../new/page";

const UpdateWarehouse = async({ params: { id } }) => {
    const TAG = "UpdateWarehouse.js"
    const data = await getData(`warehouse/${id}`);
    console.log(TAG, "data", data);
     
    return (
        <NewWarehouse initialData={data} isUpdate={true}/>
    )
}

export default UpdateWarehouse;