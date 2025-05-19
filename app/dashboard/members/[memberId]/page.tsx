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
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const memberSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  gender: z.string().min(1, "Gender is required"),
  subscriptionStatus: z.string().min(1, "Status is required"),
})

type MemberForm = z.infer<typeof memberSchema>

async function fetchMember(memberId: string) {
  const res = await axios.get(`/api/member/${memberId}`)
  return res.data
}

async function updateMember({ memberId, data }: { memberId: string; data: MemberForm }) {
  const res = await axios.patch(`/api/member/${memberId}`, data)
  return res.data
}

export default function EditMemberPage() {
  const router = useRouter()
  const params = useParams()
  const memberId = typeof params.memberId === "string" ? params.memberId : params.memberId?.[0]
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["member", memberId],
    queryFn: () => fetchMember(memberId),
    enabled: !!memberId,
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MemberForm>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      gender: "",
      subscriptionStatus: "",
    },
  })

  useEffect(() => {
    if (data) {
      reset({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        subscriptionStatus: data.subscriptionStatus,
      })
    }
  }, [data, reset])

  const mutation = useMutation({
    mutationFn: (formData: MemberForm) =>
      updateMember({ memberId, data: formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] })
      toast({ title: "Member updated!" })
      router.push("/dashboard/members")
    },
    onError: () => {
      toast({ title: "Failed to update member", variant: "destructive" })
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>Member not found.</div>
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Member</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            onSubmit={handleSubmit((formData) => mutation.mutate(formData))}
          >
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" {...register("fullName")} />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register("phone")} />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={data.gender}
                onValueChange={value => setValue("gender", value)}
                defaultValue={data.gender}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-red-500">{errors.gender.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="subscriptionStatus">Status</Label>
              <Select
                value={data.subscriptionStatus}
                onValueChange={value => setValue("subscriptionStatus", value)}
                defaultValue={data.subscriptionStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              {errors.subscriptionStatus && (
                <p className="text-sm text-red-500">{errors.subscriptionStatus.message}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting || mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/members")}
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