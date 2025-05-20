"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface SubscriptionData {
  status: string
  count: number
}

const COLORS = {
  active: "#22c55e",    // green-500
  inactive: "#ef4444",  // red-500
  suspended: "#f59e0b"  // amber-500
}

export function SubscriptionStats() {
  const [data, setData] = useState<SubscriptionData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/members')
        if (!response.ok) throw new Error('Failed to fetch data')
        const { members } = await response.json()

        // Count subscriptions by status
        const statusCounts = members.reduce((acc: { [key: string]: number }, member: any) => {
          const status = member.subscriptionStatus.toLowerCase()
          if (status === 'active' || status === 'inactive' || status === 'suspended') {
            acc[status] = (acc[status] || 0) + 1
          }
          return acc
        }, {})

        // Convert to array format for the chart
        const chartData = Object.entries(statusCounts).map(([status, count]) => ({
          status: status.charAt(0).toUpperCase() + status.slice(1),
          count
        }))

        setData(chartData)
      } catch (error) {
        console.error('Error fetching subscription stats:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="count"
            nameKey="status"
            label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.status.toLowerCase() as keyof typeof COLORS]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value} subscriptions`, 'Count']}
            labelFormatter={(label) => `${label} Status`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
} 