import { redirect } from "next/navigation";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import AdminSidebar from "@/components/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token");


  // if (!token) {
  //   redirect("/admin-login");
  // }

  // try {
  // const decoded = verify(token.value, process.env.JWT_SECRET as string) as { role?: string };

  // if (!decoded || decoded.role !== "ADMIN") {
  //   redirect("/admin-login");
  // }
  // } catch (error) { redirect("/admin-login");
  // }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />
        {/* Main content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
} 