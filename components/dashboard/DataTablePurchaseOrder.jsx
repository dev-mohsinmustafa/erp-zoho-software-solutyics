"use client"
import { Eye, Pencil, } from "lucide-react"
import Link from "next/link"
import DeleteBtn from "./DeleteBtn"
import { useEffect, useState } from "react";
import { getData } from "@/lib/getData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"



const DataTablePurchaseOrder = ({ data = [], columns = [], resourceTitle }) => {


    const [tableData, setTableData] = useState(data); // ✅ State to update status in UI
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedId, setSelectedId] = useState(null);


    useEffect(() => {
        async function fetchPurchases() {
            setLoading(true);
            try {
                const response = await fetch("/api/purchase-orders");
                // console.log("STATUS CHANGE API", response);

                if (!response.ok) throw new Error("Failed to fetch data");

                const data = await response.json();
                setTableData(data);
            } catch (error) {
                console.error("Error fetching purchase orders:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPurchases();
    }, []);


    const statusOptions = [
        { id: "pending", title: "Pending" },
        // { id: "approved", title: "Approved" },
        { id: "open", title: "Open" },
        // { id: "rejected", title: "Rejected" },
        { id: "received", title: "Received" },
    ];



    const openModal = (id, newStatus) => {
        setSelectedId(id);
        setSelectedStatus(newStatus);
        setShowModal(true);
    };


    // async function handleUpdateStatus(id, newStatus) {
    // id, newStatus ye wali openModal me chale gyen 
    async function handleUpdateStatus() {
        setShowModal(false);
        setLoading(true);
        try {
            const response = await fetch(`/api/purchase-orders`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: selectedId, orderStatus: selectedStatus }),
            });
            if (!response.ok) {
                throw new Error("Failed to update order status");
            }

            // const updatedData = await response.json();

            // ✅ Update the state to reflect changes in UI
            setTableData((prevData) =>
                prevData.map((item) =>
                    item.id === selectedId ? { ...item, orderStatus: selectedStatus } : item
                )
            );
            // await fetchPurchases();
            // ✅ Fetch latest data from API instead of manually updating state
            // const updatedData = await getData("/api/purchase-requests");
            // setTableData(updatedData);
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("Failed to update order status. Please try again.");
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
                                {/* <th scope="col" className="px-6 py-3">Status Option</th> ✅ New Column */}
                                <th scope="col" className="px-6 py-3">
                                    Order Actions
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
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
                                                                    columnName === "createdAt" || columnName === "updatedAt" || columnName === "saleDate" || columnName === "orderDate" || columnName === "receivedDate"
                                                                        ?
                                                                        (
                                                                            // Convert date columns to a more readable format 
                                                                            new Date(item[columnName]).toLocaleDateString()
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
                                                            value={item.orderStatus}
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
                                                {/* {["sales", "purchase-requests"].includes(resourceTitle) && (
                                                    <Link href={`/dashboard/inventory/${resourceTitle}/view/${item.id}`}
                                                        className="font-medium text-green-600 dark:text-green-500 flex items-center space-x-1">
                                                        <Eye className="w-4 h-4" />
                                                        <span>View</span>
                                                    </Link>
                                                )} */}



                                                {/* For hiding edit button in adjustments */}
                                                {
                                                    !resourceTitle.includes("adjustments") ? ("") : (
                                                        <Link href={`/dashboard/inventory/${resourceTitle}/update/${item.id}`}
                                                            className="font-medium text-blue-600 dark:text-blue-500 flex items-center space-x-1">
                                                            <Pencil className="w-4 h-4" />
                                                            <span>Edit</span>
                                                        </Link>
                                                    )
                                                }

                                                {/* ✅ New Create GRN Button (Only for purchase orders with 'open' status) */}
                                                {resourceTitle === "purchase-orders" && item.orderStatus === "open" && (
                                                    <Link href={`/dashboard/inventory/${resourceTitle}/create-grn/${item.id}`}
                                                        className="font-medium text-purple-600 dark:text-purple-500 flex items-center space-x-1 bg-purple-100 px-3 py-2 rounded-md hover:bg-purple-200 transition duration-200">
                                                        <span>Create GRN</span>
                                                    </Link>
                                                    // <Link href={`/dashboard/inventory/${resourceTitle}/goods-received/new/${item.id}`}
                                                    //     className="font-medium text-purple-600 dark:text-purple-500 flex items-center space-x-1 bg-purple-100 px-3 py-2 rounded-md hover:bg-purple-200 transition duration-200">
                                                    //     <span>Create GRN</span>
                                                    // </Link>
                                                )}


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

export default DataTablePurchaseOrder;