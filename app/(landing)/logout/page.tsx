"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CreditCard } from "lucide-react"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear user data from localStorage
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")

    // Redirect to home page after a short delay
    setTimeout(() => {
      router.push("/")
    }, 1000)
  }, [router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="text-center">
        <CreditCard className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-2xl font-bold">Logging out...</h1>
        <p className="mt-2 text-muted-foreground">You will be redirected to the homepage shortly.</p>
      </div>
    </div>
  )
}
