import AppBreadcrumb from "@/components/dashboard/app-breadcrumb";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="p-5 space-y-4 relative min-h-screen ">
          <AppBreadcrumb />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
