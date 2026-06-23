import { Link, useRouterState } from "@tanstack/react-router";
import { type ReactNode, useState } from "react";
import { Mountain, Moon, Sun, LogOut, Menu, X } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ChatBot from "@/components/ChatBot";

export interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function DashboardLayout({
  title,
  role,
  items,
  children,
}: {
  title: string;
  role: string;
  items: NavItem[];
  children: ReactNode;
}) {
  const { theme, toggle } = useTheme();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const fullName =
  localStorage.getItem("fullName") ||
  "Guest User";

const initials = fullName
  .split(" ")
  .map((n) => n[0])
  .join("")
  .substring(0, 2)
  .toUpperCase();

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static z-40 inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="h-16 flex items-center gap-2 px-4 border-b border-sidebar-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Mountain className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-semibold">Raigad</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{role}</div>
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {items.map((it) => {
            const active = path === it.to;
            const Icon = it.icon;
            return (
              <Link
                key={it.to}
                to={it.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                )}
              >
                <Icon className="h-4 w-4" />
                {it.label}
              </Link>
            );
          })}
        </nav>
        
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((o) => !o)}>
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <h1 className="font-display text-xl font-semibold text-foreground">{title}</h1>
          </div>
          <div className="flex items-center gap-2"></div>
            <Button variant="ghost" size="icon" onClick={toggle}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <div className="relative group hidden sm:flex items-center gap-2 pl-2 border-l border-border cursor-pointer">

  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
    {initials}
  </div>

  <div className="text-sm">
    <div className="font-medium text-foreground leading-tight">
      {fullName}
    </div>

    <div className="text-xs text-muted-foreground capitalize">
      {role.toLowerCase()}
    </div>
  </div>

  {/* Dropdown */}

  <div className="absolute right-0 top-10 hidden group-hover:block bg-background border rounded-md shadow-lg min-w-[160px] z-50">

    <button
      onClick={() => {
        window.location.href = "/profile";
      }}
      className="block w-full text-left px-4 py-2 text-sm hover:bg-muted"
    >
      Profile
    </button>

    <button
      onClick={() => {
        localStorage.clear();
        window.location.href = "/";
      }}
      className="block w-full text-left px-4 py-2 text-sm hover:bg-muted"
    >
      Sign Out
    </button>

  </div>

</div>
        </header>
        <>
  <main className="flex-1 p-4 md:p-6 max-w-full">
    {children}
  </main>

  <ChatBot />
</>
      </div>
    </div>
  )
  }