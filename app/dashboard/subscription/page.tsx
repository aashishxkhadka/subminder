"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

type SubscriptionPlan = {
  id: string
  planName: string
  price: number
  duration: number
  features: string
  businessId: string
}

async function fetchSubscriptions() {
  const res = await fetch("/api/subscription")
  if (!res.ok) throw new Error("Failed to fetch subscriptions")
  return res.json()
}

export default function Page() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data, isLoading, error } = useQuery<SubscriptionPlan[]>({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
  })

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const pageSize = 10

  const filtered = useMemo(() => {
    if (!data) return []
    return data.filter(plan =>
      plan.planName.toLowerCase().includes(search.toLowerCase())
    )
  }, [data, search])

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page])

  const totalPages = Math.ceil(filtered.length / pageSize)

  // Placeholder handlers for edit/delete
  const handleEdit = (id: string) => {
    router.push(`/dashboard/subscription/${id}`)
  }
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscription?")) return
    await fetch(`/api/subscription/${id}`, { method: "DELETE" })
    queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
  }

const session = useSession()
  

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Subscriptions</h2>
        <Input
          placeholder="Search subscriptions..."
          value={search}
          onChange={e => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="w-64"
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={() => router.push("/dashboard/subscription/new")} >+ Add New Subscription Plan</Button>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration (days)</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5}>Error loading subscriptions</TableCell>
              </TableRow>
            ) : paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>No subscriptions found</TableCell>
              </TableRow>
            ) : (
              paginated.map(plan => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.planName}</TableCell>
                  <TableCell>${plan.price.toFixed(2)}</TableCell>
                  <TableCell>{plan.duration}</TableCell>
                  <TableCell>{plan.features}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      className="mr-2"
                      onClick={() => handleEdit(plan.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(plan.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
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
          Page {page} of {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}