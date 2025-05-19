"use client"
import { useState } from 'react';
import RoleGuard from '@/app/roleGuard/RoleGuard';
import FixedHeader from '@/components/dashboard/FixedHeader';
import DataTable from '@/components/dashboard/DataTable';

const SalesReturnsPage = () => {
    const columns = [
        { field: 'returnNumber', headerName: 'Return Number' },
        { field: 'customer', headerName: 'Customer' },
        { field: 'returnDate', headerName: 'Return Date' },
        { field: 'total', headerName: 'Total Amount' },
        { field: 'status', headerName: 'Status' }
    ];

    return (
        <RoleGuard allowedRoles={["admin"]}>
            <div>
                <FixedHeader 
                    title="Sales Returns" 
                    newLink="/dashboard/sales/returns/new"
                />
                <div className="p-4">
                    <DataTable 
                        columns={columns}
                        resourceTitle="sales-returns"
                    />
                </div>
            </div>
        </RoleGuard>
    );
};

export default SalesReturnsPage;