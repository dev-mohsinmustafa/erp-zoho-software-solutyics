"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleGuard({ children, allowedRoles }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            if (!allowedRoles.includes(session.user.role)) {
                router.push("/dashboard/home/overview");
            }
        }
    }, [status, session, router, allowedRoles]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session?.user) {
        router.push("/login");
        return null;
    }

    return children;
}