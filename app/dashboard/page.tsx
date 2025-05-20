"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentMembers } from "@/components/dashboard/recent-members"
import { SubscriptionStats } from "@/components/dashboard/subscription-stats"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { useEffect, useState } from "react"
import { startOfMonth, endOfMonth, format } from "date-fns"

interface DashboardStats {
  totalMembers: number
  activeSubscriptions: number
  expiringThisMonth: number
  totalRevenue: number
}

interface Member {
  id: string
  subscriptionStatus: string
  endDate: string
  subscriptionPlan: {
    planName: string
    price: number
  }
}

export default function Page() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    activeSubscriptions: 0,
    expiringThisMonth: 0,
    totalRevenue: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/members')
        if (!response.ok) throw new Error('Failed to fetch data')
        const { members } = await response.json()

        const now = new Date()
        const monthStart = startOfMonth(now)
        const monthEnd = endOfMonth(now)

        const stats = members.reduce((acc: DashboardStats, member: Member) => {
          // Total members
          acc.totalMembers++

          // Active subscriptions and revenue
          if (member.subscriptionStatus.toLowerCase() === 'active') {
            acc.activeSubscriptions++
            // Add subscription plan price to total revenue
            acc.totalRevenue += member.subscriptionPlan.price
          }

          // Expiring this month
          const endDate = new Date(member.endDate)
          if (endDate >= monthStart && endDate <= monthEnd) {
            acc.expiringThisMonth++
          }

          return acc
        }, {
          totalMembers: 0,
          activeSubscriptions: 0,
          expiringThisMonth: 0,
          totalRevenue: 0
        })

        setStats(stats)
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalMembers}</div>
                <p className="text-xs text-muted-foreground">
                  All registered members
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Subscriptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
                <p className="text-xs text-muted-foreground">
                  Currently active subscriptions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Expiring This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.expiringThisMonth}</div>
                <p className="text-xs text-muted-foreground">
                  Subscriptions ending in {format(new Date(), 'MMMM')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${stats.totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  From active subscriptions
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Members</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentMembers />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Subscription Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <SubscriptionStats />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityFeed />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}