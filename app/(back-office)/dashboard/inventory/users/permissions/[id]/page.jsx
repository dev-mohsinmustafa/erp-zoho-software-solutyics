"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import FormHeader from '@/components/dashboard/FormHeader';
import LoadingSpinner from '@/components/dashboard/LoadingSpinner';
import MiniButtonSpinner from '@/components/dashboard/MiniButtonSpinner';

const UserPermissions = ({ params }) => {
    const router = useRouter();
    const unwrappedParams = use(params);
    const [user, setUser] = useState(null);
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState(false);

    const availableModules = [
        { id: "inventory", title: "Inventory" },
        { id: "items", title: "Items" },
        { id: "categories", title: "Categories" },
        { id: "brands", title: "Brands" },
        { id: "units", title: "Units" },
        { id: "warehouse", title: "Warehouse" },
        { id: "adjustments", title: "Inventory Adjustments" },
        { id: "stock-adjustments", title: "Stock Adjustments" },
        { id: "suppliers", title: "Supplier" },
        { id: "products", title: "Products Management" },
        { id: "sales", title: "Sales Management" },
        { id: "purchase-requests", title: "Purchase Requests" },
        { id: "approval-requests", title: "Approval Requests" },
        { id: "purchase-orders", title: "Purchase Orders" },
        { id: "poGoods-received", title: "Goods/Materials Received" },
        { id: "material-request-form", title: "Material Request Form (MRF)" },
        { id: "material-requirement-form", title: "Material Requirement Form (MRF)" },
        { id: "material-requirement-approval", title: "Material Requirement Approval" }
    ];

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/api/user/${unwrappedParams.id}`);
            const data = await response.json();
            setUser(data);
            setPermissions(data.permissions || {});
        };
        fetchUser();
    }, [unwrappedParams.id]);

    const handlePermissionChange = (moduleId) => {
        setPermissions(prev => ({
            ...prev,
            [moduleId]: !prev[moduleId]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`/api/user/${unwrappedParams.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...user,
                    permissions
                })
            });
            if (response.ok) {
                router.push('/dashboard/inventory/users');
            }
        } catch (error) {
            console.error('Error updating permissions:', error);
        }
        setLoading(false);
    };

    if (!user) return <LoadingSpinner message="Loading users permissions, please wait..." />;

    return (
        <div>
            <FormHeader title={`Manage Permissions - ${user.name}`} href="/dashboard/inventory/users" />
            <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-sm mx-auto my-3 relative">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-6">
                        {availableModules.map((module) => (
                            <div key={module.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={module.id}
                                    checked={permissions[module.id] || false}
                                    onChange={() => handlePermissionChange(module.id)}
                                    className="w-4 h-4 text-blue-600 rounded"
                                />
                                <label htmlFor={module.id} className="ml-2 text-sm font-medium text-gray-900">
                                    {module.title}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="text-white bg-violetRed hover:bg-violetRed/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center relative"
                    >
                        {loading ? (
                            // <div className="flex items-center justify-center space-x-2">
                            //     <img
                            //         src="/navLogo.png"
                            //         alt="Solutyics Logo"
                            //         className="w-5 h-5 mr-2"
                            //     />
                            //     <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            //     <span>Saving...</span>
                            // </div>
                            // <LoadingSpinner message="Saving" />
                            <MiniButtonSpinner text="Saving..." />
                        ) : (
                            'Save Permissions'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserPermissions;
