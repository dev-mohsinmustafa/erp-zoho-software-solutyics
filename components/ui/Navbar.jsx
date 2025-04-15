"use client"
import Loading from "@/app/loading";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import ThemeLink from "../ui/ThemeLink";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { generateInitials } from "@/lib/generateInitials";

const Navbar = () => {
    const { data: session, status } = useSession();
    const [show, setShow] = useState(false);
    console.log(session);

    // if (status === "loading") {
    //     return <Loading />
    // }
    // console.log(status);


    // function getInitials(fullName) {

    //     // split the fullName into an array
    //     const words = fullName.split(" ");
    //     let initials;
    //     for (let i = 0; i < words.length; i++) {
    //         initials += words[i][0];
    //     }
    //     initials = initials.toUpperCase();
    //     return initials;
    // };
    // function getInitials(fullName) {
    //     if (!fullName) return "MM"; // Default initials if name is missing

    //     // Split the name into words and extract first letters
    //     const words = fullName.split(" ");
    //     let initials = words.map(word => word[0]).join("");

    //     return initials.toUpperCase();
    // }


    // const initials = getInitials(session?.user?.name ?? "Mohsin Mustafa")
    const initials = generateInitials(session?.user?.name ?? "Mohsin Mustafa")


    return (
        <>
            {status === "loading" ? (
                <Loading /> // ✅ Fix: Conditionally render instead of returning early
            ) :
                (
                    <header className="bg-[#F4F4F4] shadow-md fixed top-0 right-0 w-full left-0 h-16 flex
            items-center justify-between px-16  font-sans font-semibold leading-6 text-[16px]
                     text-[#444444] tracking-[-0.5px]">
                        <Link href={"/"} className="font-bold text-2xl md:text-4xl">
                            Inventory
                        </Link>
                        <nav className="hidden sm:flex items-center gap-3 ">
                            <Link href={"/"} className="hover:text-[#9F4787]">Features</Link>
                            <Link href={"/"} className="hover:text-[#9F4787]">Pricing</Link>
                            <Link href={"/"} className="hover:text-[#9F4787]">Free Tools</Link>
                        </nav>


                        {
                            status === "authenticated" ? (
                                <div className="flex items-center gap-4 ">
                                    <div className="flex items-center space-x-4 ">
                                        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[#9F4787] rounded-full dark:bg-gray-600">
                                            <span className="font-medium text-slate-50 dark:text-gray-300">{initials}</span>
                                        </div>


                                        <div className="font-medium dark:text-white">
                                            <div >{session.user.name}</div>
                                            <div className="text-sm text-[#444444] dark:text-slate-400">{session.user.email}</div>
                                        </div>


                                    </div>

                                    <button onClick={() => signOut()}
                                        type="button"
                                        className=" bg-[#9F4787] hover:bg-rose-700 focus:ring-rose-300 text-white bg-gradient-to-r from-[#9F4787] via-[#9F4787] to-[#9F4787]
                            hover:bg-gradient-to-br focus:ring-4 focus:outline-none  dark:focus:ring-red-800
                            font-medium rounded-lg text-sm px-8 py-2.5 text-center mr-2 mb-2"
                                    >
                                        Logout
                                    </button>

                                </div>
                            ) : (
                                <div className="hidden sm:flex items-center gap-4  ">
                                    <Link href={"/login"} className="hover:text-[#9F4787]">Login</Link>
                                    <ThemeLink
                                        className="bg-[#9F4787] hover:bg-rose-700 focus:ring-rose-300 text-white"
                                        title="Register"
                                        href="/register"
                                    />
                                    {/* <Link href={"/"}
                            className="text-white bg-gradient-to-r from-[#9F4787] via-[#9F4787] to-[#9F4787] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-[#9F4787] dark:focus:ring-[#9F4787] font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2"
                        >Register</Link> */}
                                </div>
                            )
                        }

                        {/* Hamburger Menu */}
                        <button onClick={() => setShow(true)}
                            className="sm:hidden">
                            <BiMenu className="text-3xl" />
                        </button>
                    </header >
                )}


            <div className={
                show ? "sm:hidden fixed w-36 bg-slate-800 bg-opacity-90 h-screen right-0 z-50 top-0 p-4 text-slate-50"
                    :
                    "hidden sm:hidden fixed w-36 bg-slate-800 bg-opacity-90 h-screen right-0 z-50 top-0 p-4 text-slate-50"
            }
            >
                <div className="flex justify-between items-center mb-10">
                    <h2 className="font-bold">Inventory</h2>
                    <button onClick={() => setShow(false)}>
                        <AiOutlineClose className="text-2xl" />
                    </button>
                </div >


                <nav className="flex flex-col items-start gap-3 mb-10">
                    <Link href={"/"} className="">Features</Link>
                    <Link href={"/"}>Pricing</Link>
                    <Link href={"/"}>Free Tools</Link>
                </nav>

                <div className="flex flex-col items-start gap-4">
                    <Link href={"/login"}>Login</Link>
                    <ThemeLink
                        className="bg-[#9F4787] hover:bg-rose-700 focus:ring-rose-300"
                        title="Register"
                        href="/register"
                    />
                </div>

            </div>
            
        </>
    )
}

export default Navbar;