"use client"

import React, { useState } from 'react'
import Header from '../../components/dashboard/Header';
import Sidebar from "../../components/dashboard/Sidebar";
import { useSession } from 'next-auth/react';
import Login from '../login/page';

const Layout = ({ children }) => {
  // const TAG = "Dashboard/Layout.js==>():";
  // For opening sidebar menu
  const [showSidebar, setShowSidebar] = useState(false);
  // ✅ Always call hooks at the top level
  const { data: session, status } = useSession();
  // console.log(TAG, session?.user); // ✅ Should print user details

  if (status === "loading") {
    return (
      // <div className="flex items-center justify-center min-h-screen">
      //   <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      //   <span className="ml-4 text-lg">Loading... back office outer layout.js</span>
      // </div>
      <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center min-h-screen z-50">
        <img
          src="/navLogo.png"
          alt="Solutyics Logo"
          className="w-16 h-16 mb-4"
        />
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-violetRed mt-2"></div>
        <p className="text-violetRed font-semibold mt-4">Loading dashboard, please wait...</p>      </div>

    );

  }
  // ✅ Instead of returning early, render conditionally inside JSX
  // if (status === "unauthenticated") {
  //   // return <Login /> // ❌ Returning before using `useSession` consistently
  // }
  return (
    <>
      {status === "unauthenticated" ? (
        <Login />
      ) : (
        <div className='flex'>

          {/* <div className='w-56 min-h-screen bg-slate-900 text-slate-50'>
        sidebar
        </div> */}
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <main className='lg:ml-60 ml-0 w-full bg-slate-100 min-h-screen'>
            <Header setShowSidebar={setShowSidebar} />
            {children}
          </main>
        </div>
      )
      }
    </>
  )
}

export default Layout;