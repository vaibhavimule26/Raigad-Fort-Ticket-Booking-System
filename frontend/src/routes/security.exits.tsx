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
import { securityItems } from "@/components/AdminNav";
import axios from "axios";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/security/exits")({
  head: () => ({
    meta: [{ title: "Exit Logs — Security" }],
  }),
  component: Exits,
});

function Exits() {

  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {

    const loadBookings = async () => {

      try {

        const response = await axios.get(
          "http://localhost:8081/api/bookings/logs"
        );

        const exitedBookings =
          response.data.filter(
            (b: any) =>
              b.bookingStatus === "EXITED"
          );

        setBookings(exitedBookings);

      } catch (error) {

        console.error(error);

      }

    };

    loadBookings();

  }, []);

  return (
    <DashboardLayout
      title="Exit Logs"
      role="Security"
      items={securityItems}
    >
      <Card className="border-border/60">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Booking ID</TableHead>
                <TableHead>Visitor Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>{b.id}</TableCell>
                  <TableCell>{b.bookingId}</TableCell>
                  <TableCell>{b.visitorName}</TableCell>
                  <TableCell>{b.bookingStatus}</TableCell>
                  <TableCell>
                    {b.bookingDate?.substring(0, 10)}
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