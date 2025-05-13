"use client"
import DataTableUser from "@/components/dashboard/DataTableUser";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

// async
const Users = () => {
  // const users = await getData("user");
  const columns = ["email", "role", "name", "companyName"];
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
        {loading ? (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <img
              src="/navLogo.png"
              alt="Solutyics Logo"
              className="w-16 h-16 mb-4"
            />
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-violetRed mt-2"></div>
            <p className="text-violetRed font-semibold mt-4">Loading users data, please wait...</p>
          </div>
        ) : null}
        <DataTableUser data={users} columns={columns} resourceTitle="users" />
      </div>
    </div>
  )
}
export default Users;