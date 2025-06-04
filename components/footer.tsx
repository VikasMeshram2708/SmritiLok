import Link from "next/link";
import { Button } from "./ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background w-full border-t shadow p-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-6">
        {/* navigation links */}
        <ul className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 md:gap-20 lg:gap-44 text-sm text-gray-500 font-semibold">
          <li>
            <Link href="/">About</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
          <li>
            <Link href="/">FAQs</Link>
          </li>
          <li>
            <Link href="/">Terms</Link>
          </li>
          <li>
            <Link href="/">Privacy</Link>
          </li>
        </ul>

        {/* Social button */}
        <ul className="flex items-center gap-4">
          <Button variant={"ghost"} size="icon" aria-label="Twitter">
            <Twitter />
          </Button>
          <Button variant={"ghost"} size="icon" aria-label="Instagram">
            <Instagram />
          </Button>
          <Button variant={"ghost"} size="icon" aria-label="Facebook">
            <Facebook />
          </Button>
        </ul>

        <p className="text-sm text-gray-500 font-semibold text-center">
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
