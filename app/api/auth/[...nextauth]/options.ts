import prisma from "@/prisma/prismaClient";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "m@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.business.findUnique({
          where: {
            email: credentials?.email
          }
        })
        if (!user) throw new Error("Invalid Credentials. Please try again.")
        if (!credentials?.password || !user?.password) throw new Error("Username and password required. Please try again.")
        const isPasswordValid = await bcrypt.compare(credentials?.password, user.password)

        if (!isPasswordValid) throw new Error("Invalid Credentials. Please try again.")
        return { id: user.id, email: user.email, name: user.name }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-expect-error we assume user.id exists every time
        session.user.id = token.userId as string;
        session.user.image = session.user.image || "https://github.com/shadcn.png";
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Specify custom login page if you have one
  },
  secret: process.env.NEXTAUTH_SECRET
}