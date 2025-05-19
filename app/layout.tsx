"use client"
import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'
import { Toast } from "@radix-ui/react-toast"
import { Toaster } from "sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient=new QueryClient()
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryClientProvider client={queryClient}>
          {children}
          </QueryClientProvider>
          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  )
}

