"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { useEffect, useState } from "react"

interface SubscriptionData {
  name: string
  value: number
}

interface Member {
  id: string
  endDate: string
  subscriptionStatus: string
}

const COLORS = ["#0088FE", "#FF8042", "#FFBB28"]

export function SubscriptionStats() {
  const [data, setData] = useState<SubscriptionData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/members')
        if (!response.ok) throw new Error('Failed to fetch data')
        const { members } = await response.json()

        const stats = {
          active: 0,
          expired: 0,
          pending: 0
        }

        members.forEach((member: Member) => {
          switch (member.subscriptionStatus.toLowerCase()) {
            case 'active':
              stats.active++
              break
            case 'expired':
              stats.expired++
              break
            case 'pending':
              stats.pending++
              break
          }
        })

        setData([
          { name: "Active", value: stats.active },
          { name: "Expired", value: stats.expired },
          { name: "Pending", value: stats.pending }
        ])
      } catch (error) {
        console.error('Error fetching subscription stats:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
} 