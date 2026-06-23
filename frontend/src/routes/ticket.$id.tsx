import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { TicketCard } from "@/components/TicketCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ticket, BookOpenCheck, History, User, ArrowLeft, Download } from "lucide-react";
import { mockTickets } from "@/lib/mockData";

export const Route = createFileRoute("/ticket/$id")({
  head: () => ({ meta: [{ title: "Ticket Details — Raigad Fort" }] }),
  component: TicketDetails,
});

const items = [
  { to: "/dashboard", label: "Overview", icon: BookOpenCheck },
  { to: "/book", label: "Book Ticket", icon: Ticket },
  { to: "/bookings", label: "My Bookings", icon: History },
  { to: "/profile", label: "Profile", icon: User },
];

function TicketDetails() {
  const { id } = Route.useParams();
  const ticket = mockTickets.find((t) => t.id === id) ?? mockTickets[0];
  return (
    <DashboardLayout title="Ticket Details" role="Visitor" items={items}>
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm"><Link to="/bookings"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Link></Button>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><TicketCard ticket={ticket} /></div>
        <Card className="border-border/60 h-fit">
          <CardContent className="p-6 space-y-3">
            <h3 className="font-display text-lg">Visit instructions</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>· Arrive 15 minutes before your slot</li>
              <li>· Carry the lead visitor's ID proof</li>
              <li>· Single QR scan admits the entire group</li>
              <li>· Re-entry permitted on the same day only</li>
            </ul>
            <Button className="w-full" variant="outline"><Download className="h-4 w-4 mr-2" /> Download PDF</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}