import { Sparkle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default async function ProtectedNavbar() {
  const { userId } = await auth();
  const user = await currentUser();
  return (
    <nav className="bg-background">
      <div className="max-w-7xl mx-auto p-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center gap-4">
          <Sparkle fill="black" />
          <Link href="/">SmritiLok</Link>
        </h2>
        <ul className="text-sm flex items-center gap-4">
          {userId && (
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          )}
          <Button className="tracking-wider">
            <Link href="/journeys/new">New Journey</Link>
          </Button>
        </ul>
      </div>
    </nav>
  );
}
