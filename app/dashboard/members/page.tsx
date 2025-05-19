"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { format } from "date-fns"
import { useMembers, useDeleteMember } from "@/hooks/use-members"
import { MemberFormModal } from "@/components/member-form-modal"
import { useSession } from "next-auth/react"
import { useDebounce } from "@/hooks/use-debounce"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function MembersPage() {
  const { data: session } = useSession()
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<string>()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null)

  const debouncedSearch = useDebounce(search, 300)
  const pageSize = 10

  const { data, isLoading, error } = useMembers(page, pageSize, debouncedSearch, status)
  const deleteMember = useDeleteMember()

  const handleEdit = (member: any) => {
    setSelectedMember(member)
    setModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setMemberToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!memberToDelete) return
    try {
      await deleteMember.mutateAsync(memberToDelete)
      setDeleteDialogOpen(false)
      setMemberToDelete(null)
      toast.success("Member deleted")
    } catch (error) {
      // Error is handled by the mutation
    }
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedMember(null)
  }

  const isAdmin = session?.user?.role === "ADMIN"
  const isManager = session?.user?.role === "MANAGER"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Members</h2>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search members..."
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="w-64"
          />
          <Select
            value={status}
            onValueChange={value => {
              setStatus(value || undefined)
              setPage(1)
            }}
            // className="h-10 rounded-md border border-input bg-background px-3 py-2"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setModalOpen(true)}>+ Add New Member</Button>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Subscription Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7}>Error loading members</TableCell>
              </TableRow>
            ) : !data?.members.length ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-lg font-medium text-muted-foreground">No members found</p>
                    {(isAdmin || isManager) && (
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setModalOpen(true)}
                      >
                        Add your first member
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.members.map(member => (
                <TableRow key={member.id}>
                  <TableCell>{member.fullName}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{member.subscriptionPlan.planName}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${member.subscriptionStatus === "active"
                      ? "bg-green-100 text-green-800"
                      : member.subscriptionStatus === "suspended"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                      }`}>
                      {member.subscriptionStatus}
                    </span>
                  </TableCell>
                  <TableCell>{format(new Date(member.joinDate), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    {(
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          className="mr-2"
                          onClick={() => handleEdit(member)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(member.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        {/* Delete confirmation dialog */}
                        <AlertDialog open={deleteDialogOpen && memberToDelete === member.id} onOpenChange={setDeleteDialogOpen}>
                          <AlertDialogTrigger asChild>
                            <span />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">Delete Member</h3>
                              <p>Are you sure you want to delete this member? This action cannot be undone.</p>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={confirmDelete}
                                disabled={deleteMember.isPending}
                              >
                                {deleteMember.isPending ? "Deleting..." : "Delete"}
                              </Button>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {data?.pagination && data.pagination.pages > 1 && (
        <div className="flex justify-end items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {page} of {data.pagination.pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === data.pagination.pages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      <MemberFormModal
        open={modalOpen}
        onOpenChange={handleModalClose}
        member={selectedMember}
      />
    </div>
  )
}