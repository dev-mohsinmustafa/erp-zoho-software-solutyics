import DataTableRequestBasedPurchaseOrder from "@/components/dashboard/DataTableRequestBasedPurchaseOrder";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const RequestBasedPurchaseOrders =  async() => {
  const purchaseOrders = await getData("purchase-orders/request-based");
  const columns = ["orderBy", "orderDate", "purchaseReceive", "purchaseOrder", "supplier.title", "orderStatus"];




  return (
    <>
      <div>
        {/* Fixed Header */}
        <FixedHeader title="Request-Based Purchase Order Management" newLink="/dashboard/inventory/purchase-orders/request-based/new" />
        {/* I need a Table that show all the items */}
        {/* Table */}
        <div className="my-4 p-8">
          <DataTableRequestBasedPurchaseOrder data={purchaseOrders} columns={columns}  resourceTitle="purchase-orders/request-based" />
        </div>
      </div>
    </>
  )
}
export default RequestBasedPurchaseOrders;
