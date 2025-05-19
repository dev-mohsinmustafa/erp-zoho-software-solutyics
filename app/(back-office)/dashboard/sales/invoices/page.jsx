"use client"
import { useState } from 'react';
import RoleGuard from '@/app/roleGuard/RoleGuard';
import FixedHeader from '@/components/dashboard/FixedHeader';
import DataTable from '@/components/dashboard/DataTable';

const InvoicesPage = () => {
    const columns = [
        { field: 'invoiceNumber', headerName: 'Invoice Number' },
        { field: 'customer', headerName: 'Customer' },
        { field: 'invoiceDate', headerName: 'Invoice Date' },
        { field: 'dueDate', headerName: 'Due Date' },
        { field: 'total', headerName: 'Total Amount' },
        { field: 'status', headerName: 'Status' }
    ];

    return (
        <RoleGuard allowedRoles={["admin"]}>
            <div>
                <FixedHeader 
                    title="Invoices" 
                    newLink="/dashboard/sales/invoices/new"
                />
                <div className="p-4">
                    <DataTable 
                        columns={columns}
                        resourceTitle="invoices"
                    />
                </div>
            </div>
        </RoleGuard>
    );
};

export default InvoicesPage;