import { getData } from "@/lib/getData";
import NewProduct from "../../new/page";

const UpdateProduct = async ({ params: { id } }) => {

    const TAG = "UpdateProduct.js"
    const data = await getData(`inventory/products/${id}`);
    console.log(TAG, "data", data);

    return (
        <NewProduct initialData={data} isUpdate={true} />
    )
}

export default UpdateProduct;