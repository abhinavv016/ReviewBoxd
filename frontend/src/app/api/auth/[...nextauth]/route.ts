import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"


export const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
                rememberMe: { label: "Remember Me", type: "checkbox" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials.password) {
                    throw new Error("Missing credentials");
                }

                const user = await prisma.user.findUnique({
                    where: { username: credentials.username }
                })
                if (!user) {
                    throw new Error("No user found with this username");
                }

                const isValid = bcrypt.compare(credentials.password, user.password!);
                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user.id,
                    name: user.username,
                    email: user.email,
                    rememberMe: credentials.rememberMe === "on",
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 60,
        updateAge: 24 * 60 * 60,

    },

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const existing = await prisma.user.findUnique({
                    where: { email: user.email! },
                });
                if (!existing) {
                    await prisma.user.create({
                        data: {
                            email: user.email!,
                            username: user.email!.split("@")[0],
                        }
                    });
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            delete token.exp;
            return token;
        },
        async session({ session, token }) {
            if (session.user) session.user.id = token.id as string;
            return session;
        },
    }
})

export { handler as GET, handler as POST };