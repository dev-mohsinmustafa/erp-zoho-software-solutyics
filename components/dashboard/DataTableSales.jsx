import { Eye, Pencil, } from "lucide-react"
import Link from "next/link"
import DeleteBtn from "./DeleteBtn"

// onRefresh
const DataTableSales = ({ data = [], columns = [], resourceTitle, onRefresh  }) => {
    // console.log("Mohsin Data Check kro", data)
    // if a have an array of objects:
    // [
    //     {
    //       "id": "67b32d0d827cf04b37a9fda6",
    //       "title": "Cars",
    //       "description": "This is car description",
    //       "createdAt": "2025-02-17T12:35:25.626Z",
    //       "updatedAt": "2025-02-17T12:35:25.626Z"
    //     },
    // ]
    // i want to map through the objects and extract only the keys such i use them as table header titles
    // const headerTitle = Object.keys(data[0]);
    // console.log("Header Title", headerTitle);


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {
                data.length > 0 ? (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr >
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
                                                                    columnName === "createdAt" || columnName === "updatedAt" || columnName === "saleDate"
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
                                                <DeleteBtn id={item.id} endpoint={resourceTitle} 
                                                onSuccess={onRefresh} 
                                                />
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

export default DataTableSales;