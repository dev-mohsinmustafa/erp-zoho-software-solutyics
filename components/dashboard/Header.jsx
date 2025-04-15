"use client"

import { AlignJustify, Bell, ChevronDown, History, LayoutGrid, Plus, Settings, Users, } from 'lucide-react';
import SearchInput from './SearchInput';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { generateInitials } from '@/lib/generateInitials';
import Login from '@/app/login/page';
// import user from "../../public/user.png";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = ({ setShowSidebar }) => {

    const { data: session, status } = useSession();
    // const router = useRouter();

    // we have three states in status authenticated, loading, unauthenticated 
    if (status === "loading") {
        return <p>Loading User...</p>
    }
    // if (status === "unauthenticated") {
    //     // router.push("/login");
    //     return <Login />;
    // }

    // ? iska matlab if this session exist 
    // const username = session?.user?.name;
    // const username = session?.user?.name ?? "";
    // this name is too long so we can use split
    const username = session?.user?.name.split(" ")[0] ?? "";
    const initials = generateInitials(session?.user?.name);

    // function handleMenuClick() {
    //     setShowSidebar(true);
    // }
    return (
        <>

            {status === "unauthenticated" ? (<Login />) :
                (
                    <div className='bg-slate-100 h-14 flex items-center justify-between px-8 
        border border-b border-slate-200 '>
                        {/* block sm:hidden */}
                        <button className='lg:hidden' onClick={() => setShowSidebar(true)}>
                            <AlignJustify className='w-6 h-6 ' />
                        </button>
                        <div className="flex gap-3">
                            {/* Recent activities */}
                            <button className='hidden lg:block'>
                                <History className='w-6 h-6 ' />
                            </button>
                            {/* Search */}
                            <SearchInput />
                        </div>
                        <div className=" items-center gap-3 hidden lg:flex">
                            {/* Plus Icon */}
                            <div className="pr-2 border-r border-gray-300">
                                {/* <!-- Show tooltip on bottom --> */}
                                <button className='p-1 bg-blue-600 rounded-lg '>
                                    <Plus className='text-slate-50 w-4 h-4' />
                                </button>
                            </div>

                            <div className='flex pr-2 border-r border-gray-300 space-x-2'>
                                <button className='p-1 hover:bg-slate-200 rounded-lg '>
                                    <Users className='text-slate-900 w-4 h-4' />
                                </button>
                                <button className='p-1 hover:bg-slate-200 rounded-lg '>
                                    <Bell className='text-slate-900 w-4 h-4' />
                                </button>
                                <button className='p-1 hover:bg-slate-200 rounded-lg '>
                                    <Settings className='text-slate-900 w-4 h-4' />
                                </button>
                            </div>
                            {/*  */}
                            <div className="flex gap-3">
                                <DropdownMenu>
                                    {/* Button error */}
                                    {/* <DropdownMenuTrigger>
                            <button className='flex items-center'>
                                <span>{username}</span>
                                <ChevronDown className='w-4 h-4' />
                            </button>
                        </DropdownMenuTrigger> */}
                                    <DropdownMenuTrigger asChild>
                                        {/* <span>{username}</span> */}
                                        {/* <ChevronDown className='w-4 h-4' /> */}
                                        <button className='flex items-center'>
                                            <span>{username}</span>
                                            <ChevronDown className='w-4 h-4' />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => signOut()}>
                                            Logout
                                            {/* <button onClick={()=>signOut()}>Logout</button> */}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>Billing</DropdownMenuItem>
                                        <DropdownMenuItem>Team</DropdownMenuItem>
                                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>



                                <button className='flex items-center'>
                                    {
                                        session?.user?.image ? (
                                            <Image src={session.user.image} alt='user image' width={96} height={96}
                                                className='rounded-full w-8 h-8 border border-slate-800 ' />
                                        ) : (
                                            <div className='rounded-full w-8 h-8 border border-slate-800 bg-white'>
                                                {initials}
                                            </div>
                                        )
                                    }

                                </button>

                                <button>
                                    <LayoutGrid className='w-6 h-6 text-slate-900' />
                                </button>
                            </div>
                            {/*  */}

                        </div>

                        <button className='flex items-center lg:hidden'>
                            <Image src="/user.png" alt='user image' width={96} height={96}
                                className='rounded-full w-8 h-8 border border-slate-800 ' />
                        </button>

                    </div>
                )
            }
        </>
    )
}

export default Header;