"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Trash2, Info, HelpCircle, Settings } from "lucide-react";
import Image from "next/image";
import { SignOutButton, useSession } from "@clerk/nextjs";

export default function SettingsPage() {
  const { session } = useSession();

  const handleDeleteAccount = () => {
    // add delete logic
    alert("Delete functionality coming soon.");
  };

  return (
    <main className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <Card className="p-0">
        <CardHeader className="flex flex-col items-center gap-2 text-center">
          {session?.user?.imageUrl && (
            <Image
              src={session.user.imageUrl}
              alt="User avatar"
              width={64}
              height={64}
              className="rounded-full"
            />
          )}
          <CardTitle className="text-lg font-semibold">
            {session?.user?.primaryEmailAddress?.emailAddress || "User"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground text-center">
            <div>
              <p className="text-lg font-medium text-foreground">12</p>
              <p>Journeys</p>
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">34</p>
              <p>Media Files</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <SignOutButton>
              <Button type="button" className="flex-1" variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </SignOutButton>
            <Button
              onClick={handleDeleteAccount}
              className="flex-1"
              variant="destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Coming soon: Notifications, Theme, Language...
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" /> Help & Feedback
          </p>
          <p className="flex items-center gap-2">
            <Info className="w-4 h-4" /> Privacy Policy
          </p>
          <p className="flex items-center gap-2">
            <Settings className="w-4 h-4" /> Terms of Service
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col items-center mt-6 space-y-1">
        <p className="text-center text-xs text-muted-foreground">
          <span className="font-semibold">Smriti Lok</span> &mdash; v0.0.1
        </p>
        <p className="text-center text-xs text-muted-foreground">
          Crafted with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          for your memories.
        </p>
      </div>
    </main>
  );
}
