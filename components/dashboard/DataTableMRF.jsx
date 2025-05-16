"use client"
import { Eye, Pencil, } from "lucide-react"
import Link from "next/link"
import DeleteBtn from "./DeleteBtn"
import { memo, useEffect } from 'react';

const DataTableMRF = memo(({ data = [], columns = [], resourceTitle }) => {


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

        </div>
    )
}
)

DataTableMRF.displayName = 'DataTableMRF';

export default DataTableMRF;