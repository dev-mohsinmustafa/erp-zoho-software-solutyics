import DataTablePurchaseOrder from "@/components/dashboard/DataTablePurchaseOrder";
// import DataTableRequestBasedPurchaseOrder from "@/components/dashboard/DataTableRequestBasedPurchaseOrder";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
import RequestBasedPurchaseOrders from "./request-based/page";

const PurchaseOrders = async () => {
  const purchasesOrder = await getData("inventory/purchase-orders");
  const columns = ["orderBy", "orderDate", "purchaseReceive", "purchaseOrder", "supplier.title", "orderStatus"];
  // "category.title", "warehouse.title", "quantity", "description"

  return (
    <>
      <div>
        {/* Fixed Header */}
        <FixedHeader title="Manual Purchase Order Management" newLink="/dashboard/inventory/purchase-orders/new" />
        {/* I need a Table that show all the items */}
        {/* Table */}
        <div className="my-4 p-8">
          <DataTablePurchaseOrder data={purchasesOrder} columns={columns} resourceTitle="inventory/purchase-orders" />
        </div>
      </div>
      <RequestBasedPurchaseOrders />
      {/* <div>
        <FixedHeader title="Request-Based Purchase Order Management" newLink="/dashboard/inventory/purchase-orders/request-based/new" />
        <div className="my-4 p-8">
          <DataTableRequestBasedPurchaseOrder data={purchasesOrder} columns={columns} resourceTitle="purchase-orders/request-based" />
        </div>
      </div> */}
    </>
  )
}
export default PurchaseOrders;