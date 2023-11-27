import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth/";

import CredentialProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials")
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user || !user.hashedPassword) {
                    throw new Error("Invalid credentials")
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if(!isCorrectPassword) {
                    throw new Error("Invalid credentials")
                }

                return user;
            }
        })
    ],
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };