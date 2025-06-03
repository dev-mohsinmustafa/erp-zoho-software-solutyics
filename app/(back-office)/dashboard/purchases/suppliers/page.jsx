import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const Suppliers = async () => {
  const suppliersData = getData("inventory/suppliers");
  const columns = ["title", "phone", "email"];
  // how do i get an array with objects with only the keys title and description 
  // const data = suppliers.map((obj) => {
  //   return {
  //     title: obj.title,
  //     phone: obj.phone,
  //     email: obj.email,
  //   };
  // })
  const [suppliers,] = await Promise.all([suppliersData,]);

  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Suppliers" newLink="/dashboard/inventory/suppliers/new" />
      {/* I need a Table that show all the suppliers */}
      {/* Table */}
      <div className="my-4 p-8">
        <DataTable data={suppliers} columns={columns} resourceTitle={"inventory/suppliers"} />
      </div>

    </div>
  )
}
export default Suppliers;