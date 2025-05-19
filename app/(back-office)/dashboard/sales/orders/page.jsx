"use client"
import { useState } from 'react';
import RoleGuard from '@/app/roleGuard/RoleGuard';
import FixedHeader from '@/components/dashboard/FixedHeader';
import DataTable from '@/components/dashboard/DataTable';

const SalesOrdersPage = () => {
    const columns = [
        { field: 'orderNumber', headerName: 'Order Number' },
        { field: 'customer', headerName: 'Customer' },
        { field: 'orderDate', headerName: 'Order Date' },
        { field: 'total', headerName: 'Total Amount' },
        { field: 'status', headerName: 'Status' }
    ];

    return (
        <RoleGuard allowedRoles={["admin"]}>
            <div>
                <FixedHeader 
                    title="Sales Orders" 
                    newLink="/dashboard/sales/orders/new"
                />
                <div className="p-4">
                    <DataTable 
                        columns={columns}
                        resourceTitle="sales-orders"
                    />
                </div>
            </div>
        </RoleGuard>
    );
};

export default SalesOrdersPage;