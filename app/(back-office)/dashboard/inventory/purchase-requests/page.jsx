import DataTablePurchaseRequest from "@/components/dashboard/DataTablePurchaseRequest";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const PurchaseRequests = async () => {
  const purchasesRequest = await getData("inventory/purchase-requests");
  const columns = ["requestedBy", "requestDate", "purchaseOrder", "reference", "description", "status"];
  // "category.title", "warehouse.title", "quantity",

  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Purchase Request Management" newLink="/dashboard/inventory/purchase-requests/new" />
      {/* I need a Table that show all the items */}
      {/* Table */}
      <div className="my-4 p-8">
        <DataTablePurchaseRequest data={purchasesRequest} columns={columns} resourceTitle="purchase-requests" />
      </div>
    </div>
  )
}
export default PurchaseRequests;