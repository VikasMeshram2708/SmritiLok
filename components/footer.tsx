import { Cpu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <footer className="border-t shadow bg-background p-4">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-1">
            <Cpu />
            <Link href="/" className="text-lg sm:text-xl font-semibold">
              SmritiLok
            </Link>
          </h2>
          <div className="">
            <address>
              <h2 className="text-lg">Lorem ipsum dolor sit amet.</h2>
              <p className="text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure,
                veritatis!
              </p>
            </address>
          </div>
        </div>
        <Separator />
        <p className="text-xs text-center text-muted-foreground">
          Copyright &copy; {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
