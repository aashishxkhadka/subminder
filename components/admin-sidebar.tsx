"use client";

import { Building, Users, Image, LogOut, PieChart, CreditCard, DollarSign, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: PieChart
  },
  {
    title: "Notifications",
    href: "/dashboard/notification",
    icon: Bell
  },
  {
    title: "Subscriptions",
    href: "/dashboard/subscription",
    icon: CreditCard
  },
  {
    title: "Customers",
    href: "/dashboard/customer",
    icon: Users
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: DollarSign
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      toast.success("Logged out successfully");
      router.push("/admin-login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="w-64 min-h-screen bg-card border-r flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-bold text-foreground">Admin Dashboard</h2>
      </div>
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 hover:bg-accent hover:text-accent-foreground ${pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
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
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
} 