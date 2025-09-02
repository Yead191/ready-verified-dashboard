import DashboardHeader from "@/components/shared/dashboard-header/DashboardHeader";
import DashboardSidebar from "@/components/shared/dashboard-sidebar/DashboardSidebar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex ">
      <aside>
        <DashboardSidebar />
      </aside>
      <section className="bg-[#F1F4F9] flex-1  pl-2">
        <nav className="sticky top-0 z-50 ">
          <DashboardHeader />
        </nav>
        <section className="py-4 h-[calc(100vh-84px)] overflow-y-auto pl-2 pr-4">
          {children}
        </section>
      </section>
    </main>
  );
}
