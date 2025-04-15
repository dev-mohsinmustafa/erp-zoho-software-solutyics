import DataTable from "@/components/dashboard/DataTable";
import { getData } from "@/lib/getData";



const CurrentStock = async ({title,items}) => {
    // const items = await getData("items");
    // const columns = ["imageUrl", "title", "quantity", "category.title", "warehouse.title"];
    const columns = ["imageUrl", "title", "quantity"];
    return (
        <div className="bg-pink-50 p-8">
            <h2 className="text-xl  font-semibold mb-3">{title}</h2>
            {/* Table */}
            <div className="my-4 ">
                <DataTable data={items} columns={columns} resourceTitle={"items"} />
            </div>
        </div>
    )
}
export default CurrentStock;