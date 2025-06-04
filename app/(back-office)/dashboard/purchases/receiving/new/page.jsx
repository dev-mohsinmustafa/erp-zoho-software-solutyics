
import CreatePurchaseReceivePaymentForm from "@/components/dashboard/CreatePurchaseReceivePaymentForm";
import FormHeader from "@/components/dashboard/FormHeader";
import { getData } from "@/lib/getData";

const NewPurchaseReceivePayment = async ({ initialData = {}, isUpdate = false }) => {
    const purchasesOrdersData = getData("purchases/orders");

    const [purchasesOrders] = await Promise.all([
        purchasesOrdersData,
    ]);


    return (
        <div>
            <FormHeader
                title={isUpdate ? "Update Purchase Order Receiving Payment" : "New Purchase Order Receiving Payment"}
                href="/dashboard/purchases/receiving"
            />

            <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <CreatePurchaseReceivePaymentForm
                    purchaseOrders={purchasesOrders}
                    initialData={initialData}
                    isUpdate={isUpdate}
                />
            </div>
        </div>
    );
};

export default NewPurchaseReceivePayment;