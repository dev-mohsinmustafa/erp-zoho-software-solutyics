import { getData } from "@/lib/getData";
import NewBrand from "../../new/page";

const UpdateBrand = async({ params: { id } }) => {
    const TAG = "UpdateBrand.js"
    const data = await getData(`brands/${id}`);
    console.log(TAG, "data",data);
     
    return (
        <NewBrand initialData={data} isUpdate={true}/>
    )
}

export default UpdateBrand;