"use client"
import AdminSidebar from "@/components/admin-sidebar";
import { SessionProvider, useSession } from "next-auth/react";
import "../globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

const queryClient = new QueryClient()
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
  }) {

  // const session = useSession();
  // const router = useRouter();

  // if (!session.data?.user){
  //   return router.push("/login")
  // } 

  return (
    <html lang="en">
      <body>
    <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 p-8">
            {children}
          </div>
        </div>
      </div>
            </QueryClientProvider>
            <Toaster position="top-right" />
          </ThemeProvider>
    </SessionProvider>
      </body>
    </html>
  );
} 