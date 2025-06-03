import { getData } from "@/lib/getData";
import NewSupplier from "../../new/page";

const UpdateSupplier = async ({ params: { id } }) => {
    const TAG = "UpdateSupplier.js"
    const data = await getData(`inventory/suppliers/${id}`);
    console.log(TAG, "data", data);

    return (
        <NewSupplier initialData={data} isUpdate={true} />
    )
}

export default UpdateSupplier;