"use client"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useState } from "react"

type BusinessFormData = {
  name: string
  email: string
  phone: string
  address: string
  industryType: string
  password: string
}

export default function BusinessRegisterForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BusinessFormData>()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  const mutation = useMutation({
    mutationFn: async (data: BusinessFormData) => {
      const res = await axios.post("/api/business", data)
      return res.data
    },
    onSuccess: () => {
      toast.success("Registration Successful")
      reset()
    },
    onError: () => {
      toast.error("Registration Failed")
    }
  })

  const onSubmit = (data: BusinessFormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create a business account</CardTitle>
          <CardDescription>
            Enter your information to create your business account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Business Name</Label>
              <Input
                id="name"
                placeholder="Acme Corp"
                {...register("name", { required: "Business name is required" })}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="business@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="+1 555 123 4567"
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="123 Main St, Springfield"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
            </div>
            <div>
              <Label htmlFor="industryType">Industry Type</Label>
              <Input
                id="industryType"
                placeholder="Retail, SaaS, Consulting..."
                {...register("industryType", { required: "Industry type is required" })}
              />
              {errors.industryType && <p className="text-sm text-red-500">{errors.industryType.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required onCheckedChange={() => setChecked(!checked)} />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the{" "}
                <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
          </CardContent>
          <div className="px-6 pb-6">
            <Button type="submit" disabled={mutation.isPending || !checked} className="w-full">
              {mutation.isPending ? "Registering..." : "Register"}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  )
}
