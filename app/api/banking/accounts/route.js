import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req) {
    try {
        const data = await req.json();

        // Create the account
        const account = await db.account.create({
            data: {
                name: data.name,
                type: data.type,
                number: data.number,
                currency: data.currency,
                openingBalance: parseFloat(data.openingBalance),
                currentBalance: parseFloat(data.openingBalance), // Initially set to opening balance
                isDefault: data.isDefault || false,
                bankName: data.bankName,
                bankPhone: data.bankPhone,
                bankAddress: data.bankAddress
            }
        });

        return NextResponse.json({
            message: "Account created successfully",
            success: true,
            account
        });

    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
                success: false,
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const accounts = await db.account.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({
            message: "Accounts retrieved successfully",
            success: true,
            accounts
        });

    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
                success: false,
            },
            { status: 500 }
        );
    }
}