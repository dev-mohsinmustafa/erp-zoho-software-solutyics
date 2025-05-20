import { getData } from "@/lib/getData";
import NewUser from "../../new/page";

const UpdateUser = async ({ params: { id } }) => {
    const TAG = "UpdateUser.js"
    const data = await getData(`user/${id}`);
    console.log(TAG, "data", data);

    return (
        <NewUser initialData={data} isUpdate={true} />
    )
}

export default UpdateUser;