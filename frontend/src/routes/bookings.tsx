import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Ticket, BookOpenCheck, History, User } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [{ title: "My Bookings — Raigad Fort" }],
  }),
  component: Bookings,
});

const items = [
  { to: "/dashboard", label: "Overview", icon: BookOpenCheck },
  { to: "/book", label: "Book Ticket", icon: Ticket },
  { to: "/bookings", label: "My Bookings", icon: History },
  { to: "/profile", label: "Profile", icon: User },
];

function Bookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const response = await axios.get(
          `http://localhost:8081/api/bookings/user/${userId}`
        );

        setBookings(
  response.data.sort(
    (a: any, b: any) =>
      new Date(b.bookingDate).getTime() -
      new Date(a.bookingDate).getTime()
  )
);
      } catch (error) {
        console.error(error);
      }
    };

    loadBookings();
  }, []);

  return (
    <DashboardLayout
      title="Booking History"
      role="Visitor"
      items={items}
    >
      <Card className="border-border/60">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Slot</TableHead>
                <TableHead>Visitors</TableHead>
                <TableHead className="text-right">
                  Amount
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>PDF</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-mono text-xs">
                    {booking.bookingId}
                  </TableCell>

                  <TableCell>
                    {booking.bookingDate?.substring(0, 10)}
                  </TableCell>

                  <TableCell>
                    Slot {booking.slotId}
                  </TableCell>

                  <TableCell>
                    {booking.visitorCount}
                  </TableCell>

                  <TableCell className="text-right">
                    ₹{booking.totalAmount}
                  </TableCell>

                  <TableCell>
                    <Badge>
                      {booking.bookingStatus}
                    </Badge>
                  </TableCell>
                  
<TableCell>
  <a
    href={`http://localhost:8081/pdf-tickets/${booking.bookingId}.pdf`}
    download
    className="text-green-600 underline"
  >
    Download PDF
  </a>
</TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}