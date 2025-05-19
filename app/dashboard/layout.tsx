"use client"
import AdminSidebar from "@/components/admin-sidebar";
import { SessionProvider } from "next-auth/react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-background">
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 p-8">
            {children}
          </div>
        </div>
      </div>
    </SessionProvider>
  );
} 