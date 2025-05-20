"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns"

interface SubscriptionData {
  name: string
  total: number
}

interface Member {
  id: string
  joinDate: string
  subscriptionPlan: {
    planName: string
  }
}

export function Overview() {
  const [data, setData] = useState<SubscriptionData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/members')
        if (!response.ok) throw new Error('Failed to fetch data')
        const { members } = await response.json()

        // Group members by month based on joinDate
        const monthlyData = Array.from({ length: 12 }, (_, i) => {
          const date = subMonths(new Date(), i)
          const monthName = format(date, 'MMM')
          const monthStart = startOfMonth(date)
          const monthEnd = endOfMonth(date)

          const count = members.filter((member: Member) => {
            const joinDate = new Date(member.joinDate)
            return joinDate >= monthStart && joinDate <= monthEnd
          }).length

          return {
            name: monthName,
            total: count
          }
        }).reverse()

        setData(monthlyData)
      } catch (error) {
        console.error('Error fetching subscription data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
} 