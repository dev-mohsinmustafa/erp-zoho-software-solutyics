import { getData } from "@/lib/getData";
import NewPurchaseRequest from "../../new/page";

const UpdatePurchaseRequest = async ({ params: { id } }) => {
    const TAG = "UpdatePurchaseRequest.js"
    const data = await getData(`inventory/purchase-requests/${id}`);
    console.log(TAG, "data", data);

    return (
        <NewPurchaseRequest initialData={data} isUpdate={true} />
    )
}

export default UpdatePurchaseRequest;