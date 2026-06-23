import type { TicketData } from "@/components/TicketCard";

export const mockTickets: TicketData[] = [
  { id: "RGD-2026-00481", visitorName: "Rohan Mhatre", date: "12 Jun 2026", slot: "09:00 AM", type: "Indian Adult", count: 2, amount: 100, status: "active" },
  { id: "RGD-2026-00322", visitorName: "Rohan Mhatre", date: "02 May 2026", slot: "10:00 AM", type: "Indian Adult", count: 4, amount: 200, status: "used" },
  { id: "RGD-2025-09812", visitorName: "Rohan Mhatre", date: "18 Dec 2025", slot: "02:00 PM", type: "Foreign National", count: 1, amount: 600, status: "expired" },
];

export const visitorTrend = [
  { day: "Mon", visitors: 420, revenue: 21000 },
  { day: "Tue", visitors: 380, revenue: 19000 },
  { day: "Wed", visitors: 510, revenue: 25500 },
  { day: "Thu", visitors: 470, revenue: 23500 },
  { day: "Fri", visitors: 690, revenue: 34500 },
  { day: "Sat", visitors: 980, revenue: 49000 },
  { day: "Sun", visitors: 1120, revenue: 56000 },
];

export const ticketTypeBreakdown = [
  { name: "Indian Adult", value: 62 },
  { name: "Child", value: 18 },
  { name: "Foreign", value: 12 },
  { name: "Student", value: 8 },
];

export const allBookings = [
  { id: "RGD-2026-00481", name: "Rohan Mhatre", date: "12 Jun 2026", slot: "09:00", pax: 2, amount: 100, status: "Active" },
  { id: "RGD-2026-00482", name: "Aisha Khan", date: "12 Jun 2026", slot: "09:00", pax: 3, amount: 150, status: "Active" },
  { id: "RGD-2026-00483", name: "John Smith", date: "12 Jun 2026", slot: "10:00", pax: 1, amount: 600, status: "Active" },
  { id: "RGD-2026-00484", name: "Priya Desai", date: "12 Jun 2026", slot: "11:00", pax: 5, amount: 250, status: "Cancelled" },
  { id: "RGD-2026-00485", name: "Vikram Patil", date: "13 Jun 2026", slot: "09:00", pax: 4, amount: 200, status: "Active" },
];

export const users = [
  { id: 1, name: "Rohan Mhatre", email: "rohan@example.com", role: "Customer", bookings: 12, status: "Active" },
  { id: 2, name: "Anita Sharma", email: "anita@gov.in", role: "Admin", bookings: 0, status: "Active" },
  { id: 3, name: "Suresh Kale", email: "suresh@gov.in", role: "Security", bookings: 0, status: "Active" },
  { id: 4, name: "Mark Johnson", email: "mark@example.com", role: "Customer", bookings: 1, status: "Active" },
  { id: 5, name: "Priya Desai", email: "priya@example.com", role: "Customer", bookings: 4, status: "Blocked" },
];

export const entryLogs = [
  { id: "L-9821", ticket: "RGD-2026-00481", name: "Rohan Mhatre", time: "09:04 AM", gate: "Maha Darwaja" },
  { id: "L-9822", ticket: "RGD-2026-00482", name: "Aisha Khan", time: "09:11 AM", gate: "Maha Darwaja" },
  { id: "L-9823", ticket: "RGD-2026-00483", name: "John Smith", time: "10:02 AM", gate: "Chit Darwaja" },
  { id: "L-9824", ticket: "RGD-2026-00485", name: "Vikram Patil", time: "09:00 AM", gate: "Maha Darwaja" },
];

export const exitLogs = [
  { id: "X-7711", ticket: "RGD-2026-00481", name: "Rohan Mhatre", time: "12:31 PM", gate: "Maha Darwaja" },
  { id: "X-7712", ticket: "RGD-2026-00482", name: "Aisha Khan", time: "01:05 PM", gate: "Maha Darwaja" },
];

export const slots = [
  { id: 1, time: "09:00 AM", capacity: 200, booked: 142, status: "Open" },
  { id: 2, time: "10:00 AM", capacity: 200, booked: 198, status: "Filling" },
  { id: 3, time: "11:00 AM", capacity: 200, booked: 200, status: "Full" },
  { id: 4, time: "12:00 PM", capacity: 150, booked: 60, status: "Open" },
  { id: 5, time: "02:00 PM", capacity: 200, booked: 88, status: "Open" },
  { id: 6, time: "03:00 PM", capacity: 200, booked: 120, status: "Open" },
];