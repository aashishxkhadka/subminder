"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { toast } from "sonner"

interface SubscriptionDetails {
  fullName: string
  email: string
  subscriptionPlan: {
    planName: string
    price: number
  }
  subscriptionStatus: string
  startDate: string
  endDate: string
}

export default function SubscriptionLookup() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`/api/members/lookup?email=${encodeURIComponent(email)}`)
      if (!response.ok) {
        throw new Error('Failed to fetch subscription details')
      }

      const data = await response.json()
      if (data.member) {
        setSubscription(data.member)
      } else {
        toast.error('No subscription found for this email')
        setSubscription(null)
      }
    } catch (error) {
      toast.error('Failed to fetch subscription details')
      setSubscription(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Check Your Subscription Status</CardTitle>
          <CardDescription>
            Enter your email address to view your subscription details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Checking..." : "Check Subscription"}
            </Button>
          </form>

          {subscription && (
            <div className="mt-8 space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-2">Subscription Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {subscription.fullName}</p>
                  <p><span className="font-medium">Email:</span> {subscription.email}</p>
                  <p><span className="font-medium">Plan:</span> {subscription.subscriptionPlan.planName}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      subscription.subscriptionStatus.toLowerCase() === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : subscription.subscriptionStatus.toLowerCase() === 'expired'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {subscription.subscriptionStatus}
                    </span>
                  </p>
                  <p><span className="font-medium">Start Date:</span> {format(new Date(subscription.startDate), 'PPP')}</p>
                  <p><span className="font-medium">End Date:</span> {format(new Date(subscription.endDate), 'PPP')}</p>
                  <p><span className="font-medium">Price:</span> ${subscription.subscriptionPlan.price}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 