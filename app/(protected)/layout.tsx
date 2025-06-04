import ProtectedNavbar from "@/components/protected-nav";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProtectedNavbar />
      {children}
    </>
  );
}
