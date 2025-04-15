import { getData } from "@/lib/getData";
import NewCategory from "../../new/page";

const UpdateCategory = async({ params: { id } }) => {
    const TAG = "UpdateCategory.js"
    const data = await getData(`categories/${id}`);
    console.log(TAG, "data",data);
     
    return (
        <NewCategory initialData={data} isUpdate={true}/>
    )
}

export default UpdateCategory;