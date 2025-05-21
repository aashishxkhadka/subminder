import { auth } from "@/auth"
import prisma from "@/prisma/prismaClient"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export default async function Page() {
  const session = await auth()

  if (!session?.user?.email) {
    return <div>Please log in to view billing details</div>
  }

  // Get the business ID from the session user
  const business = await prisma.business.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  })

  if (!business) {
    return <div>Business not found</div>
  }

  // Fetch paid billing records with payment details
  const paidBillingRecords = await prisma.billing.findMany({
    where: {
      status: "paid"
    },
    include: {
      payment: {
        select: {
          method: true,
          paymentDate: true,
          transactionId: true
        }
      }
    },
    orderBy: {
      billingDate: 'desc'
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Paid Billing Records</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Billing Date</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paidBillingRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="font-medium">{record.member || 'N/A'}</div>
                  </TableCell>
                  <TableCell>${record.amount.toFixed(2)}</TableCell>
                  <TableCell>{format(new Date(record.billingDate), 'PPP')}</TableCell>
                  <TableCell>{record.payment?.method || 'N/A'}</TableCell>
                  <TableCell>{record.payment ? format(new Date(record.payment.paymentDate), 'PPP') : 'N/A'}</TableCell>
                  <TableCell className="font-mono text-sm">{record.payment?.transactionId || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant="default">Paid</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}