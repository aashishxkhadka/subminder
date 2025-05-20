import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
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

  const business = await prisma.business.findUnique({
    where: { id: session.user.id},
  });

  if (!business) {
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
    </div>
  );
}