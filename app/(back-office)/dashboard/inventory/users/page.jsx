import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const Users = async () => {
  const users = await getData("user");
  const columns = ["email", "role", "name", "companyName"];
  // "phoneNumber", "address" 
  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Users" newLink="/dashboard/inventory/users/new" />
      {/* I need a Table that show all the units */}
      {/* Table */}
      <div className="my-4 p-8">
        <DataTable data={users} columns={columns} resourceTitle="users"/>
      </div>
    </div>
  )
}
export default Users;