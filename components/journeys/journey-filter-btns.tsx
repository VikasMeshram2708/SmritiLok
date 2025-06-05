import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function JourneyFilterBns() {
  return (
    <div className="flex items-center gap-4">
      <Select>
        <SelectTrigger className="w-[90px] bg-muted/40 rounded-sm">
          <SelectValue placeholder="Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      {/* Date */}
      <Select>
        <SelectTrigger className="w-[110px] bg-muted/40 rounded-sm">
          <SelectValue placeholder="Locations" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      {/* Sort */}
      <Select>
        <SelectTrigger className="w-[90px] bg-muted/40 rounded-sm">
          <SelectValue placeholder="Tags" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
