import { Cpu, LogOut, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Navbar() {
  const { userId } = await auth();
  return (
    <nav className="border-b shadow bg-background p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-1">
            <Cpu />
            <Link href="/" className="text-lg sm:text-xl font-semibold">
              SmritiLok
            </Link>
          </h2>
          <div>
            {userId ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer flex gap-2 items-center">
                  <User />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Button type="submit" variant={"destructive"}>
                      <LogOut color="white" />
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <SignInButton fallbackRedirectUrl="/dashboard">
                  <Button variant={"link"}>Login</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Register</Button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
