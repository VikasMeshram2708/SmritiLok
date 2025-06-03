import { Sparkle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Navbar() {
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
              <Link href="/journeys">Journeys</Link>
            </li>
          )}
          <li>
            <Link href="/explore">Explore</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <Button className="tracking-wider">
            <Link href="/journeys">Start Logging</Link>
          </Button>
        </ul>
      </div>
    </nav>
  );
}
