"use client"
import { Eye, Pencil } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import DeleteBtn from "./DeleteBtn"
import { memo } from 'react';

const DataTableUser = memo(({ data = [], columns = [], resourceTitle }) => {
    const router = useRouter();

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {data.length > 0 ? (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sr. No
                            </th>
                            {
                                columns.map((columnName, index) => (
                                    <th key={index} scope="col" className="px-6 py-3">
                                        {columnName}
                                    </th>
                                ))
                            }
                            <th scope="col" className="px-6 py-3">Permissions</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    {index + 1}
                                </td>
                                {
                                    columns.map((columnName, colIndex) => (
                                        <td key={colIndex} className="px-6 py-4">
                                            {item[columnName]}
                                        </td>
                                    ))
                                }
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => router.push(`/dashboard/inventory/users/permissions/${item.id}`)}
                                        className="font-medium text-violetRed hover:text-violetRed/80 transition-colors duration-200"
                                    >
                                        Manage Permissions
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-right flex items-center space-x-4">
                                    <Link
                                        href={`/dashboard/inventory/users/update/${item.id}`}
                                        className="font-medium text-blue-600 dark:text-blue-500 flex items-center space-x-1"
                                    >
                                        <Pencil className="w-4 h-4" />
                                        <span>Edit</span>
                                    </Link>
                                    <DeleteBtn id={item.id} endpoint={resourceTitle} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="py-4 text-xl bg-white text-center">No Users Found</p>
            )}
        </div>
    );
});

DataTableUser.displayName = 'DataTableUser';
export default DataTableUser;