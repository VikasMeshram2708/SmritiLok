"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LogOut, Trash2 } from "lucide-react";

const dummyUser = {
  name: "Vikas the Voyager",
  email: "vikas@example.com",
  avatarUrl: "https://i.pravatar.cc/150?img=68",
  journeysCount: 14,
};

export default function ProfilePage() {
  const [user, setUser] = useState(dummyUser);

  useEffect(() => {
    // Fetch real user data if needed
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    // Add logout logic
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure? This will permanently delete your account.")) {
      console.log("Deleting account...");
      // Add delete logic
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-100 py-12 px-4 flex justify-center items-start">
      <Card className="w-full max-w-md shadow-xl rounded-2xl p-6 bg-white">
        <CardHeader className="flex flex-col items-center gap-3">
          <Image
            src={user.avatarUrl}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full border-4 border-zinc-200 shadow-sm"
          />
          <h1 className="text-2xl font-semibold tracking-tight">{user.name}</h1>
          <p className="text-sm text-zinc-500">{user.email}</p>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-zinc-500">Journeys Logged</p>
            <p className="text-3xl font-bold text-zinc-800">
              {user.journeysCount}
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center gap-2"
                variant="outline"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </Button>

              <Button
                onClick={handleDeleteAccount}
                className="flex-1 flex items-center justify-center gap-2"
                variant="destructive"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
