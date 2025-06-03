/**
 *
 * @returns This component returns the profile page of the user.
 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { LogOut } from "lucide-react";
import { Suspense } from "react";

export default async function ProfilePage() {
  const user = await currentUser();
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-sm mx-auto">
        <Suspense fallback={<p>Loading...</p>}>
          <Card>
            <CardHeader>
              <CardDescription className="text-muted-foreground font-medium">
                <Badge className="font-bold">{user?.fullName}</Badge>
              </CardDescription>
              <CardTitle className="text-2xl font-semibold">
                {user?.primaryEmailAddress?.emailAddress}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Journeys Logged : 21</p>
            </CardContent>
            <Separator />
            <CardFooter>
              <SignOutButton>
                <Button variant={"destructive"} className="font-medium">
                  <LogOut />
                  Logout
                </Button>
              </SignOutButton>
            </CardFooter>
          </Card>
        </Suspense>
      </div>
    </div>
  );
}
