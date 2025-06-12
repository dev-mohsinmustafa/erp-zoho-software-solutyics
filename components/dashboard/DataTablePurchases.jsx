"use client"
import { CheckCircle, Eye, Mail, Pencil, } from "lucide-react"
import Link from "next/link"
import DeleteBtn from "./DeleteBtn"
import { memo, useEffect } from 'react';
import toast from "react-hot-toast";

const DataTablePurchases = memo(({ data = [], columns = [], resourceTitle }) => {
    const handleMarkAsSent = async (id) => {
        try {
            const response = await fetch(`/api/purchases/orders/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'sent' })
            });

            if (response.ok) {
                // Refresh the page to show updated status
                toast.success('Status updated to SENT');
                window.location.reload();
            } else {
                console.error('Failed to update purchases orders status');
                toast.error('Failed to update purchases orders status');
            }
        } catch (error) {
            console.error('Error updating purchases orders status:', error);
            toast.error('Error updating purchases orders status');

        }
    };


    const handleMarkAsPaid = async (id) => {
        try {
            const response = await fetch(`/api/purchases/orders/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Paid' })
            });

            if (response.ok) {
                toast.success('Status updated to PAID');
                window.location.reload();
            } else {
                console.error('Failed to update payment status');
                toast.error('Failed to update payment status');
            }
        } catch (error) {
            console.error('Error updating payment status:', error);
            toast.error('Error updating payment status');
        }
    };


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
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            {/* <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.title}
                                        </th> */}
                                            {/* {item.title} */}
                                            {/* item['title'] === item.title these are same */}
                                            {/* {
                                        columns.map((columnName, index) => {
                                            return (
                                                <td key={index} className="px-6 py-4">
                                                    {item[columnName]}
                                                </td>
                                            )
                                        })
                                    } */}
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
                                                                    columnName === "createdAt" || columnName === "updatedAt" || columnName === "orderDate" || columnName === "expectedDeliveryDate"
                                                                        ?
                                                                        (
                                                                            // Convert date columns to a more readable format 
                                                                            new Date(item[columnName]).toLocaleDateString()
                                                                        )
                                                                        :
                                                                        columnName === "status" ?
                                                                            (
                                                                                <span className={`px-2 py-1 rounded text-sm ${item[columnName].toLowerCase() === 'draft'
                                                                                    ? 'text-slate-800 bg-slate-100'
                                                                                    : item[columnName].toLowerCase() === 'sent'
                                                                                        ? 'bg-[#B80000] text-white'
                                                                                        : item[columnName].toLowerCase() === 'paid'
                                                                                            ? 'bg-[#63914A] text-white'
                                                                                            : item[columnName].toLowerCase() === 'partial'
                                                                                                ? 'text-yellow-600 bg-yellow-100'
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
                                            <td className="px-6 py-4 text-right flex items-center space-x-4">



                                                <Link href={`/dashboard/${resourceTitle}/view/${item.id}`}
                                                    className="font-medium text-green-600 dark:text-green-500 flex items-center space-x-1">
                                                    <Eye className="w-4 h-4" />
                                                    <span>View</span>
                                                </Link>



                                                {item.status.toLowerCase() === 'draft' && (
                                                    <button
                                                        onClick={() => handleMarkAsSent(item.id)}
                                                        className="font-medium text-blue-600 dark:text-blue-500 flex items-center space-x-1"
                                                    >
                                                        <span>Mark Sent</span>
                                                    </button>
                                                )}

                                                {item.status.toLowerCase() !== 'paid' && (
                                                    <button
                                                        onClick={() => handleMarkAsPaid(item.id)}
                                                        className="font-medium text-emerald-600 dark:text-emerald-500 hover: underline flex items-center space-x-1"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span>Mark Paid</span>
                                                    </button>
                                                )}



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

        </div>
    )
}
)

DataTablePurchases.displayName = 'DataTablePurchases';

export default DataTablePurchases;