import { getData } from "@/lib/getData";
import NewCustomer from "../../new/page";

const UpdateCustomer = async ({ params: { id } }) => {
    const data = await getData(`sales/customers/${id}`);

    return (
        <NewCustomer initialData={data} isUpdate={true} />
    )
}

export default UpdateCustomer;