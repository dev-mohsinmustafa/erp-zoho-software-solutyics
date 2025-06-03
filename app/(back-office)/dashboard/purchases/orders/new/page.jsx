// "use client"

import FormHeader from "@/components/dashboard/FormHeader";
import { getData } from "@/lib/getData";
import CreatePurchaseOrderForm from "@/components/dashboard/CreatePurchaseOrderForm";

const NewPurchaseOrder = async ({ initialData = {}, isUpdate = false }) => {
    const TAG = "NewPurchaseOrder.js"

    const itemsData = getData("inventory/items");

    // Parallel fetching for better performance
    const [items,] = await Promise.all([itemsData,]);

    return (
        <div>
            {/* Header */}
            <FormHeader
                title={isUpdate ? "Update Purchase Order" : "New Purchase Order"}
                href="/dashboard/purchases/orders"
            />

            {/* Form */}
            <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <CreatePurchaseOrderForm
                    items={items}
                    initialData={initialData}
                    isUpdate={isUpdate}
                />
            </div>
        </div>
    );
};

export default NewPurchaseOrder;