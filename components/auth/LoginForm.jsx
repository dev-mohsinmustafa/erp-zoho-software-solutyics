"use client"

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import MiniButtonSpinner from "../dashboard/MiniButtonSpinner";

const LoginForm = () => {
    const router = useRouter();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [emailErr, setEmailErr] = useState("");
    // console.log(emailErr);

    async function onSubmit(data) {

        try {
            setLoading(true);
            console.log(data.email, data.password, data.companyName);
            const loginData = await signIn("credentials", {
                ...data,
                redirect: false,
            });
            console.log("Login Response:", loginData); // Debugging


            if (loginData) {
                setLoading(false);
                setEmailErr("");
                toast.success("Login Successfully");
                router.push("/dashboard/home/overview");
            }
        } catch (error) {
            setLoading(false);
            console.log("Network Error", error);
            toast.error("Something Went wrong, Please Try again");
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"

        >

            <div>
                <label htmlFor="email"
                    className="block mb-2 text-sm font-medium text-violetRed dark:text-white"
                >
                    Your Email
                </label>
                <input
                    // {...register("email", { required: true })}
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email format"
                        }
                    })}

                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                focus:ring-violetRed focus:border-violetRed block w-full p-2.5 dark:bg-gray-700 
                dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark: focus: ring-violetRed 
                dark:focus:border-violetRed"
                    placeholder="name@company.com"
                    // required
                    onChange={() => setEmailErr("")}
                />
                {/* {
                    errors.email && <small className="text-red-600 text-sm">{errors.email.message}</small>
                } */}
                {(errors.email || emailErr) && (<small className="text-red-600 text-sm">{errors.email?.message || emailErr}</small>)}

                {/* <small className="text-red-600 text-sm">{emailErr}</small> */}
            </div>




            <div>
                <label htmlFor="password"
                    className="block mb-2 text-sm font-medium text-violetRed dark:text-white"
                >
                    Password
                </label>
                <input
                    // {...register("password", { required: true })}
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })}

                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                focus:ring-violetRed focus:border-violetRed block w-full p-2.5 dark:bg-gray-700 
                dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark: focus: ring-violetRed 
                dark:focus:border-violetRed"
                    placeholder="........"
                // required
                />
                {
                    errors.password && <small className="text-red-600 text-sm">{errors.password.message}</small>
                }
                {/* <small className="text-red-600 text-sm">{emailErr}</small> */}
            </div>

            {
                loading ? (
                    <button
                        disabled
                        type="button"
                        className="w-full text-white bg-violetRed hover:bg-violetRed focus:ring-4 focus:outline-none 
                     focus:ring-violetRed font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violetRed 
                    dark:hover:bg-violetRed dark:focus:ring-violetRed">
                        <MiniButtonSpinner text="Signing you in, please wait..." />
                    </button>

                ) : (

                    <button
                        type="submit"
                        className="w-full text-white bg-violetRed hover:bg-violetRed focus:ring-4 focus:outline-none 
                         focus:ring-violetRed font-medium rounded-lg !important text-sm px-5 py-2.5 text-center dark:bg-violetRed 
                        dark:hover:bg-violetRed dark:focus:ring-violetRed"
                    >
                        Login
                    </button>
                )

            }


            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? {" "}
                <Link href="/register"
                    className="font-medium text-violetRed hover:underline dark:text-violetRed">
                    Signup
                </Link>
            </p>



        </form>

    )
}


export default LoginForm;