"use client";

import DataTableMaterialRequirementApprovalForm from "@/components/dashboard/DataTableMaterialRequirementApprovalForm";
import DataTableMaterialRequirementApprovedForm from "@/components/dashboard/DataTableMaterialRequirementApprovedForm";
import FixedHeader from "@/components/dashboard/FixedHeader";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

const MaterialRequirementApproval = () => {
    const columns = [
        "requestDate",
        "requestedBy",
        "department",
        "item.title",
        "quantity",
        "unit.title",
        "status",
    ];

    const columnsApprovedRequests = [
        "materialRequirement.requestedBy",
        "materialRequirement.requestDate",
        "approvedBy.name",
        "status",
        "remarks",
        "createdAt"
    ];

    const [materialRequirements, setMaterialRequirements] = useState([]);
    const [approvedRequirements, setApprovedRequirements] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [requirementsData, approvalData] = await Promise.all([
                getData("material-requirement-form"),
                getData("material-requirement-approval")
            ]);
            setMaterialRequirements(requirementsData);
            setApprovedRequirements(approvalData);
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
        fetchData(); // Refresh both tables when status changes
    };

    return (
        <div>
            <FixedHeader title="Material Requirement Approvals" newLink="/dashboard/inventory/material-requirement-form/new" />
            <div className="px-8">
                <h2 className="pt-4 text-xl font-semibold">Pending Material Requirements</h2>
            </div>
            <div className="my-4 p-8 relative">
                {loading ? (
                    <LoadingSpinner message="Loading pending requirements, please wait..." />
                ) : (
                    <DataTableMaterialRequirementApprovalForm
                        data={materialRequirements}
                        columns={columns}
                        resourceTitle="material-requirement-form"
                        onStatusUpdate={handleStatusUpdate}
                    />
                )}
            </div>
            <div className="px-8">
                <h2 className="pt-4 text-xl font-semibold">Approved Material Requirements</h2>
            </div>
            <div className="my-4 p-8 relative">
                {loading ? (
                    <LoadingSpinner message="Loading approved requirements, please wait..." />
                ) : (
                    <DataTableMaterialRequirementApprovedForm
                        data={approvedRequirements}
                        columns={columnsApprovedRequests}
                        resourceTitle="material-requirement-approval"
                    />
                )}
            </div>
        </div>
    );
};

export default MaterialRequirementApproval;