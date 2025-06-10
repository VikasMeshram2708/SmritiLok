/**
 * This is share button for journey
 */

"use client";

import { Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function JourneyShareBtn() {
  const pathName = usePathname();
  function handleShare() {
    const baseOrigin = location.origin;
    const url = `${baseOrigin}${pathName}`;
    console.log("url", url);
    window.navigator.clipboard.writeText(url);
    alert("Link copied");
  }
  return (
    <Button onClick={handleShare} className="flex items-center gap-1">
      <Share2 />
      Share
    </Button>
  );
}
