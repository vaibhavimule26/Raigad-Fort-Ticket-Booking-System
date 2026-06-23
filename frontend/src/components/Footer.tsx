import { Link } from "@tanstack/react-router";
import { Mountain, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Mountain className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-semibold">Raigad Fort</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Capital of Chhatrapati Shivaji Maharaj's Swarajya. Official ticket booking & visitor management system.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 text-foreground">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About the Fort</Link></li>
            <li><Link to="/tickets" className="hover:text-primary">Ticket Information</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 text-foreground">Portals</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/dashboard" className="hover:text-primary">Visitor Dashboard</Link></li>
            <li><Link to="/admin" className="hover:text-primary">Admin Portal</Link></li>
            <li><Link to="/security" className="hover:text-primary">Security Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 text-foreground">Reach Us</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5" /> Raigad Dist., Maharashtra 402305</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5" /> +91 22 2202 4522</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5" /> info@raigadfort.gov.in</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Archaeological Survey of India · Government of Maharashtra
      </div>
    </footer>
  );
}