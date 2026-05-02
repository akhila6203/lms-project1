// layouts/UserLayout.jsx

import { Outlet, NavLink, useLocation } from "react-router-dom";
import { TopHeader } from "@/components/TopHeader";
import { CATEGORIES, HOME_NAV_ITEMS } from "@/lib/catalog";

export default function UserLayout({ children }) {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const activeCategory = search.get("category") || "All";

  const getCategoryTarget = (item) => (item === "All" || CATEGORIES.includes(item) ? item : null);
  const isNavActive = (item) => {
    const target = getCategoryTarget(item);
    if (!target) return false;
    if (target === "All") return location.pathname === "/courses" && activeCategory === "All";
    return location.pathname === "/courses" && activeCategory === target;
  };

  return (
    // <div className="flex flex-col h-screen w-full bg-background">
    <div className="flex flex-col min-h-screen w-full bg-background">

      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-card shadow-sm">
        <TopHeader />
      </div>

      {/* 🔥 SUB NAVBAR */}
      {/* <div className="mt-16 flex overflow-x-auto border-b bg-card px-6 py-3 shadow-sm">
        <div className="mx-auto flex min-w-max items-center gap-6 text-sm"> */}
      <div className="sticky top-16 z-40 flex overflow-x-auto border-b bg-card px-6 py-3 shadow-sm">
        <div className="mx-auto flex min-w-max items-center gap-6 text-sm">
          {HOME_NAV_ITEMS.map((item) => (
            <NavLink
              key={item}
              to={
                getCategoryTarget(item)
                  ? item === "All"
                    ? "/courses"
                    : `/courses?category=${encodeURIComponent(getCategoryTarget(item))}`
                  : "/courses"
              }
              className={() =>
                `whitespace-nowrap border-b-2 pb-1 font-medium transition hover:text-foreground ${
                  isNavActive(item)
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:border-muted-foreground/40"
                }`
              }
            >
              {item}
            </NavLink>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      {/* <main className="flex-1 overflow-y-auto bg-background pt-4"> */}
      <main className="flex-1 bg-background p-8 mt-[60px]">
        {children ?? <Outlet />}
      </main>
    </div>
  );
}