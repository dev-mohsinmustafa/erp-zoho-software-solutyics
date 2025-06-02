"use client"

import FormHeader from "@/components/dashboard/FormHeader";
import FormTextInput from "@/components/formInputs/FormTextInput";
import SelectInput from "@/components/formInputs/SelectInput";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextareaInput";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const CreateInvoiceReceivePaymentForm = ({ items, initialData = {}, isUpdate = false }) => {
    const [loading, setLoading] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    // Fetch invoices
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await fetch('/api/sales/invoices');
                const data = await response.json();
                setInvoices(data);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };
        fetchInvoices();
    }, []);

    // Handle invoice selection
    const handleInvoiceChange = (e) => {
        const invoice = invoices.find(inv => inv.id === e.target.value);
        setSelectedInvoice(invoice);
        if (invoice) {
            setValue('invoiceNumber', invoice.invoiceNumber);
            setValue('remainingBalance', invoice.total);
        }
    };

    // Update remaining balance when amount received changes
    const handleAmountReceivedChange = (e) => {
        const amountReceived = parseFloat(e.target.value) || 0;
        const total = selectedInvoice ? selectedInvoice.total : 0;
        const remaining = total - amountReceived;
        setValue('remainingBalance', remaining);

        // Update payment status
        if (remaining <= 0) {
            setValue('paymentStatus', 'Paid');
        } else if (amountReceived > 0) {
            setValue('paymentStatus', 'Partial');
        } else {
            setValue('paymentStatus', 'Pending');
        }
    };

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            ...initialData,
            invoiceNumber: initialData?.invoiceNumber || "",
            receivingNumber: `RCV-${Date.now()}`,
            receivingDate: new Date().toISOString().split('T')[0],
            paymentMethod: "",
            amountReceived: 0,
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
        router.push("/dashboard/sales/receiving");
    }

    async function onSubmit(data) {
        if (isUpdate) {
            makePutRequest(setLoading, `/api/sales/receiving/${initialData.id}`, data, "Payment", reset, redirect);
        } else {
            makePostRequest(setLoading, "/api/sales/receiving", data, "Payment", reset);
        }
    }




    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">


                {/* Invoice Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Invoice Information</h3>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <SelectInput
                            label="Select Invoice"
                            name="invoiceId"
                            register={register}
                            errors={errors}
                            onChange={handleInvoiceChange}
                            options={[
                                { id: "", title: "Select an invoice" },
                                ...invoices.map(invoice => ({
                                    id: invoice.id,
                                    title: `${invoice.invoiceNumber} - ${invoice.customer?.name || 'N/A'} (${invoice.total} PKR)`
                                }))
                            ]}
                            className="w-full"
                        />
                        <TextInput
                            label="Invoice Number"
                            name="invoiceNumber"
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
                            label="Amount Received"
                            name="amountReceived"
                            type="number"
                            register={register}
                            errors={errors}
                            onChange={handleAmountReceivedChange}
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
                            label="Bank Name"
                            name="bankName"
                            register={register}
                            errors={errors}
                            className="w-full"
                        />
                        <TextInput
                            label="Cheque Number"
                            name="chequeNumber"
                            register={register}
                            errors={errors}
                            className="w-full"
                        />
                        <TextInput
                            label="Transaction Reference"
                            name="transactionReference"
                            register={register}
                            errors={errors}
                            className="w-full"
                        />
                        <TextInput
                            label="Notes"
                            name="notes"
                            register={register}
                            errors={errors}
                            className="w-full"
                        />
                    </div>
                </div>


                <div className="space-y-8">




                </div>

                <div className="mt-6">
                    <SubmitButton title={isUpdate ? "Update Record Payment" : "Record Payment"} isLoading={loading} />
                </div>
            </form>
        </div>
    );
};

export default CreateInvoiceReceivePaymentForm;
