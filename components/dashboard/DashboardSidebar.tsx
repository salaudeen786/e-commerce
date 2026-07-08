"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LayoutDashboard, User, MapPin, Heart, Package, Bell, Tag, Star, Edit, Settings, Shield, Key, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { DASHBOARD_NAV_LINKS } from "@/constants";
import { useDashboardStore } from "@/store/dashboard-store";

const ICON_MAP: Record<string, React.ReactNode> = {
  Dashboard: <LayoutDashboard className="h-4 w-4" />,
  Profile: <User className="h-4 w-4" />,
  Addresses: <MapPin className="h-4 w-4" />,
  Wishlist: <Heart className="h-4 w-4" />,
  Orders: <Package className="h-4 w-4" />,
  Notifications: <Bell className="h-4 w-4" />,
  Coupons: <Tag className="h-4 w-4" />,
  "Reward Points": <Star className="h-4 w-4" />,
  Reviews: <Edit className="h-4 w-4" />,
  Settings: <Settings className="h-4 w-4" />,
  Security: <Shield className="h-4 w-4" />,
  "Change Password": <Key className="h-4 w-4" />,
  Support: <HelpCircle className="h-4 w-4" />,
};

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const profile = useDashboardStore((s) => s.userProfile);
  const unreadCount = useDashboardStore((s) => s.notifications.filter((n) => !n.read).length);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
          {profile.firstName[0]}{profile.lastName[0]}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="truncate text-xs text-muted-foreground">{profile.email}</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {DASHBOARD_NAV_LINKS.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
          const isNotifs = link.href === "/dashboard/notifications";
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className="shrink-0">{ICON_MAP[link.label]}</span>
              <span className="flex-1">{link.label}</span>
              {isNotifs && unreadCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Store
        </Link>
      </div>
    </div>
  );
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      <aside className="hidden w-60 shrink-0 lg:block">
        <div className="sticky top-28 flex h-[calc(100vh-8rem)] flex-col rounded-2xl border border-border bg-card">
          <SidebarContent />
        </div>
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-[80] flex w-72 flex-col bg-background shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className="text-sm font-bold text-foreground">Menu</span>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <SidebarContent onClose={onClose} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
