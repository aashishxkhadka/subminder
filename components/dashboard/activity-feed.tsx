"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"

interface Activity {
  id: string
  type: string
  description: string
  timestamp: string
}

interface Member {
  id: string
  fullName: string
  joinDate: string
  subscriptionStatus: string
  subscriptionPlan: {
    planName: string
  }
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/members')
        if (!response.ok) throw new Error('Failed to fetch activities')
        const { members } = await response.json()

        // Create activities from member data
        const memberActivities = members
          .slice(0, 5)
          .map((member: Member) => ({
            id: member.id,
            type: "member",
            description: `${member.fullName} - ${member.subscriptionPlan.planName} (${member.subscriptionStatus})`,
            timestamp: member.joinDate
          }))

        setActivities(memberActivities)
      } catch (error) {
        console.error('Error fetching activities:', error)
      }
    }

    fetchActivities()
  }, [])

  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.description}
            </p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(activity.timestamp), 'MMM d, yyyy h:mm a')}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
} 