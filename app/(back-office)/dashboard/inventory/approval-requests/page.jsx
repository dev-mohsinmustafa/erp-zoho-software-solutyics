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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <RoleGuard allowedRoles={["admin"]}>

      <div>
        {/* Fixed Header */}
        <FixedHeader title="Purchase Request Approval Management" newLink="/dashboard/inventory/approval-requests/new" />
        {/* I need a Table that show all the items */}
        {/* Table */}
        <div className="my-4 p-8">
          <h2 className="py-4 text-xl font-semibold">Pending Approval Requests</h2>
          <DataTablePurchaseRequestApproval data={purchaseRequests} columns={columns} resourceTitle="purchase-requests" onStatusUpdate={handleStatusUpdate}
          />
        </div>

        <div className="my-4 p-8">
          <h2 className="py-4 text-xl font-semibold">Show Approved Requests</h2>
          <DataTablePurchaseRequestApproved data={approvalRequests} columns={columnsApprovalRequests} resourceTitle="approval-requests" />
        </div>
      </div>
    </RoleGuard>

  )
}
export default ApprovalRequests;