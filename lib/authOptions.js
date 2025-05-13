//app/libs/authOptions.js
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./db";
import { compare } from "bcrypt";


const authOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
                // companyName: { label: "CompanyName", type: "companyName", placeholder: "companyName" },
                password: { label: "Password", type: "password", },
            },
            async authorize(credentials) {
                try {
                    // Check if User Credentials are Correct
                    if (!credentials?.email || !credentials.password) {
                        console.log("Not Inputs");
                        return null;

                    }
                    // Check if User Exists
                    const existingUser = await db.user.findUnique({
                        where: { email: credentials.email },
                    });
                    if (!existingUser) {
                        console.log("No user found");
                        return null;
                    }
                    // Check if password is correct
                    const passwordMatch = await compare(credentials.password, existingUser.hashedPassword);
                    if (!passwordMatch) {
                        console.log("Password Incorrect");
                        return null;
                    }
                    // return existingUser;
                    const user = {
                        id: existingUser.id,
                        name: existingUser.name,
                        email: existingUser.email,
                        companyName: existingUser.companyName,
                        role: existingUser.role, // Add role,
                        permissions: existingUser.permissions // Add permissions
                    }
                    console.log(user);
                    return user;


                } catch (error) {
                    console.log("Error in authorize function:", error);
                    return null; // ✅ Ensure function does not crash
                }

            },
        }),
    ],



    callbacks: {
        async session({ session, user, token }) {
            if (token) {
                session.user = {
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    companyName: token.companyName,
                    role: token.role, // Add role,
                    permissions: token.permissions // Add permissions to session
                };
            }
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            // if (user) {
            //     token.userId = user.id;
            // }
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.companyName = user.companyName;
                token.role = user.role; // Add role,
                token.permissions = user.permissions // Add permissions to token
            }
            return token;
        },
    },

}

export { authOptions };