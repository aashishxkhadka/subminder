"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { format } from "date-fns";

interface Member {
  id: string;
  createdAt: string;
  fullName: string;
  subscriptionPlan: {
    planName: string;
    price: number;
  };
}

interface RevenueByMonth {
  month: string;
  revenue: number;
}

export function AnalyticsRevenue() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const res = await fetch("/api/members");
      const data = await res.json();
      setMembers(data.members || []);
      setLoading(false);
    };
    fetchMembers();
  }, []);

  // Group revenue by month
  const revenueByMonth: RevenueByMonth[] = [];
  if (members.length > 0) {
    const map = new Map<string, number>();
    members.forEach((member) => {
      if (!member.createdAt) return; // skip if missing
      const date = new Date(member.createdAt);
      if (isNaN(date.getTime())) return; // skip if invalid
      const month = format(date, "yyyy-MM");
      const price = member.subscriptionPlan?.price || 0;
      map.set(month, (map.get(month) || 0) + price);
    });
    // Sort months ascending
    Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([month, revenue]) => {
        revenueByMonth.push({
          month: format(new Date(month + "-01"), "MMM yyyy"),
          revenue,
        });
      });
  }

  // Recent purchases (latest 5 members)
  const recentPurchases = [...members]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Revenue Per Month</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading chart...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByMonth}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ul className="divide-y">
              {recentPurchases.map((member) => (
                <li key={member.id} className="py-2 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{member.fullName}</div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(member.createdAt), "dd MMM yyyy")}
                    </div>
                  </div>
                  <div className="font-semibold">
                    ${member.subscriptionPlan?.price?.toLocaleString() ?? 0}
                  </div>
                </li>
              ))}
              {recentPurchases.length === 0 && (
                <li className="py-2 text-muted-foreground">No recent purchases</li>
              )}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}