"use client";
import React, { useState } from "react";
import {
  Search,
  User,
  Home,
  MapPin,
  Settings,
  LogOut,
  ChevronDown,
  Building2,
  Star,
  Clock,
  Plus,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

// Menu items with additional metadata
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    description: "Dashboard overview",
  },
  {
    title: "Locations",
    url: "/dashboard/locations",
    icon: MapPin,
    description: "Manage your locations",
    badge: "5",
    submenu: [
      {
        title: "Recent Locations",
        url: "/dashboard/locations/recent",
        icon: Clock,
      },
      { title: "Favorites", url: "/dashboard/locations/favorites", icon: Star },
      {
        title: "Search",
        url: "/dashboard/locations/search",
        icon: Search,
      },
      {
        title: "All Locations",
        url: "/dashboard/locations/all",
        icon: Building2,
      },
      { title: "Add New", url: "/dashboard/locations/new", icon: Plus },
    ],
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
    description: "Your account settings",
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    description: "App preferences",
  },
];

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState<string>("Home");
  const [openCollapsible, setOpenCollapsible] = useState<Set<string>>(
    new Set(["Locations"])
  );

  const handleItemClick = (title: string) => {
    setActiveItem(title);
  };

  const toggleCollapsible = (title: string) => {
    const newOpenCollapsible = new Set(openCollapsible);
    if (newOpenCollapsible.has(title)) {
      newOpenCollapsible.delete(title);
    } else {
      newOpenCollapsible.add(title);
    }
    setOpenCollapsible(newOpenCollapsible);
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
            SL
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold tracking-tight">SmritiLok</h2>
            <p className="text-xs text-muted-foreground">Memory Palace</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => {
                const isActive = activeItem === item.title;
                const isOpen = openCollapsible.has(item.title);

                if (item.submenu) {
                  return (
                    <Collapsible
                      key={item.title}
                      open={isOpen}
                      onOpenChange={() => toggleCollapsible(item.title)}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger className="group w-full" asChild>
                          <SidebarMenuButton
                            className={`w-full justify-between ${
                              isActive ? "bg-accent text-accent-foreground" : ""
                            }`}
                            onClick={() => handleItemClick(item.title)}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="h-4 w-4" />
                              <span className="font-medium">{item.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {item.badge && (
                                <Badge
                                  variant="secondary"
                                  className="h-5 px-1.5 text-xs"
                                >
                                  {item.badge}
                                </Badge>
                              )}
                              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </div>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                      </SidebarMenuItem>

                      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
                        <SidebarMenu className="ml-4 border-l border-border pl-4 space-y-1">
                          {item.submenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className="hover:bg-accent hover:text-accent-foreground transition-colors"
                              >
                                <a
                                  href={subItem.url}
                                  className="flex items-center gap-3 py-2"
                                >
                                  <subItem.icon className="h-3.5 w-3.5" />
                                  <span className="text-sm">
                                    {subItem.title}
                                  </span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenu>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`${
                        isActive ? "bg-accent text-accent-foreground" : ""
                      } transition-colors`}
                      onClick={() => handleItemClick(item.title)}
                    >
                      <a
                        href={item.url}
                        className="flex items-center gap-3 py-2"
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">
              john@example.com
            </p>
          </div>
        </div>

        <div className="h-px bg-border mb-3" />

        <Button
          variant="destructive"
          className="w-full justify-center gap-2 font-medium"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
