"use client"
import DataTableUser from "@/components/dashboard/DataTableUser";
import FixedHeader from "@/components/dashboard/FixedHeader";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

// async
const Users = () => {
  // const users = await getData("user");
  const columns = ["SrNo", "email", "role", "name", "companyName"];
  // "phoneNumber", "address" 
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  async function fetchData() {
    setLoading(true);
    try {
      const data = await getData("user");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {

    fetchData();
  }, []);


  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Users" newLink="/dashboard/inventory/users/new" />
      {/* I need a Table that show all the units */}
      {/* Table */}
      <div className="my-4 p-8 relative">
        {loading ? <LoadingSpinner message="Loading users data, please wait..." /> : null}
        <DataTableUser data={users} columns={columns} resourceTitle="users" />
      </div>
    </div>
  )
}
export default Users;