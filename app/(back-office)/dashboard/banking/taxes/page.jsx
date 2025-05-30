"use client";
import DataTableTaxes from "@/components/dashboard/DataTableTaxes";
import FixedHeader from "@/components/dashboard/FixedHeader";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

const Taxes = () => {
    // const taxes = await getData("banking/taxes");
    const columns = ["title", "rate", "type", "description", "isDefault", "createdAt", "updatedAt"];

    const [taxes, setTaxes] = useState([]);
    const [loading, setLoading] = useState(false);
    async function fetchData() {
        setLoading(true);
        try {
            const data = await getData("banking/taxes");
            setTaxes(data);
        } catch (error) {
            console.error("Error fetching taxes:", error);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {

        fetchData();
    }, []);
    return (
        <div>
            {/* Fixed Header */}
            <FixedHeader title="Taxes" newLink="/dashboard/banking/taxes/new" />

            {/* Table */}
            <div className="my-4 p-8 relative">
                {loading ? <LoadingSpinner message="Loading taxes data, please wait..." /> : null}
                <DataTableTaxes data={taxes} columns={columns} resourceTitle="banking/taxes" />
            </div>
        </div>
    )
}

export default Taxes;