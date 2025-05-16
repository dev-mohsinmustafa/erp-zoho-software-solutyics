"use client"

import { memo } from "react";

const DataTableMaterialRequirementApprovedForm = memo(({ data = [], columns = [], resourceTitle }) => {
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
                                            {
                                                columns.map((columnName, index) => {
                                                    return (
                                                        <td key={index} className="px-6 py-4">
                                                            {columnName.includes(".") ?
                                                                (() => {
                                                                    const value = columnName.split(".").reduce((obj, key) => obj[key], item);
                                                                    if (columnName === "materialRequirement.requestDate") {
                                                                        return new Date(value).toLocaleDateString();
                                                                    }
                                                                    return value;
                                                                })() :
                                                                columnName === "createdAt" || columnName === "updatedAt" || columnName === "materialRequirement.requestDate" || columnName === "requestDate"
                                                                    ?
                                                                    (
                                                                        new Date(item[columnName]).toLocaleDateString()
                                                                    )
                                                                    :
                                                                    columnName === "status" ?
                                                                        (
                                                                            <span className={`px-2 py-1 rounded text-sm ${item[columnName] === 'approved'
                                                                                ? 'bg-green-100 text-green-800'
                                                                                : item[columnName] === 'rejected'
                                                                                    ? 'bg-red-100 text-red-800'
                                                                                    : 'bg-yellow-100 text-yellow-800'
                                                                                }`}>
                                                                                {item[columnName]}
                                                                            </span>
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
});

DataTableMaterialRequirementApprovedForm.displayName = 'DataTableMaterialRequirementApprovedForm';

export default DataTableMaterialRequirementApprovedForm;