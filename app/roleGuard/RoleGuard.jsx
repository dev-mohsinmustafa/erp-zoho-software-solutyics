"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleGuard({ children, allowedRoles }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" && !allowedRoles.includes(session?.user?.role)) {
            router.push("/dashboard/home/overview");
        } else if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, session, allowedRoles, router]);

    if (status === "loading") {
        return (
            <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600">Mohsin</div>
            </div>
        );
    }

    return allowedRoles.includes(session?.user?.role) ? children : null;
}