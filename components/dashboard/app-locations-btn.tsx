import { ChevronDown } from "lucide-react";
import React from "react";
import { SidebarMenuButton } from "../ui/sidebar";

export default function AppLocationsBtn() {
  return (
    <SidebarMenuButton>
      <ChevronDown />
    </SidebarMenuButton>
  );
}
