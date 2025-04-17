"use client"

import { useState } from "react"
import { CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bell,
  CreditCard,
  DollarSign,
  Download,
  HelpCircle,
  Home,
  LineChartIcon,
  Menu,
  Moon,
  Plus,
  RefreshCw,
  Settings,
  Sun,
  Users,
} from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Add a new import for the Checkbox component at the top of the file with the other imports
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"

// Add a new import for the Textarea component
import { Textarea } from "@/components/ui/textarea"

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Cancel</Button>
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
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Cancel</Button>
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
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Cancel</Button>
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
                      <Button variant="ghost" size="sm">View</Button>
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
                      <Button variant="ghost" size="sm">View</Button>
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
                      <Button variant="ghost" size="sm">Retry</Button>
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
        
        <Card>
          <CardHeader>
            <CardTitle>Reminder Templates</CardTitle>
            <CardDescription>Manage your notification templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Subscription Renewal</h4>
                    <Badge>Email & SMS</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Reminds customers about upcoming subscription renewals</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Preview</Button>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Payment Failed</h4>
                    <Badge>Email & SMS</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Notifies customers about failed payment attempts</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Preview</Button>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Trial Ending</h4>
                    <Badge>Email</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Reminds customers when their trial period is ending</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Preview</Button>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Subscription Expiring</h4>
                    <Badge>Email</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Notifies customers about expiring subscriptions</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Preview</Button>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Welcome Message</h4>
                    <Badge>Email & SMS</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Welcomes new customers after subscription signup</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Preview</Button>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 flex items-center justify-center border-dashed">
                <Button variant="ghost">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Template
                </Button>
              </Card>
            </div>
          </CardContent>
        </Card>
      
// Add a new dialog for creating custom reminders
// Add this code right before the closing </TabsContent> tag in the reminders tab section:

<Dialog>
  <DialogTrigger asChild>
    <Button className="hidden">Create Custom Reminder</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[600px]">
    <DialogHeader>
      <DialogTitle>Create Custom Reminder</DialogTitle>
      <DialogDescription>
        Set up a custom reminder for your customers. This will be sent via email or SMS based on your settings.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="reminder-type" className="text-right">
          Reminder Type
        </Label>
        <Select className="col-span-3">
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="renewal">Subscription Renewal</SelectItem>
            <SelectItem value="payment">Payment Reminder</SelectItem>
            <SelectItem value="trial">Trial Ending</SelectItem>
            <SelectItem value="expiration">Subscription Expiration</SelectItem>
            <SelectItem value="custom">Custom Message</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="customers" className="text-right">
          Recipients
        </Label>
        <div className="col-span-3 space-y-2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select customers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="active">Active Subscriptions</SelectItem>
              <SelectItem value="trial">Trial Customers</SelectItem>
              <SelectItem value="expiring">Expiring Subscriptions</SelectItem>
              <SelectItem value="custom">Custom Selection</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Checkbox id="filter-plan" />
            <Label htmlFor="filter-plan">Filter by plan</Label>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="channels" className="text-right">
          Channels
        </Label>
        <div className="col-span-3 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="channel-email" defaultChecked />
            <Label htmlFor="channel-email">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="channel-sms" defaultChecked />
            <Label htmlFor="channel-sms">SMS</Label>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="template" className="text-right">
          Template
        </Label>
        <Select className="col-span-3">
          <SelectTrigger>
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="renewal">Subscription Renewal</SelectItem>
            <SelectItem value="payment">Payment Reminder</SelectItem>
            <SelectItem value="trial">Trial Ending</SelectItem>
            <SelectItem value="expiration">Subscription Expiration</SelectItem>
            <SelectItem value="custom">Custom Template</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="schedule-date" className="text-right">
          Schedule Date
        </Label>
        <Input
          id="schedule-date"
          type="date"
          className="col-span-3"
          defaultValue={new Date().toISOString().split('T')[0]}
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="schedule-time" className="text-right">
          Schedule Time
        </Label>
        <Input
          id="schedule-time"
          type="time"
          className="col-span-3"
          defaultValue="09:00"
        />
      </div>
      
      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor="message" className="text-right pt-2">
          Custom Message
        </Label>
        <Textarea
          id="message"
          placeholder="Enter a custom message or leave blank to use the template default"
          className="col-span-3"
          rows={4}
        />
      </div>
    </div>
    <DialogFooter>
      <Button variant="outline" type="button">Preview</Button>
      <Button type="submit">Schedule Reminder</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
      
<Dialog>
  <DialogTrigger asChild>
    <Button className="hidden">Preview Template</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[600px]">
    <DialogHeader>
      <DialogTitle>Template Preview</DialogTitle>
      <DialogDescription>
        Preview how your notification will appear to customers
      </DialogDescription>
    </DialogHeader>
    <Tabs defaultValue="email">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="email">Email Preview</TabsTrigger>
        <TabsTrigger value="sms">SMS Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="email" className="border rounded-md p-4 mt-4">
        <div className="space-y-4">
          <div className="border-b pb-2">
            <p className="text-sm text-muted-foreground">From: SubManager &lt;notifications@submanager.com&gt;</p>
            <p className="text-sm text-muted-foreground">To: [Customer Email]</p>
            <p className="text-sm text-muted-foreground">Subject: Your Subscription is Renewing Soon</p>
          </div>
          <div className="space-y-2">
            <p>Hello [Customer Name],</p>
            <p>This is a friendly reminder that your subscription to [Plan Name] will renew automatically on [Renewal Date].</p>
            <p>Your card ending in [Last 4] will be charged $[Amount].</p>
            <p>If you'd like to make any changes to your subscription, please visit your account dashboard or contact our support team.</p>
            <p className="pt-4">Thank you for your continued business!</p>
            <p>The SubManager Team</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="sms" className="border rounded-md p-4 mt-4">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">From: SubManager</p>
          <p className="text-sm text-muted-foreground">To: [Customer Phone]</p>
          <div className="bg-muted p-4 rounded-md">
            <p>SubManager: Your [Plan Name] subscription will renew on [Renewal Date] for $[Amount]. Need help? Reply HELP or call (555) 123-4567.</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
    <DialogFooter className="mt-4">
      <Button variant="outline" type="button">Edit Template</Button>
      <Button type="button">Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
      </TabsContent>
  </Tabs>
  )
}

function CustomersContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customers</h2>
        <div className="flex items-center gap-2">
          <Input placeholder="Search customers..." className="w-64" />
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Customers"
          value="2,543"
          description="+12.3% from last month"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Active Customers"
          value="2,105"
          description="+8.7% from last month"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="New Customers"
          value="342"
          description="+12.7% from last month"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Customer Retention"
          value="94.2%"
          description="+1.5% from last month"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>Manage your customers and their subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subscriptions</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerData.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32&text=${customer.name.charAt(0)}`}
                          alt={customer.name}
                        />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {customer.name}
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.subscriptions}</TableCell>
                  <TableCell>{customer.joined}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === "Active" ? "success" : "destructive"}>{customer.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing 5 of 100 customers</p>
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

      <Card>
        <CardHeader>
          <CardTitle>Customer Growth</CardTitle>
          <CardDescription>New customers over time</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerGrowthChart />
        </CardContent>
      </Card>
    </div>
  )
}

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

      <Card>
        <CardHeader>
          <CardTitle>Revenue Breakdown</CardTitle>
          <CardDescription>Revenue by subscription plan</CardDescription>
        </CardHeader>
        <CardContent>
          <RevenueBreakdownChart />
        </CardContent>
      </Card>
    </div>
  )
}

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
            <MRRGrowthChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Churn Rate</CardTitle>
            <CardDescription>Customer churn over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChurnRateChart />
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

      <Card>
        <CardHeader>
          <CardTitle>Subscription Lifecycle</CardTitle>
          <CardDescription>Average subscription duration and renewal rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-2">Average Subscription Duration</h3>
              <div className="text-3xl font-bold">14.3 months</div>
              <p className="text-sm text-muted-foreground">+2.1 months from last year</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Renewal Rate</h3>
              <div className="text-3xl font-bold">78.5%</div>
              <p className="text-sm text-muted-foreground">+3.2% from last year</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

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

      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
          <CardDescription>Manage your subscription plans</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Billing Cycle</TableHead>
                <TableHead>Active Subscribers</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Basic Monthly</TableCell>
                <TableCell>$9.99</TableCell>
                <TableCell>Monthly</TableCell>
                <TableCell>324</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      Archive
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Standard Monthly</TableCell>
                <TableCell>$29.99</TableCell>
                <TableCell>Monthly</TableCell>
                <TableCell>512</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      Archive
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Premium Monthly</TableCell>
                <TableCell>$49.99</TableCell>
                <TableCell>Monthly</TableCell>
                <TableCell>187</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      Archive
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Premium Annual</TableCell>
                <TableCell>$499.99</TableCell>
                <TableCell>Annual</TableCell>
                <TableCell>156</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      Archive
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Enterprise</TableCell>
                <TableCell>$999.99</TableCell>
                <TableCell>Annual</TableCell>
                <TableCell>69</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      Archive
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

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
                <SelectItem value="utc-12">UTC-12:00</SelectItem>
                <SelectItem value="utc-11">UTC-11:00</SelectItem>
                <SelectItem value="utc-10">UTC-10:00</SelectItem>
                <SelectItem value="utc-9">UTC-09:00</SelectItem>
                <SelectItem value="utc-8">UTC-08:00 (Pacific Time)</SelectItem>
                <SelectItem value="utc-7">UTC-07:00 (Mountain Time)</SelectItem>
                <SelectItem value="utc-6">UTC-06:00 (Central Time)</SelectItem>
                <SelectItem value="utc-5">UTC-05:00 (Eastern Time)</SelectItem>
                <SelectItem value="utc-4">UTC-04:00</SelectItem>
                <SelectItem value="utc-3">UTC-03:00</SelectItem>
                <SelectItem value="utc-2">UTC-02:00</SelectItem>
                <SelectItem value="utc-1">UTC-01:00</SelectItem>
                <SelectItem value="utc">UTC+00:00</SelectItem>
                <SelectItem value="utc+1">UTC+01:00</SelectItem>
                <SelectItem value="utc+2">UTC+02:00</SelectItem>
                <SelectItem value="utc+3">UTC+03:00</SelectItem>
                <SelectItem value="utc+4">UTC+04:00</SelectItem>
                <SelectItem value="utc+5">UTC+05:00</SelectItem>
                <SelectItem value="utc+5:30">UTC+05:30 (India)</SelectItem>
                <SelectItem value="utc+6">UTC+06:00</SelectItem>
                <SelectItem value="utc+7">UTC+07:00</SelectItem>
                <SelectItem value="utc+8">UTC+08:00 (China)</SelectItem>
                <SelectItem value="utc+9">UTC+09:00 (Japan)</SelectItem>
                <SelectItem value="utc+10">UTC+10:00</SelectItem>
                <SelectItem value="utc+11">UTC+11:00</SelectItem>
                <SelectItem value="utc+12">UTC+12:00</SelectItem>
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
                <SelectItem value="aud">AUD ($)</SelectItem>
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
          <CardTitle>Billing Settings</CardTitle>
          <CardDescription>Manage your billing settings and payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Payment Methods</Label>
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-6 w-6" />
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                  </div>
                </div>
                <Badge>Default</Badge>
              </div>
            </div>
            <Button variant="outline" className="mt-2">
              <CreditCard className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Billing Address</Label>
            <div className="rounded-md border p-4">
              <p className="font-medium">Acme Inc.</p>
              <p className="text-sm text-muted-foreground">123 Main St.</p>
              <p className="text-sm text-muted-foreground">San Francisco, CA 94105</p>
              <p className="text-sm text-muted-foreground">United States</p>
            </div>
            <Button variant="outline" className="mt-2">
              Edit Billing Address
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email notifications for important events</p>
            </div>
            <div>
              <Switch defaultChecked />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Subscription Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified when a new subscription is created</p>
            </div>
            <div>
              <Switch defaultChecked />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Payment Reminders</p>
              <p className="text-sm text-muted-foreground">Receive reminders for upcoming payments</p>
            </div>
            <div>
              <Switch defaultChecked />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Subscription Cancellations</p>
              <p className="text-sm text-muted-foreground">Get notified when a subscription is canceled</p>
            </div>
            <div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Preferences</Button>
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

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Payment Failed</h4>
                    <p className="text-sm text-muted-foreground">Notify customers when a payment fails</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="payment-retry">Retry Schedule</Label>
                    <Select defaultValue="3-7-7">
                      <SelectTrigger>
                        <SelectValue placeholder="Select schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-3-5">1, 3, 5 days</SelectItem>
                        <SelectItem value="3-7-7">3, 7, 7 days</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="payment-template">Template</Label>
                    <Select defaultValue="default-payment">
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default-payment">Default Payment</SelectItem>
                        <SelectItem value="urgent-payment">Urgent Payment</SelectItem>
                        <SelectItem value="friendly-payment">Friendly Payment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Subscription Expiration</h4>
                    <p className="text-sm text-muted-foreground">
                      Notify customers when their subscription is about to expire
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiration-days">Days Before</Label>
                    <Select defaultValue="14">
                      <SelectTrigger>
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="expiration-template">Template</Label>
                    <Select defaultValue="default-expiration">
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default-expiration">Default Expiration</SelectItem>
                        <SelectItem value="win-back">Win-back Offer</SelectItem>
                        <SelectItem value="discount-expiration">Discount Offer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Message Templates</Label>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Template
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Default Renewal</TableCell>
                  <TableCell>Email & SMS</TableCell>
                  <TableCell>Apr 12, 2023</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Preview
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Payment Failed</TableCell>
                  <TableCell>Email & SMS</TableCell>
                  <TableCell>Mar 28, 2023</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Preview
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Subscription Expiring</TableCell>
                  <TableCell>Email Only</TableCell>
                  <TableCell>Feb 15, 2023</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Preview
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Reminder Settings</Button>
        </CardFooter>
      </Card>
      // Add a new section for Notification Logs
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
          <CardDescription>View history of sent notifications and reminders</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing 3 of 24 notifications</p>
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

function DesktopSidebar({ activeSection, setActiveSection }) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <CreditCard className="h-6 w-6" />
          <span>SubManager</span>
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

function MobileSidebar({ activeSection, setActiveSection }) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <CreditCard className="h-6 w-6" />
          <span>SubManager</span>
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

function MetricCard({ title, value, description, icon, trend = "up" }) {
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

function RevenueChart() {
  const chartData = [
    {
      name: "Jan",
      revenue: 18000,
    },
    {
      name: "Feb",
      revenue: 16500,
    },
    {
      name: "Mar",
      revenue: 19800,
    },
    {
      name: "Apr",
      revenue: 21200,
    },
    {
      name: "May",
      revenue: 23400,
    },
    {
      name: "Jun",
      revenue: 24500,
    },
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
      <LineChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
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
    </ChartContainer>
  )
}

function SubscriptionDistributionChart() {
  const chartData = [
    {
      name: "Basic",
      value: 35,
    },
    {
      name: "Standard",
      value: 45,
    },
    {
      name: "Premium",
      value: 15,
    },
    {
      name: "Enterprise",
      value: 5,
    },
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

function CustomerGrowthChart() {
  const chartData = [
    {
      name: "Jan",
      customers: 1850,
    },
    {
      name: "Feb",
      customers: 1950,
    },
    {
      name: "Mar",
      customers: 2100,
    },
    {
      name: "Apr",
      customers: 2250,
    },
    {
      name: "May",
      customers: 2400,
    },
    {
      name: "Jun",
      customers: 2543,
    },
  ]

  return (
    <ChartContainer
      config={{
        customers: {
          label: "Customers",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <LineChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Line
          type="monotone"
          dataKey="customers"
          stroke="var(--color-customers)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-customers)",
            r: 4,
          }}
          activeDot={{
            r: 6,
            fill: "var(--color-customers)",
          }}
        />
      </LineChart>
    </ChartContainer>
  )
}

function RevenueBreakdownChart() {
  const chartData = [
    {
      name: "Basic",
      revenue: 3245,
    },
    {
      name: "Standard",
      revenue: 15350,
    },
    {
      name: "Premium",
      revenue: 9350,
    },
    {
      name: "Enterprise",
      revenue: 6950,
    },
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
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
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

function MRRGrowthChart() {
  const chartData = [
    {
      name: "Jan",
      mrr: 8500,
    },
    {
      name: "Feb",
      mrr: 9200,
    },
    {
      name: "Mar",
      mrr: 10100,
    },
    {
      name: "Apr",
      mrr: 11200,
    },
    {
      name: "May",
      mrr: 11800,
    },
    {
      name: "Jun",
      mrr: 12345,
    },
  ]

  return (
    <ChartContainer
      config={{
        mrr: {
          label: "MRR",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <LineChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Line
          type="monotone"
          dataKey="mrr"
          stroke="var(--color-mrr)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-mrr)",
            r: 4,
          }}
          activeDot={{
            r: 6,
            fill: "var(--color-mrr)",
          }}
        />
      </LineChart>
    </ChartContainer>
  )
}

function ChurnRateChart() {
  const chartData = [
    {
      name: "Jan",
      churn: 3.2,
    },
    {
      name: "Feb",
      churn: 3.0,
    },
    {
      name: "Mar",
      churn: 2.8,
    },
    {
      name: "Apr",
      churn: 2.6,
    },
    {
      name: "May",
      churn: 2.5,
    },
    {
      name: "Jun",
      churn: 2.4,
    },
  ]

  return (
    <ChartContainer
      config={{
        churn: {
          label: "Churn Rate",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <LineChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => `${value}%`} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Line
          type="monotone"
          dataKey="churn"
          stroke="var(--color-churn)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-churn)",
            r: 4,
          }}
          activeDot={{
            r: 6,
            fill: "var(--color-churn)",
          }}
        />
      </LineChart>
    </ChartContainer>
  )
}

function getStatusVariant(status) {
  switch (status) {
    case "Active":
      return "success"
    case "Trial":
      return "warning"
    case "Pending":
      return "default"
    case "Canceled":
      return "destructive"
    default:
      return "secondary"
  }
}

function getBillingStatusVariant(status) {
  switch (status) {
    case "Paid":
      return "success"
    case "Pending":
      return "warning"
    case "Overdue":
      return "destructive"
    default:
      return "secondary"
  }
}

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
