import DataTableInvoices from "@/components/dashboard/DataTableInvoices";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const CustomerInvoices = async () => {
    const invoices = await getData("sales/invoices");
    const columns = ["invoiceNumber", "invoiceDate", "dueDate", "status", "customer.name", "total"];

    return (
        <div>
            {/* Fixed Header */}
            <FixedHeader title="Customer Invoices" newLink="/dashboard/sales/invoices/new" />
            {/* Table */}
            <div className="my-4 p-8">
                <DataTableInvoices
                    data={invoices}
                    columns={columns}
                    resourceTitle="sales/invoices"
                />
            </div>
        </div>
    )
}

export default CustomerInvoices;