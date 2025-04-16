import DataTablePurchaseOrder from "@/components/dashboard/DataTablePurchaseOrder";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const PurchaseOrders = async () => {
  const purchasesOrder = await getData("purchase-orders");
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
          <DataTablePurchaseOrder data={purchasesOrder} columns={columns} resourceTitle="purchase-orders" />
        </div>
      </div>
      <div>
        {/* Fixed Header */}
        <FixedHeader title="Request-Based Purchase Order Management" newLink="/dashboard/inventory/purchase-orders/new" />
        {/* I need a Table that show all the items */}
        {/* Table */}
        <div className="my-4 p-8">
          <DataTablePurchaseOrder data={purchasesOrder} columns={columns} resourceTitle="purchase-orders" />
        </div>
      </div>
    </>
  )
}
export default PurchaseOrders;