// layouts/AdminLayout.jsx

import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { TopHeader } from "@/components/TopHeader";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen w-full bg-background">

      {/* SIDEBAR */}
      <AppSidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col h-screen ml-[260px]">

        {/* HEADER */}
        <div className="fixed top-0 left-[260px] right-0 h-16 z-50 bg-card/95 border-b shadow-sm">
          <TopHeader />
        </div>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 pt-20 bg-background">
          {children ?? <Outlet />}
        </main>

      </div>
    </div>
  );
}