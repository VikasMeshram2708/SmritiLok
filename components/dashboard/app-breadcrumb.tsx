"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AppBreadcrumb() {
  const pathname = usePathname();

  // Function to generate breadcrumb items
  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter((path) => path !== "");
    const breadcrumbs = [];

    // Always include Home as the first breadcrumb
    breadcrumbs.push(
      <BreadcrumbItem key="home">
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
    );

    let accumulatedPath = "";

    paths.forEach((path, index) => {
      accumulatedPath += `/${path}`;
      const isLast = index === paths.length - 1;
      const formattedPath = path
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      if (isLast) {
        breadcrumbs.push(
          <React.Fragment key={path}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{formattedPath}</BreadcrumbPage>
            </BreadcrumbItem>
          </React.Fragment>
        );
      } else {
        breadcrumbs.push(
          <React.Fragment key={path}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={accumulatedPath}>
                {formattedPath}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        );
      }
    });

    return breadcrumbs;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>{getBreadcrumbs()}</BreadcrumbList>
    </Breadcrumb>
  );
}
