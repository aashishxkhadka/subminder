import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'

const PRICE_IDS = {
  starter: process.env.STRIPE_STARTER_PRICE_ID,
  professional: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
  enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID,
}

export async function POST(req: Request) {
  try {
    const headersList = headers()
    const origin = headersList.get('origin')
    const { plan } = await req.json()

    // Add debug logging
    console.log('Selected plan:', plan)
    console.log('Price ID for plan:', PRICE_IDS[plan])
    console.log('All price IDs:', PRICE_IDS)

    if (!plan || !PRICE_IDS[plan]) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      )
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: PRICE_IDS[plan],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      metadata: {
        plan: plan,
      },
    });

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Error creating checkout session:', err)
    // Add more detailed error logging
    console.error('Error details:', {
      message: err.message,
      type: err.type,
      code: err.code,
      param: err.param,
    })
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}