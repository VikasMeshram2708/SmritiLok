import { Cpu, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Navbar() {
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
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer flex gap-2 items-center">
                <User />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <Avatar>
              <AvatarImage alt="user name" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
