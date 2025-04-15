
"use client"

import { Building2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HomeNavbar = () => {

    const navLinks = [
        {
            title: "Dashboard",
            href: "/dashboard/home/overview",
        },
        {
            title: "Getting Started",
            href: "/dashboard/home/gettingStarted",
        },
        {
            title: "Recent Updates",
            href: "/dashboard/home/updates",
        },
        {
            title: "Announcements",
            href: "/dashboard/home/announcements",
        },
    ]


    // for hover in navLinks
    const pathname = usePathname();
    // console.log("Pathname:", pathname);




    const { data: session, status } = useSession();
    if (status === "loading") {
        return <p>Loading User...</p>
    }
    // remove this we already add this condition in layout.js in back-office dashboard
    // if (status === "unauthenticated") {
    //     return <Login />;
    // }
    const username = session?.user?.name.toUpperCase();
    const companyName = session?.user?.companyName;
    // const initials = generateInitials(session?.user?.name);


    return (
        <div className='h-32  p-5 header-bg bg-slate-50 border-b border-slate-300'>
            <div className="flex space-x-3">
                <div className="flex w-14 h-14 bg-white rounded-lg items-center justify-center">
                    <Building2 />
                </div>
                <div className='flex flex-col'>
                    {/* <p className='text-slate-700 font-semibold'>Hello, FULL STACK DEVELOPER</p> */}
                    <p className='text-slate-700 font-semibold'>Hello, {username}</p>
                    <span className='text-sm'>{companyName}</span>
                </div>
            </div>
            <nav className='sticky mt-4  flex space-x-4'>
                {/* <Link href={""} className='py-3  border-b-2 border-blue-600 '>Dashboard</Link> */}
                {/* <p>links</p> */}
                {/* {
                    navLinks.map((item, index) => (
                        <Link key={index} href={item.href}
                            // className='border-b-2 border-blue-600'
                            className={`${pathname === item.href ? "py-1 border-b-2 border-blue-600" : "py-1"}`}
                        >
                            {item.title}
                        </Link>
                    ))
                } */}

                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px">

                        {
                            navLinks.map((item, index) => (
                                <li className="me-2" key={index}>
                                    <Link href={item.href}
                                        className={`${pathname === item.href
                                            ?
                                            // "py-1 border-b-2 border-blue-600"
                                            "inline-block px-4 py-2 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                            :
                                            // "py-1"
                                            "inline-block px-4 py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                            }`}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))
                        }

                    </ul>
                </div>

            </nav>
        </div>
    )
}

export default HomeNavbar;