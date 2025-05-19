"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MemberForm } from "@/components/member-form"
import { useCreateMember, useUpdateMember } from "@/hooks/use-members"
import { toast } from "sonner"

interface MemberFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  member?: {
    id: string
    fullName: string
    email: string
    phone: string
    gender: string
    startDate: string
    endDate: string
    subscriptionStatus: string
    subscriptionPlanId: string
  }
}

export function MemberFormModal({ open, onOpenChange, member }: MemberFormModalProps) {
  const createMember = useCreateMember()
  const updateMember = useUpdateMember()

  const handleSubmit = async (data: any) => {
    try {
      if (member) {
        await updateMember.mutateAsync({ id: member.id, data })
      } else {
        await createMember.mutateAsync(data)
      }
      onOpenChange(false)
    } catch (error) {
      // Error is handled by the mutation
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{member ? "Edit Member" : "Add New Member"}</DialogTitle>
        </DialogHeader>
        <MemberForm
          onSubmit={handleSubmit}
          defaultValues={member}
          isLoading={createMember.isPending || updateMember.isPending}
        />
      </DialogContent>
    </Dialog>
  )
} 