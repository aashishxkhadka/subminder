import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, BarChart3, Bell, Users, Shield, Zap, RefreshCw, Database, LineChart, Clock } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
    

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How Subminder Works</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Our subscription management system simplifies your business operations through automation, intelligent
                analytics, and seamless integrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Process</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple 4-Step Process</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg">
                Getting started with Subminder is quick and easy. Follow these four simple steps to transform your
                subscription management.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="relative">
              <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                1
              </div>
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <CreditCard className="h-12 w-12 text-primary mb-2" />
                  <h3 className="text-xl font-bold">Set Up Your Account</h3>
                  <p className="text-muted-foreground">
                    Create your account and configure your business settings, including payment gateways and tax rules.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="relative">
              <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                2
              </div>
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <RefreshCw className="h-12 w-12 text-primary mb-2" />
                  <h3 className="text-xl font-bold">Create Subscription Plans</h3>
                  <p className="text-muted-foreground">
                    Define your subscription plans with pricing tiers, billing cycles, and features.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="relative">
              <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                3
              </div>
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <Users className="h-12 w-12 text-primary mb-2" />
                  <h3 className="text-xl font-bold">Add Your Customers</h3>
                  <p className="text-muted-foreground">
                    Import existing customers or add them manually. Assign them to subscription plans.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="relative">
              <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                4
              </div>
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <Zap className="h-12 w-12 text-primary mb-2" />
                  <h3 className="text-xl font-bold">Automate & Grow</h3>
                  <p className="text-muted-foreground">
                    Set up automated billing, reminders, and use analytics to optimize your subscription business.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="w-full py-12 md:py-24 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Key System Components</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg">
                Discover how each component of Subminder works together to create a seamless subscription management
                experience.
              </p>
            </div>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Subscription Management</h3>
                  <p className="text-muted-foreground mt-2">
                    Create and manage multiple subscription plans with different pricing tiers, billing cycles, and
                    features. Support for trial periods, setup fees, and promotional discounts. Easily handle upgrades,
                    downgrades, and plan changes with prorated billing.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Automated Reminders</h3>
                  <p className="text-muted-foreground mt-2">
                    Set up automated email and SMS reminders for renewals, payment due dates, and subscription changes.
                    Customize reminder templates and timing based on your business needs. Reduce churn with targeted
                    communication at critical moments in the subscription lifecycle.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Customer Management</h3>
                  <p className="text-muted-foreground mt-2">
                    Maintain comprehensive customer profiles with subscription history, payment methods, and
                    communication preferences. Segment customers based on plan type, billing cycle, or custom
                    attributes. Provide self-service portals for customers to manage their subscriptions.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Analytics & Reporting</h3>
                  <p className="text-muted-foreground mt-2">
                    Access real-time dashboards showing key metrics like Monthly Recurring Revenue (MRR), churn rate,
                    and customer lifetime value. Generate detailed reports on subscription performance, revenue
                    forecasts, and customer behavior. Use data-driven insights to optimize your subscription strategy.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Billing Automation</h3>
                  <p className="text-muted-foreground mt-2">
                    Automate recurring billing with support for multiple payment gateways and currencies. Handle failed
                    payments with customizable retry schedules and dunning management. Generate and send professional
                    invoices automatically, with support for custom branding and tax calculations.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Security & Compliance</h3>
                  <p className="text-muted-foreground mt-2">
                    Ensure PCI compliance for secure payment processing. Implement role-based access controls for team
                    members. Maintain data privacy in accordance with GDPR, CCPA, and other regulations. Regular
                    security audits and updates to protect your business and customer data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Integrations</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Seamless Connections</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg">
                Subminder integrates with your existing business tools to create a unified workflow.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <CreditCard className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Payment Gateways</h3>
                  <p className="text-muted-foreground">
                    Connect with popular payment processors including Stripe, PayPal, Braintree, and more.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <LineChart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Accounting Software</h3>
                  <p className="text-muted-foreground">
                    Sync with QuickBooks, Xero, and other accounting platforms for streamlined financial management.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">CRM Systems</h3>
                  <p className="text-muted-foreground">
                    Integrate with Salesforce, HubSpot, and other CRM platforms to maintain customer relationships.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="w-full py-12 md:py-24 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Timeline</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Implementation Timeline</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg">
                Get up and running quickly with our streamlined implementation process.
              </p>
            </div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-border transform -translate-x-1/2"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="md:text-right md:pr-8">
                  <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-primary transform -translate-x-1/2 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Day 1: Account Setup</h3>
                  <p className="text-muted-foreground mt-2">
                    Create your account, configure basic settings, and connect your payment gateway.
                  </p>
                </div>
                <div className="md:pl-8"></div>
              </div>

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="md:text-right md:pr-8 md:order-1 order-2"></div>
                <div className="md:pl-8 order-1 md:order-2">
                  <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-primary transform -translate-x-1/2 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Days 2-3: Plan Configuration</h3>
                  <p className="text-muted-foreground mt-2">
                    Set up your subscription plans, pricing tiers, and billing cycles.
                  </p>
                </div>
              </div>

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="md:text-right md:pr-8">
                  <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-primary transform -translate-x-1/2 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Days 4-5: Customer Import</h3>
                  <p className="text-muted-foreground mt-2">
                    Import your existing customers and assign them to subscription plans.
                  </p>
                </div>
                <div className="md:pl-8"></div>
              </div>

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="md:text-right md:pr-8 md:order-1 order-2"></div>
                <div className="md:pl-8 order-1 md:order-2">
                  <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-primary transform -translate-x-1/2 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Week 2: Automation Setup</h3>
                  <p className="text-muted-foreground mt-2">
                    Configure automated billing, reminders, and notifications.
                  </p>
                </div>
              </div>

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="md:text-right md:pr-8">
                  <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-primary transform -translate-x-1/2 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Week 3: Go Live</h3>
                  <p className="text-muted-foreground mt-2">
                    Launch your fully configured subscription management system.
                  </p>
                </div>
                <div className="md:pl-8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to Transform Your Subscription Business?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of businesses that trust Subminder to automate their subscription management.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" className="w-full min-[400px]:w-auto">
                  Get Started Today
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                  Request a Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
