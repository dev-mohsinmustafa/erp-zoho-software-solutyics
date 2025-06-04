"use client"

import FormHeader from "@/components/dashboard/FormHeader";
import FormTextInput from "@/components/formInputs/FormTextInput";
import SelectInput from "@/components/formInputs/SelectInput";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextareaInput";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CreatePurchaseReceivePaymentForm = ({ initialData = {}, isUpdate = false }) => {
    const [loading, setLoading] = useState(false);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);

    // Fetch purchase orders
    useEffect(() => {
        const fetchPurchaseOrders = async () => {
            try {
                const response = await fetch('/api/purchases/orders');
                const data = await response.json();
                setPurchaseOrders(data);
            } catch (error) {
                console.error('Error fetching purchase orders:', error);
            }
        };
        fetchPurchaseOrders();
    }, []);

    // Handle purchase order selection
    const handlePurchaseOrderChange = (e) => {
        const order = purchaseOrders.find(po => po.id === e.target.value);
        setSelectedPurchaseOrder(order);
        if (order) {
            setValue('purchaseOrderNumber', order.purchaseOrderNumber);
            setValue('remainingBalance', order.total);
        }
    };

    // Update remaining balance when amount paid changes
    const handleAmountPaidChange = (e) => {
        const amountPaid = parseFloat(e.target.value) || 0;
        const total = selectedPurchaseOrder ? selectedPurchaseOrder.total : 0;
        const remaining = total - amountPaid;
        setValue('remainingBalance', remaining);

        // Update payment status
        if (remaining <= 0) {
            setValue('paymentStatus', 'Paid');
        } else if (amountPaid > 0) {
            setValue('paymentStatus', 'Partial');
        } else {
            setValue('paymentStatus', 'Pending');
        }
    };

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            ...initialData,
            purchaseOrderNumber: initialData?.purchaseOrderNumber || "",
            receivingNumber: `PRCV-${Date.now()}`,
            receivingDate: new Date().toISOString().split('T')[0],
            paymentMethod: "",
            amountPaid: 0,
            remainingBalance: initialData?.totalAmount || 0,
            paymentStatus: "Partial",
            bankName: "",
            chequeNumber: "",
            transactionReference: "",
            notes: ""
        }
    });

    const router = useRouter();
    function redirect() {
        router.push("/dashboard/purchases/receiving");
    }

    async function onSubmit(data) {
        if (isUpdate) {
            makePutRequest(setLoading, `/api/purchases/receiving/${initialData.id}`, data, "Payment", reset, redirect);
        } else {
            makePostRequest(setLoading, "/api/purchases/receiving", data, "Payment", reset);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Purchase Order Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Purchase Order Information</h3>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <SelectInput
                            label="Select Purchase Order"
                            name="purchasesOrdersId"
                            register={register}
                            errors={errors}
                            onChange={handlePurchaseOrderChange}
                            options={[
                                { id: "", title: "Select a purchase order" },
                                ...purchaseOrders.map(order => ({
                                    id: order.id,
                                    title: `${order.purchaseOrderNumber} - ${order.supplier?.title || 'N/A'} (${order.total} PKR)`
                                }))
                            ]}
                            className="w-full"
                        />
                        <TextInput
                            label="Purchase Order Number"
                            name="purchaseOrderNumber"
                            register={register}
                            errors={errors}
                            readOnly
                            className="w-full"
                        />
                        <TextInput
                            label="Receiving Number"
                            name="receivingNumber"
                            register={register}
                            errors={errors}
                            readOnly
                            className="w-full"
                        />
                        <TextInput
                            label="Receiving Date"
                            name="receivingDate"
                            type="date"
                            register={register}
                            errors={errors}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Payment Details */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <SelectInput
                            label="Payment Method"
                            name="paymentMethod"
                            register={register}
                            errors={errors}
                            options={[
                                { id: "", title: "Select payment method" },
                                { id: "Cash", title: "Cash" },
                                { id: "Bank Transfer", title: "Bank Transfer" },
                                { id: "Cheque", title: "Cheque" },
                                { id: "Credit Card", title: "Credit Card" },
                                { id: "Mobile Payment", title: "Mobile Payment" }
                            ]}
                            className="w-full"
                        />
                        <FormTextInput
                            label="Amount Paid"
                            name="amountPaid"
                            type="number"
                            register={register}
                            errors={errors}
                            onChange={handleAmountPaidChange}
                            className="w-full"
                        />
                        <FormTextInput
                            label="Remaining Balance"
                            name="remainingBalance"
                            type="number"
                            register={register}
                            errors={errors}
                            readOnly
                            className="w-full"
                        />
                        <TextInput
                            label="Payment Status"
                            name="paymentStatus"
                            register={register}
                            errors={errors}
                            readOnly
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Payment Reference */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Reference</h3>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <TextInput
                            label="Bank Name (Optional)"
                            name="bankName"
                            register={register}
                            errors={errors}
                            className="w-full"
                            IsRequired={false}
                        />
                        <TextInput
                            label="Cheque Number (Optional)"
                            name="chequeNumber"
                            register={register}
                            errors={errors}
                            className="w-full"
                            IsRequired={false}
                        />
                        <TextInput
                            label="Transaction Reference (Optional)"
                            name="transactionReference"
                            register={register}
                            errors={errors}
                            className="w-full"
                            IsRequired={false}
                        />
                        <TextInput
                            label="Notes (Optional)"
                            name="notes"
                            register={register}
                            errors={errors}
                            className="w-full"
                            IsRequired={false}
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <SubmitButton title={isUpdate ? "Update Record Payment" : "Record Payment"} isLoading={loading} />
                </div>
            </form>
        </div>
    );
};

export default CreatePurchaseReceivePaymentForm;
