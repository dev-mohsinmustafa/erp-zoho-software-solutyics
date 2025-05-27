import DataTableTaxes from "@/components/dashboard/DataTableTaxes";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const Taxes = async () => {
    const taxes = await getData("banking/taxes");
    const columns = ["title", "rate", "type", "description", "isDefault", "createdAt", "updatedAt"];

    return (
        <div>
            {/* Fixed Header */}
            <FixedHeader title="Taxes" newLink="/dashboard/banking/taxes/new" />

            {/* Table */}
            <div className="my-4 p-8">
                <DataTableTaxes data={taxes} columns={columns} resourceTitle="banking/taxes" />
            </div>
        </div>
    )
}

export default Taxes;