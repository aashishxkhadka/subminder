import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface Member {
  id: string
  fullName: string
  email: string
  phone: string
  gender: string
  subscriptionStatus: string
  startDate: Date
  endDate: Date
  subscriptionPlanId: string
  subscriptionPlan: {
    id: string
    planName: string
    price: number
  }
}

interface MemberFormData {
  fullName: string
  email: string
  phone: string
  gender: string
  startDate: string
  endDate: string
  subscriptionPlanId: string
}

// Fetch members
export function useMembers() {
  return useQuery<Member[]>({
    queryKey: ["members"],
    queryFn: async () => {
      const response = await fetch("/api/members")
      if (!response.ok) {
        throw new Error("Failed to fetch members")
      }
      return response.json()
    },
  })
}

// Create member
export function useCreateMember() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: MemberFormData) => {
      const response = await fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create member")
      }

      return response.json()
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

// Update member
export function useUpdateMember() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: MemberFormData }) => {
      const response = await fetch(`/api/members/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update member")
      }

      return response.json()
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

// Delete member
export function useDeleteMember() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/members/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to delete member")
      }

      return response.json()
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