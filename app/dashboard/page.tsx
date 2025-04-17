"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Dashboard from "../dashboard"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (!isLoggedIn) {
      // Redirect to login if not logged in
      router.push("/login")
    }
  }, [router])

  return <Dashboard />
}
