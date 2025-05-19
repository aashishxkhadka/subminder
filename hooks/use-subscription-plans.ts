import { useQuery } from "@tanstack/react-query"

interface SubscriptionPlan {
  id: string
  planName: string
  price: number
  duration: number
  features: string
}

export function useSubscriptionPlans() {
  return useQuery<SubscriptionPlan[]>({
    queryKey: ["subscription-plans"],
    queryFn: async () => {
      const response = await fetch("/api/subscription-plans")
      if (!response.ok) {
        throw new Error("Failed to fetch subscription plans")
      }
      return response.json()
    },
  })
} 