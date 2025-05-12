"use client";


import RoleGuard from "@/app/roleGuard/RoleGuard";
import DataTablePurchaseRequestApproval from "@/components/dashboard/DataTablePurchaseRequestApproval";
import DataTablePurchaseRequestApproved from "@/components/dashboard/DataTablePurchaseRequestApproved";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

const ApprovalRequests = () => {
  // const purchaseRequestData =  getData("purchase-requests");
  const columns = ["requestedBy", "requestDate", "purchaseOrder", "reference", "description", "status"];
  // "category.title", "warehouse.title", "quantity",
  // const approvalRequestsData =  getData("approval-requests");
  const columnsApprovalRequests = [
    "purchaseRequest.requestedBy",
    "purchaseRequest.requestDate",
    // "purchaseRequest.supplier.title",
    "approvedBy.name",
    "status",
    "remarks",
    "createdAt"
  ];

  // const [purchaseRequests, approvalRequests] = await Promise.all([purchaseRequestData, approvalRequestsData]);
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [purchaseData, approvalData] = await Promise.all([
        getData("purchase-requests"),
        getData("approval-requests")
      ]);
      setPurchaseRequests(purchaseData);
      setApprovalRequests(approvalData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = () => {
    fetchData(); // Refresh both tables when status is updated
  };



  return (
    <RoleGuard allowedRoles={["admin"]}>

      <div>
        {/* Fixed Header */}
        <FixedHeader title="Purchase Request Approval Management" newLink="/dashboard/inventory/purchase-requests/new" />
        {/* I need a Table that show all the items */}
        {/* Table */}
        <div className="px-8">
          <h2 className="pt-4 text-xl font-semibold">Pending Approval Requests</h2>
        </div>
        <div className="my-4 p-8 relative">
          {loading ? (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center z-50">
              <img
                src="/navLogo.png"
                alt="Solutyics Logo"
                className="w-16 h-16 mb-4"
              />
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-violetRed mt-2"></div>
              <p className="text-violetRed font-semibold mt-4">Loading pending requests, please wait...</p>
            </div>
          ) : null}
          <DataTablePurchaseRequestApproval data={purchaseRequests} columns={columns} resourceTitle="purchase-requests" onStatusUpdate={handleStatusUpdate}
          />
        </div>
        <div className="px-8">
          <h2 className="pt-4 text-xl font-semibold">Show Approved Requests </h2>
        </div>
        <div className="my-4 p-8 relative">
          {loading ? (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center z-50">
              <img
                src="/navLogo.png"
                alt="Solutyics Logo"
                className="w-16 h-16 mb-4"
              />
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-violetRed mt-2"></div>
              <p className="text-violetRed font-semibold mt-4">Loading approved requests, please wait...</p>
            </div>
          ) : null}
          <DataTablePurchaseRequestApproved data={approvalRequests} columns={columnsApprovalRequests} resourceTitle="approval-requests" />
        </div>
      </div>
    </RoleGuard>

  )
}
export default ApprovalRequests;