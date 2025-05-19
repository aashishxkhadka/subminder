import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import bcrypt from "bcryptjs"
import prisma from "@/prisma/prismaClient"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials)

          const business = await prisma.business.findUnique({
            where: { email },
          })

          if (!business || !business.password) {
            throw new Error("Invalid email or password")
          }

          const isPasswordValid = await bcrypt.compare(password, business.password)
          if (!isPasswordValid) throw new Error("Invalid email or password")

          const user = {
            id: business.id,
            name: business.name,
            email: business.email,
            phone: business.phone,
            address: business.address,
          }

          return user
        } catch (error) {
          if (error instanceof ZodError) {
            console.log("ZodError:", error)
            return null
          }
          console.error("Authorize error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        //@ts-expect-error id exists here
        session.user.id = token.id
        session.user.name = token.name
        //@ts-expect-error email exists here
        session.user.email = token.email
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
  },
})
