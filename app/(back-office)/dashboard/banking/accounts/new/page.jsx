"use client"

import FormHeader from '@/components/dashboard/FormHeader';
import SelectInput from '@/components/formInputs/SelectInput';
import SubmitButton from '@/components/formInputs/SubmitButton';
import TextareaInput from '@/components/formInputs/TextareaInput';
import TextInput from '@/components/formInputs/TextInput';
import { makePostRequest } from '@/lib/apiRequest';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const NewAccountForm = ({ initialData = {}, isUpdate = false }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const accountTypes = [
        { id: 'bank', title: 'Bank' },
        { id: 'credit-card', title: 'Credit Card' }
    ];

    async function onSubmit(data) {
        makePostRequest(setLoading, "/api/banking/accounts", data, "Account", reset);
    }

    return (
        <div>
            <FormHeader title={isUpdate ? "Update Account" : "New Account"} href="/dashboard/banking/accounts" />

            <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-8">
                        {/* General Section */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">General</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Use your card type for multiple banking accounts. The card type is shared to all accounts you may have.
                            </p>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <SelectInput
                                    label="Type"
                                    name="type"
                                    register={register}
                                    errors={errors}
                                    options={accountTypes}
                                    className="w-full"
                                />
                                <TextInput
                                    label="Name"
                                    name="name"
                                    register={register}
                                    errors={errors}
                                    required
                                    className="w-full"
                                />
                                <TextInput
                                    label="Number"
                                    name="number"
                                    register={register}
                                    errors={errors}
                                    required
                                    className="w-full"
                                />
                                <TextInput
                                    label="Currency"
                                    name="currency"
                                    register={register}
                                    errors={errors}
                                    required
                                    className="w-full"
                                />
                                <TextInput
                                    label="Opening Balance"
                                    name="openingBalance"
                                    type="number"
                                    register={register}
                                    errors={errors}
                                    required
                                    className="w-full"
                                />
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        {...register('isDefault')}
                                        className="form-checkbox"
                                    />
                                    <span>Default Account</span>
                                </div>
                            </div>
                        </div>

                        {/* Bank Section */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Bank</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                You may want to add bank account to make it easy to reconcile. Record the information about your bank and make it
                                easier to match the transactions with your bank.
                            </p>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <TextInput
                                    label="Bank Name"
                                    name="bankName"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />
                                <TextInput
                                    label="Bank Phone"
                                    name="bankPhone"
                                    register={register}
                                    errors={errors}
                                    className="w-full"
                                />
                                <div className="sm:col-span-2">
                                    <TextareaInput
                                        label="Bank Address"
                                        name="bankAddress"
                                        register={register}
                                        errors={errors}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <SubmitButton title={isUpdate ? "Update Account" : "New Account"} isLoading={loading} />
                    </div>
                </form>
            </div>

            {/* Connect Your Bank Section */}
            {/* <div className="fixed right-0 top-1/3 bg-white p-4 rounded-l-lg shadow-lg">
                <h3 className="font-medium mb-2">Connect Your Bank</h3>
                <p className="text-sm text-gray-600 mb-2">
                    Import transactions securely to automate your bookkeeping and reports by connecting your bank accounts.
                </p>
                <a href="#" className="text-blue-600 text-sm hover:underline">Learn more</a>
            </div> */}
        </div>
    );
};

export default NewAccountForm;