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
      <main>
        <SidebarTrigger />
        <div className="space-y-4 p-5">
          <AppBreadcrumb />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
