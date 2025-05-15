"use client";

import DataTableMaterialRequirementApprovalForm from "@/components/dashboard/DataTableMaterialRequirementApprovalForm";
import FixedHeader from "@/components/dashboard/FixedHeader";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

const MaterialRequirementApproval = () => {
    const [materialRequirements, setMaterialRequirements] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        "requestDate",
        "requestedBy",
        "department",
        "item.title",
        "quantity",
        "unit.title",
        "status",
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getData("material-requirement-form");
            setMaterialRequirements(data);
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
        fetchData(); // Refresh data when status changes
    };

    return (
        <div>
            <FixedHeader title="Material Requirement Approvals" newLink="/dashboard/inventory/material-requirement-form/new" />
            <div className="my-4 p-8 relative">
                {loading ? (
                    <LoadingSpinner message="Loading material requirements approval, please wait..." />
                ) : (
                    <DataTableMaterialRequirementApprovalForm
                        data={materialRequirements}
                        columns={columns}
                        resourceTitle="material-requirement-form"
                        onStatusUpdate={handleStatusUpdate}
                    />
                )}
            </div>
        </div>
    );
};

export default MaterialRequirementApproval;