"use client";

import { Users, LogOut, PieChart, CreditCard, DollarSign, Bell, Settings2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: PieChart,
  },
  {
    title: "Notifications",
    href: "/dashboard/notification",
    icon: Bell,
  },
  {
    title: "Subscriptions",
    href: "/dashboard/subscription",
    icon: CreditCard,
  },
  {
    title: "Customers",
    href: "/dashboard/members",
    icon: Users,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: DollarSign,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings2,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 min-h-screen bg-background border-r flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-bold text-foreground">Admin Dashboard</h2>
      </div>
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors
                    ${isActive
                      ? "bg-muted text-foreground mx-2"
                      : "text-muted-foreground hover:bg-secondary mx-2 hover:text-accent-foreground"
                    }`}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}