"use client"
// app/login/page.jsx

import LoginForm from "@/components/auth/LoginForm";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
// import { authOptions } from "@/lib/authOptions";
// import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Login() {

    // Server Side
    // const session = getServerSession(authOptions); // Server Side
    const { data: session, status, } = useSession();
    const router = useRouter(); // Use router instead of direct `redirect`

    // important authenticated
    // if (status === "authenticated") {
    //     redirect("/dashboard/home/overview")
    // }
    // Solve Re-rendering error
    // useEffect(() => {
    //     if (status === "authenticated") {
    //         router.push("/dashboard/home/overview");
    //     }
    // }, [status, router]);
    // Role Based Access
    useEffect(() => {
        if (status === "authenticated") {
            // Redirect based on user role
            if (session.user.role === "admin") {
                router.push("/dashboard/home/overview");
            } else {
                router.push("/dashboard/home/overview");
            }
        }
    }, [status, session, router]);

    //
    // const username = session?.user?.name ?? "";
    // console.log("GET USER DATA FROM SESSION", username)

    if (status === "loading") {
        return (
            <LoadingSpinner message="Logging out, please wait..." />
        );
    }


    return (
        // bg-gray-50
        <section className="bg-login-bg bg-cover bg-center bg-no-repeat bg-fixed">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                {/* Logo */}
                <Link href="/"
                    // text-gray-900
                    className="flex items-center mb-6 text-2xl font-semibold  text-violetRed dark:text-white"
                >
                    <img
                        className="w-8 h-8 mr-2"
                        src="/navLogo.png"
                        alt="logo"
                    />
                    Solutyics Inventory System
                </Link>
                <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md  xl:p-0 dark:bg-gray-800 dark:hover:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-violetRed md:text-2xl dark:text-white text-center">Sign in to your account</h1>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
