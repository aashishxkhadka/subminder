"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const subscriptionSchema = z.object({
  planName: z.string().min(1, "Plan name is required"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 day"),
  features: z.string().min(1, "Features are required"),
})

type SubscriptionForm = z.infer<typeof subscriptionSchema>

async function fetchSubscription(subscriptionId: string) {
  const res = await axios.get(`/api/subscription`)
  // If you have a dedicated endpoint, use: `/api/subscription/${subscriptionId}`
  const all = res.data
  return all.find((s: any) => s.id === subscriptionId)
}

async function updateSubscription({ subscriptionId, data }: { subscriptionId: string; data: SubscriptionForm }) {
  const res = await axios.patch(`/api/subscription/${subscriptionId}`, data)
  return res.data
}

export default function EditSubscriptionPage() {
  const router = useRouter()
  const params = useParams()
  const subscriptionId = typeof params.subscriptionId === "string" ? params.subscriptionId : params.subscriptionId?.[0]

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["subscription", subscriptionId],
    queryFn: () => fetchSubscription(subscriptionId),
    enabled: !!subscriptionId,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubscriptionForm>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      planName: "",
      price: 0,
      duration: 1,
      features: "",
    },
  })

  useEffect(() => {
    if (data) {
      reset({
        planName: data.planName,
        price: data.price,
        duration: data.duration,
        features: data.features,
      })
    }
  }, [data, reset])

  const mutation = useMutation({
    mutationFn: (formData: SubscriptionForm) =>
      updateSubscription({ subscriptionId, data: formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
      toast({ title: "Subscription updated!" })
      router.push("/dashboard/subscription")
    },
    onError: () => {
      toast({ title: "Failed to update subscription", variant: "destructive" })
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>Subscription not found.</div>
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            onSubmit={handleSubmit((formData) => mutation.mutate(formData))}
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
                {mutation.isPending ? "Saving..." : "Save Changes"}
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