import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

export default async function ProfilePage() {
  const authUser = await currentUser();
  const email = authUser?.primaryEmailAddress?.emailAddress ?? "";

  const dbUser = await prisma.user.findUnique({
    where: { email },
  });

  const fullName = dbUser?.name ?? authUser?.fullName ?? "—";
  const userEmail = dbUser?.email ?? email ?? "—";
  const isOnboarded = !!dbUser;

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      {/* Hero Card */}
      <Card className="bg-muted/50 border-0 shadow-none">
        <CardHeader className="pb-0">
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Welcome, {fullName.split(" ")[0]}!
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            This is your personal profile overview. Information shown here is
            read-only unless you create a memory.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-sm">Full Name</Label>
            <Input
              value={fullName}
              readOnly
              className="mt-1 cursor-not-allowed text-muted-foreground"
            />
          </div>
          <div>
            <Label className="text-sm">Email Address</Label>
            <Input
              value={userEmail}
              readOnly
              className="mt-1 cursor-not-allowed text-muted-foreground"
            />
          </div>
        </CardContent>
      </Card>

      {/* Memory Stats */}
      <Card className="border border-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Memory Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
          <StatBox label="Places Visited" value={isOnboarded ? 28 : 0} />
          <StatBox label="Countries Explored" value={isOnboarded ? 9 : 0} />
          <StatBox label="Memories Saved" value={isOnboarded ? 35 : 0} />
        </CardContent>
      </Card>

      {/* Onboarding CTA */}
      {!isOnboarded && (
        <Card className="bg-amber-50 border border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg">Let’s Begin Your Journey</CardTitle>
            <CardDescription>
              You haven't logged a journey yet. Start by creating your first
              memory to unlock your personal map.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="text-sm px-4 py-1 bg-yellow-500 hover:bg-yellow-600 cursor-pointer">
              Create First Memory
            </Badge>
          </CardContent>
        </Card>
      )}
    </main>
  );
}

// 🔹 Extracted component for clean visuals
function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-4xl font-bold tracking-tight">{value}</p>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
