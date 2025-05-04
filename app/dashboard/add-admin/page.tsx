"use client"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { Router } from "lucide-react"
import { useRouter } from "next/navigation"


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
    const router=useRouter()

  const mutation = useMutation({
    mutationFn: async (data: BusinessFormData) => {
        console.log(data)
      const res = await axios.post("/api/user", data)
      return res.data
    },
    onSuccess: () => {
      toast.success("Registration Successful" )
      reset()
      router.push("/login")
    },
    onError: (error: any) => {
      toast.error("Registration Failed" )
    }
  })


  const onSubmit = (data: BusinessFormData) => {
    mutation.mutate(data)
  }

  return (
    <Card className="max-w-md mx-auto mt-8 shadow-xl rounded-2xl p-4">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Business Name</Label>
            <Input id="name" {...register("name", { required: "Business name is required" })} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email", { required: "Email is required" })} />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone", { required: "Phone number is required" })} />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register("address", { required: "Address is required" })} />
            {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
          </div>

          <div>
            <Label htmlFor="industryType">Industry Type</Label>
            <Input id="industryType" {...register("industryType", { required: "Industry type is required" })} />
            {errors.industryType && <p className="text-sm text-red-500">{errors.industryType.message}</p>}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password", { required: "Password is required" })} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Registering..." : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
