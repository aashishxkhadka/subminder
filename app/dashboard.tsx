"use client"

import { useState, useEffect } from "react"
import {
  Bell,
  CreditCard,
  DollarSign,
  HelpCircle,
  Home,
  LineChartIcon,
  Menu,
  Moon,
  Settings,
  Users,
  Download,
  Plus,
  RefreshCw,
  Sun,
  Edit,
  Trash,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardFooter, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer } from "@/components/chart/chart-container"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { UserNav } from "@/components/user-nav"
import { useMembers, useCreateMember, useUpdateMember, useDeleteMember } from "@/hooks/use-members"
import { useSubscriptionPlans } from "@/hooks/use-subscription-plans"
import { Member, MemberFormData } from "@/types/member"
import { MemberForm } from "@/components/member-form"

interface MetricCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend?: "up" | "down"
}

function MetricCard({ title, value, description, icon, trend = "up" }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trend === "up" ? "text-green-500" : "text-red-500"}`}>{description}</p>
      </CardContent>
    </Card>
  )
}

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

function DesktopSidebar({ activeSection, setActiveSection }: SidebarProps) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/subminder-logo.png" alt="Subminder" width={120} height={30} className="h-auto" priority />
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              activeSection === "dashboard"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveSection("dashboard")}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              activeSection === "subscriptions"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveSection("subscriptions")}
          >
            <CreditCard className="h-4 w-4" />
            Subscriptions
          </Link>
          <Link
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              activeSection === "customers"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveSection("customers")}
          >
            <Users className="h-4 w-4" />
            Customers
          </Link>
          <Link
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              activeSection === "billing"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveSection("billing")}
          >
            <DollarSign className="h-4 w-4" />
            Billing
          </Link>
          <Link
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              activeSection === "analytics"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveSection("analytics")}
          >
            <LineChartIcon className="h-4 w-4" />
            Analytics
          </Link>
          <Link
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              activeSection === "settings"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveSection("settings")}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Need Help?</CardTitle>
            <CardDescription className="text-xs">Contact our support team</CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0">
            <Button variant="outline" size="sm" className="w-full">
              <HelpCircle className="mr-2 h-4 w-4" />
              Support
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

function MobileSidebar({ activeSection, setActiveSection }: SidebarProps) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/subminder-logo.png" alt="Subminder" width={120} height={30} className="h-auto" priority />
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              activeSection === "dashboard"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveSection("dashboard")}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              activeSection === "subscriptions"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveSection("subscriptions")}
          >
            <CreditCard className="h-4 w-4" />
            Subscriptions
          </Link>
          <Link
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              activeSection === "customers"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveSection("customers")}
          >
            <Users className="h-4 w-4" />
            Customers
          </Link>
          <Link
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              activeSection === "billing"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveSection("billing")}
          >
            <DollarSign className="h-4 w-4" />
            Billing
          </Link>
          <Link
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              activeSection === "analytics"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveSection("analytics")}
          >
            <LineChartIcon className="h-4 w-4" />
            Analytics
          </Link>
          <Link
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              activeSection === "settings"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveSection("settings")}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Get user name from localStorage
    const name = localStorage.getItem("userName") || "User"
    setUserName(name)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
      <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr]">
        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden absolute left-4 top-4 z-50">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] p-0">
            <MobileSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <div className="hidden border-r bg-muted/40 md:block">
          <DesktopSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>

        {/* Main Content */}
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center gap-4">
              <h1 className="text-xl font-semibold md:text-2xl">
                {activeSection === "dashboard" && "Dashboard"}
                {activeSection === "subscriptions" && "Subscriptions"}
                {activeSection === "customers" && "Customers"}
                {activeSection === "billing" && "Billing"}
                {activeSection === "analytics" && "Analytics"}
                {activeSection === "settings" && "Settings"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <UserNav />
            </div>
          </header>
          <main className="flex-1 p-6">
            {activeSection === "dashboard" && <DashboardContent />}
            {activeSection === "customers" && <CustomersContent />}
            {activeSection === "billing" && <BillingContent />}
            {activeSection === "analytics" && <AnalyticsContent />}
            {activeSection === "subscriptions" && <SubscriptionsContent />}
            {activeSection === "settings" && <SettingsContent />}
          </main>
        </div>
      </div>
    </div>
  )
}

// Sample data for the components
const subscriptionData = [
  {
    id: 1,
    customer: "Sarah Johnson",
    plan: "Premium Annual",
    status: "Active",
    startDate: "Mar 12, 2023",
    nextBilling: "Mar 12, 2024",
    amount: "199.99",
  },
  {
    id: 2,
    customer: "Michael Chen",
    plan: "Standard Monthly",
    status: "Trial",
    startDate: "Apr 05, 2023",
    nextBilling: "May 05, 2023",
    amount: "29.99",
  },
  {
    id: 3,
    customer: "Emma Williams",
    plan: "Basic Monthly",
    status: "Pending",
    startDate: "Apr 18, 2023",
    nextBilling: "May 18, 2023",
    amount: "9.99",
  },
  {
    id: 4,
    customer: "James Rodriguez",
    plan: "Enterprise Annual",
    status: "Active",
    startDate: "Jan 01, 2023",
    nextBilling: "Jan 01, 2024",
    amount: "499.99",
  },
  {
    id: 5,
    customer: "Olivia Smith",
    plan: "Premium Monthly",
    status: "Canceled",
    startDate: "Feb 15, 2023",
    nextBilling: null,
    amount: "19.99",
  },
]

const customerData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    subscriptions: 2,
    joined: "Mar 12, 2022",
    status: "Active",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    subscriptions: 1,
    joined: "Apr 05, 2022",
    status: "Active",
  },
  {
    id: 3,
    name: "Emma Williams",
    email: "emma.williams@example.com",
    subscriptions: 1,
    joined: "Apr 18, 2022",
    status: "Active",
  },
  {
    id: 4,
    name: "James Rodriguez",
    email: "james.rodriguez@example.com",
    subscriptions: 3,
    joined: "Jan 01, 2022",
    status: "Active",
  },
  {
    id: 5,
    name: "Olivia Smith",
    email: "olivia.smith@example.com",
    subscriptions: 0,
    joined: "Feb 15, 2022",
    status: "Inactive",
  },
]

const invoiceData = [
  {
    id: "10045",
    customer: "Sarah Johnson",
    amount: "199.99",
    date: "Mar 12, 2023",
    dueDate: "Mar 26, 2023",
    status: "Paid",
  },
  {
    id: "10046",
    customer: "Michael Chen",
    amount: "29.99",
    date: "Apr 05, 2023",
    dueDate: "Apr 19, 2023",
    status: "Pending",
  },
  {
    id: "10047",
    customer: "Emma Williams",
    amount: "9.99",
    date: "Apr 18, 2023",
    dueDate: "May 02, 2023",
    status: "Pending",
  },
  {
    id: "10048",
    customer: "James Rodriguez",
    amount: "499.99",
    date: "Jan 01, 2023",
    dueDate: "Jan 15, 2023",
    status: "Paid",
  },
  {
    id: "10049",
    customer: "Olivia Smith",
    amount: "19.99",
    date: "Feb 15, 2023",
    dueDate: "Mar 01, 2023",
    status: "Overdue",
  },
]

// Helper functions
function getStatusVariant(status: string) {
  switch (status) {
    case "Active":
      return "default"
    case "Trial":
      return "secondary"
    case "Pending":
      return "outline"
    case "Canceled":
      return "destructive"
    default:
      return "secondary"
  }
}

function getBillingStatusVariant(status: string) {
  switch (status) {
    case "Paid":
      return "default"
    case "Pending":
      return "secondary"
    case "Overdue":
      return "destructive"
    default:
      return "secondary"
  }
}

// Update the DashboardContent function to include demo data and charts
function DashboardContent() {
  return (
    <Tabs defaultValue="overview">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <CreditCard className="mr-2 h-4 w-4" />
                New Subscription
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Subscription</DialogTitle>
                <DialogDescription>
                  Add a new subscription for a customer. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customer" className="text-right">
                    Customer
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="michael">Michael Chen</SelectItem>
                      <SelectItem value="emma">Emma Williams</SelectItem>
                      <SelectItem value="james">James Rodriguez</SelectItem>
                      <SelectItem value="olivia">Olivia Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plan" className="text-right">
                    Plan
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic-monthly">Basic Monthly ($9.99)</SelectItem>
                      <SelectItem value="standard-monthly">Standard Monthly ($29.99)</SelectItem>
                      <SelectItem value="premium-monthly">Premium Monthly ($49.99)</SelectItem>
                      <SelectItem value="basic-annual">Basic Annual ($99.99)</SelectItem>
                      <SelectItem value="standard-annual">Standard Annual ($299.99)</SelectItem>
                      <SelectItem value="premium-annual">Premium Annual ($499.99)</SelectItem>
                      <SelectItem value="enterprise">Enterprise ($999.99)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start-date" className="text-right">
                    Start Date
                  </Label>
                  <Input
                    id="start-date"
                    type="date"
                    className="col-span-3"
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="billing-cycle" className="text-right">
                    Billing Cycle
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select billing cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Subscription</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <TabsContent value="overview" className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="$24,563.82"
            description="+15.2% from last month"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <MetricCard
            title="Active Subscriptions"
            value="1,248"
            description="+8.4% from last month"
            icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
          />
          <MetricCard
            title="New Customers"
            value="342"
            description="+12.7% from last month"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <MetricCard
            title="Churn Rate"
            value="2.4%"
            description="-0.5% from last month"
            icon={<LineChartIcon className="h-4 w-4 text-muted-foreground" />}
            trend="down"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Revenue Growth</CardTitle>
              <CardDescription>Monthly revenue for the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Subscription Distribution</CardTitle>
              <CardDescription>By plan type</CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionDistributionChart />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Subscriptions</CardTitle>
              <CardDescription>Latest subscription activities</CardDescription>
            </div>
            <Input placeholder="Search subscriptions..." className="max-w-xs" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptionData.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-medium">{subscription.customer}</TableCell>
                    <TableCell>{subscription.plan}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(subscription.status)}>{subscription.status}</Badge>
                    </TableCell>
                    <TableCell>{subscription.startDate}</TableCell>
                    <TableCell>${subscription.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing 5 of 24 subscriptions</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Analytics</CardTitle>
            <CardDescription>Detailed metrics and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center border rounded-md">
              <p className="text-muted-foreground">Analytics content will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>Generate and view reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center border rounded-md">
              <p className="text-muted-foreground">Reports content will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reminders" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Automated Reminders</CardTitle>
            <CardDescription>Schedule and manage automated customer notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Upcoming Reminders</h3>
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>May 5, 2023</TableCell>
                    <TableCell>Michael Chen</TableCell>
                    <TableCell>Subscription Renewal</TableCell>
                    <TableCell>Email & SMS</TableCell>
                    <TableCell>
                      <Badge variant="outline">Scheduled</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>May 12, 2023</TableCell>
                    <TableCell>Sarah Johnson</TableCell>
                    <TableCell>Subscription Renewal</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>
                      <Badge variant="outline">Scheduled</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>May 18, 2023</TableCell>
                    <TableCell>Emma Williams</TableCell>
                    <TableCell>Trial Ending</TableCell>
                    <TableCell>Email & SMS</TableCell>
                    <TableCell>
                      <Badge variant="outline">Scheduled</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Recent Notifications</h3>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Apr 28, 2023 09:15 AM</TableCell>
                    <TableCell>Sarah Johnson</TableCell>
                    <TableCell>Renewal Reminder</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>
                      <Badge variant="success">Delivered</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Apr 27, 2023 10:30 AM</TableCell>
                    <TableCell>Michael Chen</TableCell>
                    <TableCell>Payment Failed</TableCell>
                    <TableCell>SMS & Email</TableCell>
                    <TableCell>
                      <Badge variant="success">Delivered</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Apr 25, 2023 03:45 PM</TableCell>
                    <TableCell>Emma Williams</TableCell>
                    <TableCell>Subscription Expiring</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Failed</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Retry
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Custom Reminder
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

// Update the CustomersContent function to include demo data
function CustomersContent() {
  const { data: members, isLoading } = useMembers()
  const { data: subscriptionPlans } = useSubscriptionPlans()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const createMember = useCreateMember()
  const updateMember = useUpdateMember()
  const deleteMember = useDeleteMember()

  const handleAddMember = (data: MemberFormData) => {
    createMember.mutate(data, {
      onSuccess: () => {
        setIsAddDialogOpen(false)
      },
    })
  }

  const handleUpdateMember = (data: MemberFormData) => {
    if (editingMember) {
      updateMember.mutate(
        { id: editingMember.id, data },
        {
          onSuccess: () => {
            setIsEditDialogOpen(false)
            setEditingMember(null)
          },
        }
      )
    }
  }

  const handleDeleteMember = (id: string) => {
    deleteMember.mutate(id)
  }

  const filteredMembers = members?.filter((member) =>
    member.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeSubscriptions = members?.filter((member) => member.subscriptionStatus === "active").length || 0
  const expiringSoon = members?.filter((member) => {
    const endDate = new Date(member.endDate)
    const today = new Date()
    const daysUntilExpiry = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0
  }).length || 0
  const expiredSubscriptions = members?.filter((member) => member.subscriptionStatus === "expired").length || 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button variant="default" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Customers"
          value={members?.length.toString() || "0"}
          description="Total number of customers"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Active Subscriptions"
          value={activeSubscriptions.toString()}
          description="Currently active subscriptions"
          icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Expiring Soon"
          value={expiringSoon.toString()}
          description="Subscriptions expiring in 30 days"
          icon={<AlertCircle className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Expired"
          value={expiredSubscriptions.toString()}
          description="Expired subscriptions"
          icon={<XCircle className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>Manage your customers and their subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Subscription Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredMembers?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No customers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredMembers?.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.fullName}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>{member.subscriptionPlan?.planName}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          member.subscriptionStatus === "active"
                            ? "default"
                            : member.subscriptionStatus === "expired"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {member.subscriptionStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingMember(member)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Customer</DialogTitle>
            <DialogDescription>Add a new customer to your business</DialogDescription>
          </DialogHeader>
          <MemberForm
            onSubmit={handleAddMember}
            subscriptionPlans={subscriptionPlans || []}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>Update customer information</DialogDescription>
          </DialogHeader>
          {editingMember && (
            <MemberForm
              defaultValues={{
                fullName: editingMember.fullName,
                email: editingMember.email,
                phone: editingMember.phone,
                gender: editingMember.gender as "male" | "female" | "other",
                startDate: new Date(editingMember.startDate).toISOString().split("T")[0],
                endDate: new Date(editingMember.endDate).toISOString().split("T")[0],
                subscriptionPlanId: editingMember.subscriptionPlanId,
              }}
              onSubmit={handleUpdateMember}
              subscriptionPlans={subscriptionPlans || []}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Update the BillingContent function to include demo data
function BillingContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Billing</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <DollarSign className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value="$24,563.82"
          description="+15.2% from last month"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Outstanding Invoices"
          value="$3,428.91"
          description="+2.4% from last month"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          trend="up"
        />
        <MetricCard
          title="Paid Invoices"
          value="$21,134.91"
          description="+18.3% from last month"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Overdue Invoices"
          value="$1,245.00"
          description="-5.2% from last month"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          trend="down"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Manage your invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceData.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">INV-{invoice.id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>${invoice.amount}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={getBillingStatusVariant(invoice.status)}>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Send
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing 5 of 50 invoices</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

// Update the AnalyticsContent function to include demo data
function AnalyticsContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="last30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="last90days">Last 90 days</SelectItem>
              <SelectItem value="lastyear">Last year</SelectItem>
              <SelectItem value="alltime">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="MRR"
          value="$12,345.67"
          description="+8.2% from last month"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="ARR"
          value="$148,148.04"
          description="+8.2% from last month"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="LTV"
          value="$1,245.00"
          description="+3.1% from last month"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="CAC"
          value="$125.00"
          description="-2.3% from last month"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          trend="down"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>MRR Growth</CardTitle>
            <CardDescription>Monthly recurring revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md">
              <p className="text-muted-foreground">MRR Growth chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Churn Rate</CardTitle>
            <CardDescription>Customer churn over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md">
              <p className="text-muted-foreground">Churn Rate chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cohort Analysis</CardTitle>
          <CardDescription>Customer retention by cohort</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center border rounded-md">
            <p className="text-muted-foreground">Cohort analysis visualization will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Update the SubscriptionsContent function to include demo data
function SubscriptionsContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Subscriptions</h2>
        <div className="flex items-center gap-2">
          <Input placeholder="Search subscriptions..." className="w-64" />
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <CreditCard className="mr-2 h-4 w-4" />
                New Subscription
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Subscription</DialogTitle>
                <DialogDescription>
                  Add a new subscription for a customer. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customer" className="text-right">
                    Customer
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="michael">Michael Chen</SelectItem>
                      <SelectItem value="emma">Emma Williams</SelectItem>
                      <SelectItem value="james">James Rodriguez</SelectItem>
                      <SelectItem value="olivia">Olivia Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plan" className="text-right">
                    Plan
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic-monthly">Basic Monthly ($9.99)</SelectItem>
                      <SelectItem value="standard-monthly">Standard Monthly ($29.99)</SelectItem>
                      <SelectItem value="premium-monthly">Premium Monthly ($49.99)</SelectItem>
                      <SelectItem value="basic-annual">Basic Annual ($99.99)</SelectItem>
                      <SelectItem value="standard-annual">Standard Annual ($299.99)</SelectItem>
                      <SelectItem value="premium-annual">Premium Annual ($499.99)</SelectItem>
                      <SelectItem value="enterprise">Enterprise ($999.99)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start-date" className="text-right">
                    Start Date
                  </Label>
                  <Input
                    id="start-date"
                    type="date"
                    className="col-span-3"
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="billing-cycle" className="text-right">
                    Billing Cycle
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select billing cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Subscription</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Subscriptions"
          value="1,248"
          description="+8.4% from last month"
          icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Trial Subscriptions"
          value="156"
          description="+12.3% from last month"
          icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Canceled Subscriptions"
          value="32"
          description="+3.1% from last month"
          icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
          trend="up"
        />
        <MetricCard
          title="Renewal Rate"
          value="92.7%"
          description="+1.5% from last month"
          icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Subscriptions</CardTitle>
          <CardDescription>Manage all customer subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptionData.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">{subscription.customer}</TableCell>
                  <TableCell>{subscription.plan}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(subscription.status)}>{subscription.status}</Badge>
                  </TableCell>
                  <TableCell>{subscription.startDate}</TableCell>
                  <TableCell>{subscription.nextBilling || "N/A"}</TableCell>
                  <TableCell>${subscription.amount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing 5 of 24 subscriptions</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

// Update the SettingsContent function to include demo data
function SettingsContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage your account settings and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input id="company-name" defaultValue="Acme Inc." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-email">Company Email</Label>
            <Input id="company-email" defaultValue="billing@acmeinc.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select defaultValue="utc-8">
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc-8">UTC-08:00 (Pacific Time)</SelectItem>
                <SelectItem value="utc-7">UTC-07:00 (Mountain Time)</SelectItem>
                <SelectItem value="utc-6">UTC-06:00 (Central Time)</SelectItem>
                <SelectItem value="utc-5">UTC-05:00 (Eastern Time)</SelectItem>
                <SelectItem value="utc">UTC+00:00</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select defaultValue="usd">
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
                <SelectItem value="jpy">JPY (¥)</SelectItem>
                <SelectItem value="cad">CAD ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Automated Reminders</CardTitle>
          <CardDescription>Configure automated subscription reminders for your customers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reminder-channels">Reminder Channels</Label>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="email-channel" defaultChecked />
                <Label htmlFor="email-channel">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="sms-channel" defaultChecked />
                <Label htmlFor="sms-channel">SMS</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Reminder Events</Label>
            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Subscription Renewal</h4>
                    <p className="text-sm text-muted-foreground">Remind customers before their subscription renews</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="renewal-days">Days Before</Label>
                    <Select defaultValue="7">
                      <SelectTrigger>
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="renewal-template">Template</Label>
                    <Select defaultValue="default-renewal">
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default-renewal">Default Renewal</SelectItem>
                        <SelectItem value="friendly-renewal">Friendly Reminder</SelectItem>
                        <SelectItem value="business-renewal">Business Renewal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Reminder Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Add the chart components
function RevenueChart() {
  const chartData = [
    { name: "Jan", revenue: 18000 },
    { name: "Feb", revenue: 16500 },
    { name: "Mar", revenue: 19800 },
    { name: "Apr", revenue: 21200 },
    { name: "May", revenue: 23400 },
    { name: "Jun", revenue: 24500 },
  ]

  return (
    <ChartContainer
      config={{
        revenue: {
          label: "Revenue",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-revenue)",
              r: 4,
            }}
            activeDot={{
              r: 6,
              fill: "var(--color-revenue)",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

function SubscriptionDistributionChart() {
  const chartData = [
    { name: "Basic", value: 35 },
    { name: "Standard", value: 45 },
    { name: "Premium", value: 15 },
    { name: "Enterprise", value: 5 },
  ]

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

  return (
    <ChartContainer
      config={{
        plans: {
          label: "Subscription Plans",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Pie key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
