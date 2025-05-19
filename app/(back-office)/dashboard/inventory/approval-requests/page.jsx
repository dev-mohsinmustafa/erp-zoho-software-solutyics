"use client";


import RoleGuard from "@/app/roleGuard/RoleGuard";
import DataTablePurchaseRequestApproval from "@/components/dashboard/DataTablePurchaseRequestApproval";
import DataTablePurchaseRequestApproved from "@/components/dashboard/DataTablePurchaseRequestApproved";
import FixedHeader from "@/components/dashboard/FixedHeader";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

const ApprovalRequests = () => {
  // const purchaseRequestData =  getData("inventory/purchase-requests");
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
        getData("inventory/purchase-requests"),
        getData("inventory/approval-requests")
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
          {loading ? <LoadingSpinner message="Loading pending requests, please wait..." /> : null}
          <DataTablePurchaseRequestApproval data={purchaseRequests} columns={columns} resourceTitle="purchase-requests" onStatusUpdate={handleStatusUpdate}
          />
        </div>
        <div className="px-8">
          <h2 className="pt-4 text-xl font-semibold">Show Approved Requests </h2>
        </div>
        <div className="my-4 p-8 relative">
          {loading ? <LoadingSpinner message="Loading approved requests, please wait..." /> : null}
          <DataTablePurchaseRequestApproved data={approvalRequests} columns={columnsApprovalRequests} resourceTitle="approval-requests" />
        </div>
      </div>
    </RoleGuard>

  )
}
export default ApprovalRequests;