"use client"

import RoleGuard from '@/app/roleGuard/RoleGuard';
import FixedHeader from '@/components/dashboard/FixedHeader';
import OptionCard from '@/components/dashboard/OptionCard';
import { BookOpen, Receipt, FileSpreadsheet, PiggyBank, BarChart4, LineChart } from 'lucide-react';

const Accounting = () => {
    const optionCards = [
        {
            title: "Chart of Accounts",
            icon: BookOpen,
            description: "Manage your organization's financial accounts structure",
            link: "/dashboard/accounting/chart-of-accounts",
            linkTitle: "View Accounts",
            enabled: true,
        },
        {
            title: "Journal Entries",
            icon: Receipt,
            description: "Record and track financial transactions",
            link: "/dashboard/accounting/journal-entries",
            linkTitle: "New Entry",
            enabled: true,
        },
        {
            title: "General Ledger",
            icon: FileSpreadsheet,
            description: "View all financial transactions by account",
            link: "/dashboard/accounting/general-ledger",
            linkTitle: "View Ledger",
            enabled: true,
        },
        {
            title: "Balance Sheet",
            icon: PiggyBank,
            description: "View your company's financial position",
            link: "/dashboard/accounting/balance-sheet",
            linkTitle: "View Report",
            enabled: true,
        },
        {
            title: "Income Statement",
            icon: BarChart4,
            description: "Track your revenue, expenses, and profit",
            link: "/dashboard/accounting/income-statement",
            linkTitle: "View Report",
            enabled: true,
        },
        {
            title: "Cash Flow",
            icon: LineChart,
            description: "Monitor your cash inflows and outflows",
            link: "/dashboard/accounting/cash-flow",
            linkTitle: "View Report",
            enabled: true,
        }
    ];

    return (
        <RoleGuard allowedRoles={["admin"]}>
            <div>
                <FixedHeader title="Accounting" newLink="/dashboard/accounting/new" />
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 px-4 py-8 gap-6">
                    {optionCards.map((card, index) => (
                        <OptionCard key={index} optionData={card} />
                    ))}
                </div>
            </div>
        </RoleGuard>
    );
};

export default Accounting;