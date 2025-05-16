"use client"
import { Eye, Pencil, } from "lucide-react"
import Link from "next/link"
import DeleteBtn from "./DeleteBtn"
import { memo, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react";

const DataTableMaterialRequirementApprovalForm = memo(({ data = [], columns = [], resourceTitle, onStatusUpdate }) => {
    const { data: session } = useSession();
    const [tableData, setTableData] = useState(data);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedId, setSelectedId] = useState(null);



    useEffect(() => {
        async function fetchPurchases() {
            setLoading(true);
            try {
                const response = await fetch("/api/material-requirement-form");
                console.log("STATUS CHANGE API", response);

                if (!response.ok) throw new Error("Failed to fetch data");

                const data = await response.json();
                setTableData(data);
            } catch (error) {
                console.error("Error fetching material requirement form:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPurchases();
    }, []);

    const statusOptions = [
        { id: "pending", title: "Pending" },
        { id: "approved", title: "Approved" },
        { id: "rejected", title: "Rejected" },
    ];

    const openModal = (id, newStatus) => {
        setSelectedId(id);
        setSelectedStatus(newStatus);
        setShowModal(true);
    };

    async function handleUpdateStatus() {
        if (!session?.user?.id) {
            alert("You must be logged in to approve requests");
            return;
        }

        setShowModal(false);
        setLoading(true);
        try {
            const response = await fetch(`/api/material-requirement-approval`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: selectedId,
                    status: selectedStatus,
                    remarks: `Status changed to ${selectedStatus}`,
                    approvedById: session.user.id
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update status");
            }

            onStatusUpdate?.();
            // alert(`Status successfully updated to ${selectedStatus}`);
        } catch (error) {
            console.error("Error updating status:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {
                data.length > 0 ? (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr >
                                <th scope="col" className="px-6 py-3">
                                    Sr. No
                                </th>
                                {
                                    columns.map((columnName, index) => {
                                        return (
                                            <th key={index} scope="col" className="px-6 py-3">
                                                {columnName}
                                            </th>
                                        )
                                    })
                                }
                                <th scope="col" className="px-6 py-3 min-w-[200px]">
                                    Status Actions
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Record Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableData.map((item, index) => {
                                    return (
                                        <tr key={index}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

                                            <td className="px-6 py-4">
                                                {index + 1}
                                            </td>
                                            {
                                                columns.map((columnName, index) => {
                                                    return (
                                                        <td key={index} className="px-6 py-4">
                                                            {columnName.includes(".") ?
                                                                (columnName.split(".").reduce((obj, key) => obj[key], item)) :

                                                                columnName === "imageUrl" ?
                                                                    (
                                                                        <img src={item[columnName] || "/images/imageNotFound.png"}
                                                                            alt={`Image for ${resourceTitle}`}
                                                                            className="w-12 h-12 object-cover rounded-full" />
                                                                    )
                                                                    :
                                                                    columnName === "status" ?
                                                                        (
                                                                            <span className={`px-2 py-1 rounded text-sm ${item[columnName].toLowerCase() === 'approved'
                                                                                ? 'bg-green-100 text-green-800'
                                                                                : item[columnName].toLowerCase() === 'rejected'
                                                                                    ? 'bg-red-100 text-red-800'
                                                                                    : 'bg-yellow-100 text-yellow-800'
                                                                                }`}>
                                                                                {item[columnName]}
                                                                            </span>
                                                                        )
                                                                        :
                                                                        columnName === "createdAt" || columnName === "updatedAt" || columnName === "saleDate" || columnName === "requestDate"
                                                                            ?
                                                                            (
                                                                                new Date(item[columnName]).toLocaleDateString()
                                                                            )
                                                                            :
                                                                            (
                                                                                item[columnName]
                                                                            )
                                                            }
                                                        </td>
                                                    )
                                                })
                                            }

                                            {/* Add Status Dropdown Column */}
                                            <td className="px-6 py-4">
                                                <div className="block text-sm font-medium leading-6 text-gray-900">
                                                    <div className="mt-2">
                                                        <select
                                                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                            value={item.status}
                                                            onChange={(e) => openModal(item.id, e.target.value)}
                                                            disabled={loading}
                                                        >
                                                            {statusOptions.map((option) => (
                                                                <option key={option.id} value={option.id}>
                                                                    {option.title}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-right flex items-center space-x-4">



                                                {/* View Button */}
                                                {/* <Link href={`/dashboard/inventory/${resourceTitle}/view/${item.id}`}
                                                    className="font-medium text-green-600 dark:text-green-500 flex items-center space-x-1">
                                                    <Eye className="w-4 h-4" />
                                                    <span>View</span>
                                                </Link> */}

                                                {/* Conditionally Render View Button for Sales Only */}
                                                {resourceTitle === "sales" && (
                                                    <Link href={`/dashboard/inventory/${resourceTitle}/view/${item.id}`}
                                                        className="font-medium text-green-600 dark:text-green-500 flex items-center space-x-1">
                                                        <Eye className="w-4 h-4" />
                                                        <span>View</span>
                                                    </Link>
                                                )}


                                                {/* For hiding edit button in adjustments */}
                                                {
                                                    resourceTitle.includes("adjustments") ? ("") : (
                                                        <Link href={`/dashboard/inventory/${resourceTitle}/update/${item.id}`}
                                                            className="font-medium text-blue-600 dark:text-blue-500 flex items-center space-x-1">
                                                            <Pencil className="w-4 h-4" />
                                                            <span>Edit</span>
                                                        </Link>
                                                    )
                                                }




                                                {/* Delete Btn */}
                                                <DeleteBtn id={item.id} endpoint={resourceTitle} />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                ) : (
                    <p className="py-4 text-xl bg-white text-center">There is No Data to Display</p>
                )
            }


            {/* Add Modal Component */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="max-w-md p-6 bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900">Confirm Status Change</DialogTitle>
                        <DialogDescription className="text-sm text-gray-600 mt-2">
                            Are you sure you want to change the status to <strong>{selectedStatus}</strong>?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-4 mt-4">
                        <Button variant="outline" onClick={() => setShowModal(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">Cancel</Button>
                        <Button onClick={handleUpdateStatus}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                        >Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
)

DataTableMaterialRequirementApprovalForm.displayName = 'DataTableMaterialRequirementApprovalForm';

export default DataTableMaterialRequirementApprovalForm;
