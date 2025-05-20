"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { format } from "date-fns"

interface Member {
  id: string
  fullName: string
  email: string
  joinDate: string
  subscriptionPlan: {
    planName: string
  }
  subscriptionStatus: string
}

export function RecentMembers() {
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/members?limit=5')
        if (!response.ok) throw new Error('Failed to fetch members')
        const { members } = await response.json()
        setMembers(members)
      } catch (error) {
        console.error('Error fetching members:', error)
      }
    }

    fetchMembers()
  }, [])

  return (
    <div className="space-y-8">
      {members.map((member) => (
        <div key={member.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{member.fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{member.fullName}</p>
            <p className="text-sm text-muted-foreground">
              {member.subscriptionPlan.planName} - {member.subscriptionStatus}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {format(new Date(member.joinDate), 'MMM d, yyyy')}
          </div>
        </div>
      ))}
    </div>
  )
} 