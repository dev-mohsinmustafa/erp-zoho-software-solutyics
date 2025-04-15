import { getData } from "@/lib/getData";
import NewSale from "../../new/page";

const UpdateSale = async({ params: { id } }) => {
    const TAG = "UpdateSale.js"
    const data = await getData(`sales/${id}`);
    console.log(TAG, "data", data);
     
    return (
        <NewSale initialData={data} isUpdate={true}/>
    )
}

export default UpdateSale;