import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface Business {
  id: string
  name: string
  email: string
  phone: string
  address: string
  registrationDate: string
  logoUrl?: string
  industryType: string
}

interface BusinessFormData {
  name: string
  email: string
  phone: string
  address: string
  password: string
  industryType: string
  logoUrl?: string
}

export function useBusiness() {
  return useQuery<Business>({
    queryKey: ["business"],
    queryFn: async () => {
      const response = await fetch("/api/business")
      if (!response.ok) {
        throw new Error("Failed to fetch business")
      }
      return response.json()
    },
  })
}

export function useUpdateBusiness() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<BusinessFormData> }) => {
      const response = await fetch(`/api/business/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update business")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business"] })
      toast.success("Business updated successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useDeleteBusiness() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/business/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete business")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business"] })
      toast.success("Business deleted successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
} 