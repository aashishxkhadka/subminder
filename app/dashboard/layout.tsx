"use client"
import AdminSidebar from "@/components/admin-sidebar";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const session = useSession();
  const router = useRouter();

  if (!session.data?.user){
    return router.push("/login")
  } 

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