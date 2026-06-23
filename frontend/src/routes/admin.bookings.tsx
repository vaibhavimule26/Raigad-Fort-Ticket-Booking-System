import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminItems } from "@/components/AdminNav";
import { useEffect, useState } from "react";
import axios from "axios";

export const Route = createFileRoute("/admin/bookings")({
  head: () => ({ meta: [{ title: "Manage Bookings — Admin" }] }),
  component: BookingsAdmin,
});

function BookingsAdmin() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/bookings/all"
        );

        setBookings(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    loadBookings();
  }, []);
  return (
    <DashboardLayout title="Manage Bookings" role="Administrator" items={adminItems}>
      <Card className="border-border/60">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
  <TableHead>Booking ID</TableHead>
  <TableHead>User</TableHead>
  <TableHead>Date</TableHead>
  <TableHead>Slot</TableHead>
  <TableHead>Visitors</TableHead>
  <TableHead className="text-right">Amount</TableHead>
  <TableHead>Status</TableHead>
  <TableHead>Action</TableHead>
</TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((b) => (
                <TableRow key={b.id}>
  <TableCell className="font-mono text-xs">
    {b.bookingId}
  </TableCell>

  <TableCell>
    User {b.userId}
  </TableCell>

  <TableCell>
    {b.bookingDate?.substring(0, 10)}
  </TableCell>

  <TableCell>
    Slot {b.slotId}
  </TableCell>

  <TableCell>
    {b.visitorCount}
  </TableCell>

  <TableCell className="text-right">
    ₹{b.totalAmount}
  </TableCell>

  <TableCell>
    <Badge>
      {b.bookingStatus}
    </Badge>
  </TableCell>

  <TableCell className="text-right">

  {b.bookingStatus === "BOOKED" ? (

    <Button
      variant="destructive"
      size="sm"
      onClick={async () => {
        try {

          const response = await axios.put(
            `http://localhost:8081/api/bookings/cancel/${b.bookingId}`
          );

          alert(response.data);

          window.location.reload();

        } catch (error) {

          console.error(error);

          alert("Cancel Failed");

        }
      }}
    >
      Cancel
    </Button>

  ) : (

    <Button
  variant="destructive"
  size="sm"
  className="opacity-100"
  disabled
>
  Not Allowed
</Button>
  )}

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