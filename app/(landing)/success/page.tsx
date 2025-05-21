import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import prisma from '@/prisma/prismaClient'
import { auth } from '@/auth'
import { LucideCheck } from 'lucide-react'

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string }
}) {
  const session = await auth()

  if (!session?.user?.email) {
    redirect('/login')
  }

  try {
    const sessionId = await searchParams.session_id

    // Retrieve the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(
      sessionId,
      {
        expand: ['customer', 'subscription'],
      }
    )

    if (!checkoutSession) {
      throw new Error('No session found')
    }

    // Get the business ID from the session user
    const business = await prisma.business.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!business) {
      throw new Error('Business not found')
    }

    // Get the member (using the name from checkout)
    const memberName = checkoutSession.customer_details?.name || 'N/A'

    // Calculate the amount from the checkout session
    const amount = checkoutSession.amount_total ? checkoutSession.amount_total / 100 : 0

    // Create a billing record
    await prisma.billing.create({
      data: {
        member: memberName, // Use the name from Stripe checkout
        amount: amount,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        status: 'paid',
        payment: {
          create: {
            method: 'Stripe',
            transactionId: checkoutSession.payment_intent?.toString() || 'unknown',
            paymentStatus: 'completed',
          },
        },
      },
    })

    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="mx-auto max-w-2xl text-center items-center justify-center">
          {/* <div className='size-20 bg-green-500 rounded-full flex items-center justify-center'>
            <LucideCheck className='size-10 text-white'/>
          </div> */}
          <h1 className="text-4xl font-bold tracking-tight  sm:text-6xl">
            Thank you for your payment!
          </h1>
          <p className="mt-6 text-lg leading-8 ">
            Your payment was successful and has been recorded. You can access your dashboard to view the billing details.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/dashboard"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error processing payment:', error)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Something went wrong
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We encountered an error while processing your payment. Please contact support for assistance.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    )
  }
}