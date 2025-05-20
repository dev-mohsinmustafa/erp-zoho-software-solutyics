"use client"
import { Eye, Pencil, } from "lucide-react"
import Link from "next/link"
import DeleteBtn from "./DeleteBtn"
import { useEffect, useState } from "react";
import { getData } from "@/lib/getData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react";



const DataTablePurchaseRequestApproval = ({ data = [], columns = [], resourceTitle, onStatusUpdate }) => {


    const { data: session } = useSession();
    const [tableData, setTableData] = useState(data); // ✅ State to update status in UI
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedId, setSelectedId] = useState(null);


    useEffect(() => {
        async function fetchPurchases() {
            setLoading(true);
            try {
                const response = await fetch("/api/inventory/purchase-requests");
                console.log("STATUS CHANGE API", response);

                if (!response.ok) throw new Error("Failed to fetch data");

                const data = await response.json();
                setTableData(data);
            } catch (error) {
                console.error("Error fetching purchase requests:", error);
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


    // async function handleUpdateStatus(id, newStatus) {
    // id, newStatus ye wali openModal me chale gyen 
    async function handleUpdateStatus() {
        if (!session?.user?.id) {
            alert("You must be logged in to approve requests");
            return;
        }

        setShowModal(false);
        setLoading(true);
        try {
            const response = await fetch(`/api/inventory/approval-requests`, {
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

            // Refresh data after update
            // const refreshedData = await fetch("/api/purchase-requests").then(res => res.json());
            // setTableData(refreshedData);
            // Call the parent's update function
            onStatusUpdate?.();

            alert(`Status successfully updated to ${selectedStatus}`);
        } catch (error) {
            console.error("Error updating status:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }


    // async function handleUpdateStatus() {
    //     setShowModal(false);
    //     setLoading(true);
    //     try {
    //         const response = await fetch(`/api/approval-requests`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ 
    //                 id: selectedId, 
    //                 status: selectedStatus,
    //                 remarks: "Status changed to " + selectedStatus // You can add a remarks input field if needed
    //             }),
    //         });

    //         if (!response.ok) {
    //             throw new Error("Failed to update status");
    //         }

    //         const result = await response.json();

    //         // Update the UI
    //         setTableData((prevData) =>
    //             prevData.map((item) =>
    //                 item.id === selectedId ? { ...item, status: selectedStatus } : item
    //             )
    //         );

    //         // Show success message
    //         alert(`Status successfully updated to ${selectedStatus}`);
    //     } catch (error) {
    //         console.error("Error updating status:", error);
    //         alert("Failed to update status. Please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // }


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
                                {/* <th scope="col" className="px-6 py-3">Status Option</th> ✅ New Column */}
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                                <th scope="col" className="px-6 py-3">

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
                                            {/* Now Advanced Data Table Logic to cater for Dates and Image */}
                                            {/* toLocaleDateString convert data and time in normal time  */}
                                            {
                                                columns.map((columnName, index) => {
                                                    return (
                                                        <td key={index} className="px-6 py-4">
                                                            {columnName.includes(".") ?
                                                                (columnName.split(".").reduce((obj, key) => obj[key], item)) :

                                                                columnName === "imageUrl" ?
                                                                    (
                                                                        // Special handling for imageUrl to render an image
                                                                        <img src={item[columnName] || "/images/imageNotFound.png"}
                                                                            alt={`Image for ${resourceTitle}`}
                                                                            className="w-12 h-12 object-cover rounded-full" />
                                                                    )
                                                                    :
                                                                    columnName === "createdAt" || columnName === "updatedAt" || columnName === "saleDate" || columnName === "requestDate"
                                                                        ?
                                                                        (
                                                                            // Convert date columns to a more readable format 
                                                                            new Date(item[columnName]).toLocaleDateString()
                                                                        )
                                                                        :
                                                                        columnName === "status" ?
                                                                            (
                                                                                <span className={`px-2 py-1 rounded text-sm ${item[columnName].toLowerCase() === 'approved'
                                                                                    ? 'bg-green-100 text-green-800'
                                                                                    : item[columnName].toLowerCase() === 'rejected'
                                                                                        ? 'bg-red-100 text-red-800'
                                                                                        : item[columnName].toLowerCase() === 'open'
                                                                                            ? 'bg-purple-100 text-purple-800'
                                                                                            : item[columnName].toLowerCase() === 'received'
                                                                                                ? 'bg-cyan-100 text-cyan-800'
                                                                                                : 'bg-yellow-100 text-yellow-800'
                                                                                    }`}>
                                                                                    {item[columnName]}
                                                                                </span>
                                                                            )
                                                                            :
                                                                            (
                                                                                // Otherwise, display the value as is
                                                                                item[columnName]
                                                                            )
                                                            }
                                                        </td>
                                                    )
                                                })
                                            }

                                            {/* ✅ Status Column with Dropdown */}
                                            <td className="px-6 py-4 ">
                                                <div className="block text-sm font-medium leading-6 text-gray-900">
                                                    <div className="mt-2">
                                                        <select
                                                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                            // className=" p-2 border rounded-md text-sm md:text-base bg-white dark:bg-gray-800 dark:text-white"
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
                                                {/* <Link href={`/dashboard/${resourceTitle}/view/${item.id}`}
                                                    className="font-medium text-green-600 dark:text-green-500 flex items-center space-x-1">
                                                    <Eye className="w-4 h-4" />
                                                    <span>View</span>
                                                </Link> */}

                                                {/* Conditionally Render View Button for Sales Only */}
                                                {resourceTitle === "sales" && (
                                                    <Link href={`/dashboard/${resourceTitle}/view/${item.id}`}
                                                        className="font-medium text-green-600 dark:text-green-500 flex items-center space-x-1">
                                                        <Eye className="w-4 h-4" />
                                                        <span>View</span>
                                                    </Link>
                                                )}
                                                {/* {["sales", "purchase-requests"].includes(resourceTitle) && (
                                                    <Link href={`/dashboard/${resourceTitle}/view/${item.id}`}
                                                        className="font-medium text-green-600 dark:text-green-500 flex items-center space-x-1">
                                                        <Eye className="w-4 h-4" />
                                                        <span>View</span>
                                                    </Link>
                                                )} */}



                                                {/* For hiding edit button in adjustments */}
                                                {
                                                    !resourceTitle.includes("adjustments") ? ("") : (
                                                        <Link href={`/dashboard/${resourceTitle}/update/${item.id}`}
                                                            className="font-medium text-blue-600 dark:text-blue-500 flex items-center space-x-1">
                                                            <Pencil className="w-4 h-4" />
                                                            <span>Edit</span>
                                                        </Link>
                                                    )
                                                }




                                                {/* Delete Btn */}
                                                {/* <DeleteBtn id={item.id} endpoint={resourceTitle} /> */}
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



            {/* Modal Component */}
            {/* {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Confirm Status Change</h3>
                        <p>Are you sure you want to change the status to <strong>{selectedStatus}</strong>?</p>
                        <div className="flex justify-end mt-4 space-x-4">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded">
                                Cancel
                            </button>
                            <button onClick={handleUpdateStatus} className="px-4 py-2 bg-blue-600 text-white rounded">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )} */}


            {/* ✅ ShadCN Modal for Status Change Confirmation */}
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

export default DataTablePurchaseRequestApproval;