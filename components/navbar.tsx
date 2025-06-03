import { Sparkle, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="bg-background">
      <div className="max-w-7xl mx-auto p-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center gap-4">
          <Sparkle fill="black" />
          <Link href="/">SmritiLok</Link>
        </h2>
        <ul className="text-sm flex items-center gap-4">
          <li>
            <Link href="/explore">Explore</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <Button className="tracking-wider">Start Logging</Button>
        </ul>
      </div>
    </nav>
  );
}
