"use client";

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, CheckCircle, BarChart, Bell, Users, Shield } from "lucide-react"
import Navbar from "@/components/navbar"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handlePlanSelection = async (plan: string) => {
    try {
      setIsLoading(plan)
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      {/* <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/subminder-logo.png"
                alt="Subminder Logo"
                width={150}
                height={40}
                className="h-auto"
                priority
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simplify Your <span className="italic border-b-4 hover:border-b-8 border-primary hover:translate-y-1">Subscription</span> Management
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-lg">
                  Streamline your subscription business with our all-in-one platform. Track revenue, manage customers,
                  and automate billing in one place.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="w-full min-[400px]:w-auto">
                    Get Started
                  </Button>
                </Link>

                <Link
                  href="/subscription-check"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <Button variant={'outline'} size={'lg'} className="w-full min-[400px]:w-auto">
                    Check Subscription
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[600px] overflow-hidden rounded-lg border bg-background shadow-xl">
                <img
                  src="https://i.pinimg.com/736x/4e/07/87/4e07877b7689049d4b53b698ab9bd51b.jpg"
                  alt="Dashboard Preview"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides all the tools you need to manage your subscription business effectively.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <BarChart className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Analytics Dashboard</h3>
                <p className="text-muted-foreground">
                  Gain insights into your subscription metrics with our comprehensive analytics dashboard.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <CreditCard className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Billing Management</h3>
                <p className="text-muted-foreground">Automate your billing process and manage invoices with ease.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Customer Management</h3>
                <p className="text-muted-foreground">
                  Keep track of all your customers and their subscription details in one place.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <Bell className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Automated Reminders</h3>
                <p className="text-muted-foreground">
                  Send automated reminders for renewals, payments, and other important events.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <CheckCircle className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Subscription Plans</h3>
                <p className="text-muted-foreground">
                  Create and manage multiple subscription plans with different pricing tiers.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <Shield className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Secure Platform</h3>
                <p className="text-muted-foreground">
                  Your data is secure with our enterprise-grade security measures.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that works best for your business.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-8">
            <Card className="flex flex-col">
              <CardContent className="p-6 flex-1">
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <p className="text-4xl font-bold">
                    $29<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                  <p className="text-muted-foreground">Perfect for small businesses just getting started.</p>
                  <ul className="grid gap-2 py-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Up to 100 subscriptions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Basic analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </div>
                <Button
                  className="w-full mt-auto"
                  onClick={() => handlePlanSelection('starter')}
                  disabled={isLoading === 'starter'}
                >
                  {isLoading === 'starter' ? 'Loading...' : 'Get Started'}
                </Button>
              </CardContent>
            </Card>
            <Card className="flex flex-col border-primary">
              <CardContent className="p-6 flex-1">
                <div className="flex flex-col gap-4">
                  <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground w-fit">
                    Popular
                  </div>
                  <h3 className="text-2xl font-bold">Professional</h3>
                  <p className="text-4xl font-bold">
                    $79<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                  <p className="text-muted-foreground">For growing businesses with more customers.</p>
                  <ul className="grid gap-2 py-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Up to 1,000 subscriptions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Priority email support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Automated reminders</span>
                    </li>
                  </ul>
                </div>
                <Button
                  className="w-full mt-auto"
                  onClick={() => handlePlanSelection('professional')}
                  disabled={isLoading === 'professional'}
                >
                  {isLoading === 'professional' ? 'Loading...' : 'Get Started'}
                </Button>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardContent className="p-6 flex-1">
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-4xl font-bold">
                    $199<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                  <p className="text-muted-foreground">For large businesses with complex needs.</p>
                  <ul className="grid gap-2 py-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Unlimited subscriptions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Custom analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>24/7 phone support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>API access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Custom integrations</span>
                    </li>
                  </ul>
                </div>
                <Button
                  className="w-full mt-auto"
                  onClick={() => handlePlanSelection('enterprise')}
                  disabled={isLoading === 'enterprise'}
                >
                  {isLoading === 'enterprise' ? 'Loading...' : 'Get Started'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to Simplify Your Subscription Management?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of businesses that trust Subminder for their subscription needs.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" className="w-full min-[400px]:w-auto">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

    </div>
  )
}
