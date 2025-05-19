"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

const subscriptionSchema = z.object({
  planName: z.string().min(1, "Plan name is required"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 day"),
  features: z.string().min(1, "Features are required"),
  businessId: z.string().min(1, "Business is required"),
})

type SubscriptionForm = z.infer<typeof subscriptionSchema>

async function createSubscription(data: SubscriptionForm) {
  const res = await axios.post("/api/subscription", data)
  return res.data
}

export default function NewSubscriptionPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const session = useSession();
  const businessId = session.data?.user?.id || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscriptionForm>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      planName: "",
      price: 0,
      duration: 1,
      features: "",
      businessId: "",
    },
  })

  useEffect(() => {
    reset({
      planName: "",
      price: 0,
      duration: 1,
      features: "",
      businessId: businessId,
    })
  }, [businessId, reset])

  const mutation = useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
      toast({ title: "Subscription plan created!" })
      router.push("/dashboard/subscription")
    },
    onError: () => {
      toast({ title: "Failed to create subscription", variant: "destructive" })
    },
    onSettled: () => setIsSubmitting(false),
  })

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Subscription Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            onSubmit={handleSubmit((formData) => {
              setIsSubmitting(true)
              mutation.mutate(formData)
            })}
          >
            <div>
              <Label htmlFor="planName">Plan Name</Label>
              <Input id="planName" {...register("planName")} />
              {errors.planName && (
                <p className="text-sm text-red-500">{errors.planName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" step="0.01" {...register("price")} />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="duration">Duration (days)</Label>
              <Input id="duration" type="number" {...register("duration")} />
              {errors.duration && (
                <p className="text-sm text-red-500">{errors.duration.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="features">Features</Label>
              <Textarea id="features" {...register("features")} />
              {errors.features && (
                <p className="text-sm text-red-500">{errors.features.message}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting || mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Create Plan"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/subscription")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}