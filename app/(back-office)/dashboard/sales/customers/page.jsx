import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const Customers = async () => {
    const customersData = getData("sales/customers");
    const columns = ["customerCode", "name", "phone", "email", "address", "status"];

    const customerTypes = [
        { id: "INDIVIDUAL", name: "Individual" },
        { id: "COMPANY", name: "Company" }
    ];

    const customerStatus = [
        { id: "ACTIVE", name: "Active" },
        { id: "INACTIVE", name: "Inactive" }
    ];

    const [customers] = await Promise.all([customersData]);

    return (
        <div>
            <FixedHeader title="Customers" newLink="/dashboard/sales/customers/new" />
            <div className="my-4 p-8">
                <DataTable
                    data={customers}
                    columns={columns}
                    resourceTitle={"sales/customers"}
                    statusOptions={customerStatus}
                    typeOptions={customerTypes}
                />
            </div>
        </div>
    )
}
export default Customers;