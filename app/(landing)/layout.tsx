"use client"
import type React from "react"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"

import { Toaster } from "sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"

const queryClient = new QueryClient()
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar/>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
            <Toaster position="top-right" />
          <Footer/>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

