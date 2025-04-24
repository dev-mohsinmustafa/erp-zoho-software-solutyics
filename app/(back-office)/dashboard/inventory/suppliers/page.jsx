import DataTable from "@/components/dashboard/DataTable";
import DataTableRequestBasedPurchaseOrder from "@/components/dashboard/DataTableRequestBasedPurchaseOrder";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const Suppliers = async () => {
  const suppliersData = getData("suppliers");
  const columns = ["title", "phone", "email"];
  // how do i get an array with objects with only the keys title and description 
  // const data = suppliers.map((obj) => {
  //   return {
  //     title: obj.title,
  //     phone: obj.phone,
  //     email: obj.email,
  //   };
  // })
  const purchaseOrdersRBData = getData("purchase-orders/request-based");
  const columnsPurchaseOrderRB = ["orderBy", "orderDate", "purchaseReceive", "purchaseOrder", "supplier.title", "orderStatus"];
  const [suppliers, purchaseOrdersRB,] = await Promise.all([suppliersData, purchaseOrdersRBData,]);

  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Suppliers" newLink="/dashboard/inventory/suppliers/new" />
      {/* I need a Table that show all the suppliers */}
      {/* Table */}
      <div className="my-4 p-8">
        <DataTable data={suppliers} columns={columns} resourceTitle={"suppliers"} />
      </div>
      <div className="my-4 p-8">
        <h2 className="py-4 text-xl font-semibold">Show All Purchase Orders </h2>
        <DataTableRequestBasedPurchaseOrder data={purchaseOrdersRB} columns={columnsPurchaseOrderRB} resourceTitle={"purchase-orders/request-based"} />
      </div>
    </div>
  )
}
export default Suppliers;