import { getData } from "@/lib/getData";
import NewStockAdjustment from "../../new/page";


const UpdateStockAdjustment = async({ params: { id } }) => {
    const TAG = "UpdateStockAdjustment.js"
    const data = await getData(`stock-adjustments/${id}`);
    console.log(TAG, "data", data);
     
    return (
        <NewStockAdjustment initialData={data} isUpdate={true}/>
    )
}

export default UpdateStockAdjustment;