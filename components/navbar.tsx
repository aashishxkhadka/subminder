"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">SubMinder</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center gap-4">
            <ModeToggle/>
            <Link
              href="/subscription-lookup"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Check Subscription
            </Link>
            {session ? (
              <Button variant="outline" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 