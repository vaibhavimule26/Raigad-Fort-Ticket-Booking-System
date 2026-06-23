import { LayoutDashboard, Users, CalendarRange, ClipboardList, BarChart3, FileSpreadsheet } from "lucide-react";

export const adminItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/slots", label: "Ticket Slots", icon: CalendarRange },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/bookings", label: "Bookings", icon: ClipboardList },
  { to: "/admin/reports", label: "Reports", icon: FileSpreadsheet },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

import { Shield, ScanLine, LogIn, LogOut } from "lucide-react";
export const securityItems = [
  { to: "/security", label: "Dashboard", icon: Shield },
  { to: "/security/scan", label: "QR Scanner", icon: ScanLine },
  { to: "/security/entries", label: "Entry Logs", icon: LogIn },
  { to: "/security/exits", label: "Exit Logs", icon: LogOut },
];