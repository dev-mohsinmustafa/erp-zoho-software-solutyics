
// "use client"

import CreatePointofSalesForm from "@/components/dashboard/CreatePointofSalesForm";
import FormHeader from "@/components/dashboard/FormHeader";
import { getData } from "@/lib/getData";


const NewPointofSales = async ({ initialData = {}, isUpdate = false }) => {
    const TAG = "NewPointofSale.js"

    const itemsData = getData("inventory/items");




    // instead of this we use 
    // PARALLEL FETCHING is more faster and did't block the code
    // 2- 
    // suppliersData
    const [items] = await Promise.all([
        itemsData,
    ])



    return (
        <div>

            {/* Header */}
            <FormHeader title={isUpdate ? "Update Point of Sales" : "New Point of Sales"} href="/dashboard/pos/point-of-sales" />


            {/* Form */}
            <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">


                {/* Now remove this form code after creating CreatingInvoiceForm.jsx component */}

                <CreatePointofSalesForm items={items} initialData={initialData} isUpdate={isUpdate} />


            </div>

        </div>
    )
}

export default NewPointofSales;