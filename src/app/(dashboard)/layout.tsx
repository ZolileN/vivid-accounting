import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

/**
 * Dashboard layout — wraps all internal/authenticated pages with sidebar and header.
 * This is a route group layout, so the URL path is not affected.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
