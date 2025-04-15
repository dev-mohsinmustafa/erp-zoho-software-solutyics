"use client"



const DataTablePurchaseRequestApproved = ({ data = [], columns = [], resourceTitle }) => {





  


    
   

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
                                {/* <th scope="col" className="px-6 py-3">Status Option</th> ✅ New Column */}
                             
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

                                            {/* Now Advanced Data Table Logic to cater for Dates and Image */}
                                            {/* toLocaleDateString convert data and time in normal time  */}
                                            {
                                                columns.map((columnName, index) => {
                                                    return (
                                                        <td key={index} className="px-6 py-4">
                                                            {columnName.includes(".") ?
                                                                (() => {
                                                                    const value = columnName.split(".").reduce((obj, key) => obj[key], item);
                                                                    // Check if this nested value is a date field
                                                                    if (columnName === "purchaseRequest.requestDate") {
                                                                        return new Date(value).toLocaleDateString();
                                                                    }
                                                                    return value;
                                                                })() :
                                                             
                                                                
                                                                
                                                                    columnName === "createdAt" || columnName === "updatedAt" || columnName === "purchaseRequest.requestDate"  || columnName === "requestDate" 
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

export default DataTablePurchaseRequestApproved;