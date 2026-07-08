"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="pb-16 pt-24 md:pt-28">
      <Container>
        <div className="flex gap-8">
          <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="min-w-0 flex-1">
            <button
              onClick={() => setSidebarOpen(true)}
              className="mb-4 flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted lg:hidden"
            >
              <Menu className="h-4 w-4" />
              Dashboard Menu
            </button>
            {children}
          </main>
        </div>
      </Container>
    </div>
  );
}
