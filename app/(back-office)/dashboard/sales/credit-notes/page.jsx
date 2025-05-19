"use client"
import { useState } from 'react';
import RoleGuard from '@/app/roleGuard/RoleGuard';
import FixedHeader from '@/components/dashboard/FixedHeader';
import DataTable from '@/components/dashboard/DataTable';

const CreditNotesPage = () => {
    const columns = [
        { field: 'creditNoteNumber', headerName: 'Credit Note Number' },
        { field: 'customer', headerName: 'Customer' },
        { field: 'date', headerName: 'Date' },
        { field: 'total', headerName: 'Total Amount' },
        { field: 'status', headerName: 'Status' }
    ];

    return (
        <RoleGuard allowedRoles={["admin"]}>
            <div>
                <FixedHeader 
                    title="Credit Notes" 
                    newLink="/dashboard/sales/credit-notes/new"
                />
                <div className="p-4">
                    <DataTable 
                        columns={columns}
                        resourceTitle="credit-notes"
                    />
                </div>
            </div>
        </RoleGuard>
    );
};

export default CreditNotesPage;