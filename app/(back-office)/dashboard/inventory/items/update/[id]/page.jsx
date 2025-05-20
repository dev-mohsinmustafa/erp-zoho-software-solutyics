import { getData } from "@/lib/getData";
import NewItem from "../../new/page";

const UpdateItem = async ({ params: { id } }) => {
    const TAG = "UpdateItem.js"
    const data = await getData(`inventory/items/${id}`);
    console.log(TAG, "data", data);

    return (
        <NewItem initialData={data} isUpdate={true} />
    )
}

export default UpdateItem;