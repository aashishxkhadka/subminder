import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { z } from "zod"

const memberSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  subscriptionStatus: z.string(),
  subscriptionPlanId: z.string(),
})

type Member = {
  id: string
  fullName: string
  email: string
  phone: string
  gender: string
  joinDate: string
  startDate: string
  endDate: string
  subscriptionStatus: string
  subscriptionPlan: {
    planName: string
  }
}

type MembersResponse = {
  members: Member[]
  pagination: {
    total: number
    pages: number
    page: number
    limit: number
  }
}

export function useMembers(page = 1, limit = 10, search = "", status?: string) {
  return useQuery<MembersResponse>({
    queryKey: ["members", page, limit, search, status],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(status && { status }),
      })
      const res = await fetch(`/api/members?${params}`)
      if (!res.ok) throw new Error("Failed to fetch members")
      return res.json()
    },
  })
}

export function useCreateMember() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: z.infer<typeof memberSchema>) => {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const error = await res.text()
        throw new Error(error)
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] })
      toast.success("Member created successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useUpdateMember() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: z.infer<typeof memberSchema> }) => {
      const res = await fetch(`/api/members/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const error = await res.text()
        throw new Error(error)
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] })
      toast.success("Member updated successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useDeleteMember() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/members/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        const error = await res.text()
        throw new Error(error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] })
      toast.success("Member deleted successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
} 