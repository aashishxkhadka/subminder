"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

async function fetchBusiness(id: string) {
  const res = await fetch(`/api/business/${id}`);
  if (!res.ok) throw new Error("Failed to fetch business");
  return res.json();
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const businessId = session?.user?.id; // Adjust if your businessId is in a different property

  const { data: business, isLoading, error } = useQuery({
    queryKey: ["business", businessId],
    queryFn: () => fetchBusiness(businessId),
    enabled: !!businessId,
  });

  if (!businessId) {
    return (
      <div className="max-w-xl mx-auto mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Business Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">No business found for this user.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Business Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="max-w-xl mx-auto mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Business Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">Business not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Business Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 mb-6">
            {business.logoUrl && (
              <Image
                src={business.logoUrl}
                alt={business.name}
                width={80}
                height={80}
                className="rounded-lg border"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold">{business.name}</h2>
              <p className="text-muted-foreground">{business.industryType}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">Email:</span>
              <div>{business.email}</div>
            </div>
            <div>
              <span className="font-semibold">Phone:</span>
              <div>{business.phone}</div>
            </div>
            <div>
              <span className="font-semibold">Address:</span>
              <div>{business.address}</div>
            </div>
            <div>
              <span className="font-semibold">Registered:</span>
              <div>{new Date(business.registrationDate).toLocaleDateString()}</div>
            </div>
            <div>
              <span className="font-semibold">Industry:</span>
              <div>{business.industryType}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ChangePasswordSection />
    </div>
  );
}

// --- COMPONENT: ChangePasswordSection ---
function ChangePasswordSection() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/business/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to change password");
      } else {
        toast.success("Password changed! Please log in again.");
        router.push("/login");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mt-8">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Change Password
          <span>{open ? "▲" : "▼"}</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <form className="space-y-4 mt-6" onSubmit={handleChangePassword}>
          <div>
            <label className="block mb-1 font-medium" htmlFor="currentPassword">
              Current Password
            </label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={() => setShowCurrent(v => !v)}
                tabIndex={-1}
              >
                {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="newPassword">
              New Password
            </label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={() => setShowNew(v => !v)}
                tabIndex={-1}
              >
                {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={() => setShowConfirm(v => !v)}
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
}