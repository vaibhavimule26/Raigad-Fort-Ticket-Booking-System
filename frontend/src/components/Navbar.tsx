import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, Sun, Mountain, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Fort" },
  { to: "/tickets", label: "Tickets" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
            <Mountain className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold text-foreground">Raigad Fort</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Govt. of Maharashtra</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                path === n.to
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <div className="hidden sm:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <Link to="/register">Register</Link>
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted">
                {n.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              </Button>
              <Button asChild size="sm" className="flex-1">
                <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}