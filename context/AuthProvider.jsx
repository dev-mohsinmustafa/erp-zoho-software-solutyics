// "use client"

// // For getting session data of user
// import { SessionProvider } from "next-auth/react"

// export default function AuthProvider({ children, session, }) {
//     return (
//         <SessionProvider session={session}>
//             {children}
//         </SessionProvider>
//     )
// }

// after this we bring in layout.js


"use client"

import { SessionProvider } from "next-auth/react"
import { memo } from "react"

const AuthProvider = memo(function AuthProvider({ children, session }) {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
})

AuthProvider.displayName = "AuthProvider"

export default AuthProvider