import {
  Bell,
  Search,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
  X,
  Zap,
  Heart,
  ShoppingCart,
  Pencil,
  Trash2,
} from "lucide-react";

import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { getCart, getWishlist } from "@/utils/userStore";
// import { getProfile } from "@/utils/userStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const notifications = [
  { text: "New lead from website form", time: "2m ago", unread: true },
  { text: "Deal 'Enterprise Plan' moved to Negotiation", time: "1h ago", unread: true },
  { text: "Task overdue: Follow up with Acme Corp", time: "3h ago", unread: false },
  { text: "New support ticket #1024 assigned", time: "5h ago", unread: false },
];

function SlidePanel({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-80 bg-card border-l border-border shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-heading font-semibold text-foreground">{title}</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function TopHeader() {
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const [openPanel, setOpenPanel] = useState("none");
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Learner",
    email: "learner@example.com",
    role: "user",
  };
  const isAdmin = user?.role === "admin";

//   const avatarSrc = profile?.avatar ? profile.avatar : null;
//   // const avatarSrc = "";
// const nameText = user?.name || "Learner";
// const emailText = user?.email || "learner@example.com";

const userData = JSON.parse(localStorage.getItem("user")) || {};

let profile = {};

if (userData?.role === "admin") {
  profile = JSON.parse(localStorage.getItem("admin_profile")) || {};
} else {
  profile = JSON.parse(localStorage.getItem("user_profile")) || {};
}

const nameText = profile?.name || userData?.name || "User";
const emailText = profile?.email || userData?.email || "";

const avatarSrc = profile?.avatar || null;
    
const [refresh, setRefresh] = useState(false);

useEffect(() => {
  const update = () => setRefresh((p) => !p);

  window.addEventListener("profileUpdated", update);

  return () => window.removeEventListener("profileUpdated", update);
}, []);

  const closePanel = () => setOpenPanel("none");
  const togglePanel = (panel) => {
    setOpenPanel((prev) => (prev === panel ? "none" : panel));
  };

  const location = useLocation();
const path = location.pathname;
const wishlistCount = getWishlist().length;
const cartCount = getCart().length;

let title = "Dashboard";

if (path.startsWith("/courses/") && path !== "/courses/create") {
  title = "Course Details";
} else if (path.startsWith("/courses/create")) {
  title = "Create Course";
} else if (path.startsWith("/courses")) {
  title = "Courses";
} else if (path.startsWith("/dashboard")) {
  title = "Dashboard";
} else if (path.startsWith("/students")) {
  title = "Students";
} else if (path.startsWith("/materials")) {
  title = "Materials";
} else if (path.startsWith("/quiz")) {
  title = "Quiz";
} else if (path.startsWith("/settings")) {
  title = "Settings";
} else if (path.startsWith("/my-learning")) {
  title = "My Learning";
}

// const title =
//   routeTitles[location.pathname] || "Dashboard";

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center gap-6 min-w-[180px]">
          {user?.role !== "admin" ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white shadow-sm">
                <Zap className="h-4 w-4" />
              </div>
              <span className="text-2xl font-bold tracking-tight">LMS</span>
            </button>
          ) : (
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          )}
        </div>
        
        {/* Search */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-2xl flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={user?.role === "admin" ? `Search ${title.toLowerCase()}...` : "Search for anything"}
                className="w-full h-11 rounded-full border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
            </div>
          </div>


        <div className="flex items-center gap-1.5">
          {user?.role !== "admin" && (
            <>
              <button
                // onClick={() => navigate("/wishlist")}
                onClick={() => navigate("/settings?tab=wishlist")}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                <Heart className="h-4 w-4" />
                {wishlistCount > 0 && (
                  <span className="absolute right-1 top-1 rounded-full bg-primary px-1 text-[10px] text-white">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => navigate("/cart")}
                // onClick={() => navigate("/settings?tab=cart")}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute right-1 top-1 rounded-full bg-primary px-1 text-[10px] text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </>
          )}

          {/* Notifications */}
          <button
            onClick={() => togglePanel("notifications")}
            className="w-10 h-10 rounded-full flex items-center justify-center transition relative text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-card" />
          </button>

          <button
            onClick={toggle}
            className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-1 rounded-full transition hover:scale-[1.03]">
                {avatarSrc ? (
  <img
    src={avatarSrc}
    alt="profile"
    className="h-9 w-9 rounded-full object-cover"
  />
) : (
  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-xs">
    {nameText
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()}
  </div>
)}
                {/* {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt="Profile"
                    className="h-9 w-9 rounded-full object-cover shadow-sm ring-1 ring-border"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-xs shadow-sm">
                    {(user?.name || "L").slice(0, 2).toUpperCase()}
                  </div>
                )} */}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="pb-2">
                <div className="flex items-center gap-3">
                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt="Profile"
                      className="h-9 w-9 rounded-full object-cover shadow-sm ring-1 ring-border"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-xs">
                      {(nameText || "L")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                  )}
                  {/* {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover ring-1 ring-border"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-xs">
                      {(user?.name || "L").slice(0, 2).toUpperCase()}
                    </div>
                  )} */}
                  <div>
                    <p className="text-sm font-semibold leading-tight">{nameText}</p>
                    <p className="text-xs font-normal text-muted-foreground">{emailText}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {isAdmin ? (
                <>
                  <DropdownMenuItem onClick={() => navigate("/settings?tab=profile")} className="cursor-pointer gap-2">
                    <User className="h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings?tab=personal")} className="cursor-pointer gap-2">
                    <Settings className="h-4 w-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => togglePanel("notifications")}
                    className="cursor-pointer gap-2"
                  >
                    <Bell className="h-4 w-4" /> Notifications
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                <DropdownMenuItem onClick={() => navigate("/settings?tab=profile")} className="cursor-pointer gap-2">
                    <User className="h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings?tab=learning")} className="cursor-pointer gap-2">
                    <User className="h-4 w-4" /> My learning
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings?tab=wishlist")} className="cursor-pointer gap-2">
                    <Heart className="h-4 w-4" /> Wishlist
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem onClick={() => navigate("/settings?tab=cart")} className="cursor-pointer gap-2">
                    <ShoppingCart className="h-4 w-4" /> Cart
                  </DropdownMenuItem> */}
                  <DropdownMenuItem onClick={() => navigate("/settings?tab=profile")} className="cursor-pointer gap-2">
                    <Settings className="h-4 w-4" /> Settings
                  </DropdownMenuItem>
                  
                </>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
              >
                <LogOut className="h-4 w-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Notifications Panel */}
      <SlidePanel open={openPanel === "notifications"} onClose={closePanel} title="Notifications">
        <div className="px-4 py-2 flex items-center justify-between border-b border-border">
          <span className="text-[11px] font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            {notifications.filter((n) => n.unread).length} new
          </span>
          <button className="text-xs text-primary font-medium hover:underline">Mark all read</button>
        </div>

        <div>
          {notifications.map((n, i) => (
            <div
              key={i}
              className={`px-4 py-4 flex items-start gap-3 hover:bg-secondary/50 cursor-pointer transition-colors border-b border-border/50 last:border-0 ${
                n.unread ? "bg-primary/[0.03]" : ""
              }`}
            >
              {n.unread && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
              <div className={n.unread ? "" : "ml-5"}>
                <p className="text-sm text-foreground leading-snug">{n.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border mt-auto">
          <button className="w-full h-9 rounded-lg bg-secondary text-sm font-medium text-foreground hover:bg-secondary/80 transition">
            View all notifications
          </button>
        </div>
      </SlidePanel>

    </>
  );
}