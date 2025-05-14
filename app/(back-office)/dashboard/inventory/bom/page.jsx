import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const BOMList = async () => {
    const boms = await getData("boms");
    const columns = [
        "bomNo",
        "productName",
        "version",
        "createdBy",
        "createdDate",
        "status"
    ];

    return (
        <div>
            <FixedHeader title="Bill of Materials (BOM)" newLink="/dashboard/inventory/bom/new" />
            <div className="my-4 p-8">
                {/* <DataTable data={boms} columns={columns} resourceTitle={"boms"} /> */}
            </div>
        </div>
    )
}
export default BOMList;