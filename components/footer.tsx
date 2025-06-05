import Link from "next/link";
import { Button } from "./ui/button";
import { Github, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background w-full border-t shadow p-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-6">
        {/* navigation links */}
        <ul className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 md:gap-20 lg:gap-44 text-sm text-gray-500 font-semibold">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/faqs">FAQs</Link>
          </li>
          <li>
            <Link href="/terms">Terms</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy</Link>
          </li>
        </ul>

        {/* Social button */}
        <ul className="flex items-center gap-4">
          <Button variant={"ghost"} size="icon" aria-label="Twitter">
            <Link href="https://x.com/mevikas1008" target="_blank">
              <Twitter />
            </Link>
          </Button>
          <Button variant={"ghost"} size="icon" aria-label="Instagram">
            <Link
              href="https://www.linkedin.com/in/vikas-meshram"
              target="_blank"
            >
              <Instagram />
            </Link>
          </Button>
          <Button variant={"ghost"} size="icon" aria-label="Facebook">
            <Link href="https://github.com/VikasMeshram2708" target="_blank">
              <Github />
            </Link>
          </Button>
        </ul>

        <p className="text-sm text-gray-500 font-semibold text-center">
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
