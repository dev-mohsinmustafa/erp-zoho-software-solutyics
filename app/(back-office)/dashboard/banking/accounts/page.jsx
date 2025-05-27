import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const Accounts = async () => {
    const accounts = await getData("banking/accounts");
    const columns = ["title", "createdAt", "updatedAt"];
    return (
        <div>
            {/* Fixed Header */}
            <FixedHeader title="Accounts" newLink="/dashboard/banking/accounts/new" />
            {/* I need a Table that show all the accounts */}
            {/* Table */}
            <div className="my-4 p-8">
                <DataTable data={accounts} columns={columns} resourceTitle="banking/accounts" />
            </div>
        </div>
    )
}
export default Accounts;