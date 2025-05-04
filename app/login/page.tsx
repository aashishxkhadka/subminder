"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import Email from "next-auth/providers/email"

export default function LoginPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    console.log(formData.get("email"),"formData")
    try {
      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      })
      console.log(res)
      if (res?.error) {
        setLoading(false)
        return toast.error("Invalid credentials")
      }
      if (!res) return toast.error("somethign went wrong")
      toast.success("Login successful")
      router.push("/dashboard") 
      router.refresh()
    } catch (error) {
      setLoading(false)
      return toast.error("Something went wrong")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="absolute left-8 top-8 md:left-12 md:top-12">
        <Image src="/subminder-logo.png" alt="Subminder" width={150} height={40} className="h-auto" priority />
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Log in</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>

        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            {error && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="name@example.com"
               
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              
              <div className="relative">
                <Input
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"

                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal">
                Remember me for 30 days
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
