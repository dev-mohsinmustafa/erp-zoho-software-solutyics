// app/register/page.jsx

import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";


export default function Register() {
    return (
        <section className="bg-login-bg bg-cover bg-center bg-no-repeat bg-fixed">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                {/* Logo */}
                <Link href="/"
                    className="flex items-center mb-6 text-2xl font-semibold text-violetRed dark:text-white"
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
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-violetRed md:text-2xl dark:text-white text-center">Create a new account</h1>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
