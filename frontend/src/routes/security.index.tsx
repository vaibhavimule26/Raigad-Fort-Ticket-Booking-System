import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { securityItems } from "@/components/AdminNav";
import { LogIn, LogOut, Users, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export const Route = createFileRoute("/security/")({

  beforeLoad: () => {

    const token =
      localStorage.getItem("token");

    const role =
      localStorage.getItem("role");

    if (
      !token ||
      role !== "ROLE_SECURITY"
    ) {

      window.location.href =
        "/login";

    }

  },

  head: () => ({
    meta: [
      {
        title:
          "Security Dashboard — Raigad Fort",
      },
    ],
  }),

  component: SecurityDash,
});

function SecurityDash() {
  console.log("Security Dashboard Loaded");

  const [entries, setEntries] = useState(0);
  const [exits, setExits] = useState(0);
  const [inside, setInside] = useState(0);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/bookings/all"
        );

        const bookings = response.data;

        const entered = bookings.filter(
          (b: any) => b.bookingStatus === "ENTERED"
        ).length;

        const exited = bookings.filter(
          (b: any) => b.bookingStatus === "EXITED"
        ).length;

        setEntries(entered);
setExits(exited);
setInside(entered - exited);

setRecentBookings(
  bookings
    .filter(
      (b: any) =>
        b.bookingStatus === "ENTERED" ||
        b.bookingStatus === "EXITED"
    )
    .slice(0, 10)
);
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, []);

  return (
    <DashboardLayout
      title="Security Dashboard"
      role="Security"
      items={securityItems}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Entries today"
          value={entries}
          icon={LogIn}
          accent="primary"
        />

        <StatCard
          label="Exits today"
          value={exits}
          icon={LogOut}
          accent="accent"
        />

        <StatCard
          label="Inside the fort"
          value={inside}
          icon={Users}
          accent="chart-2"
        />

        <StatCard
          label="Alerts"
          value={0}
          hint="No incidents reported"
          icon={AlertTriangle}
          accent="chart-3"
        />
      </div>

      <Card className="border-border/60 mt-6">
  <CardContent className="p-6">
    <h3 className="font-display text-lg mb-4">
      Recent Gate Activity
    </h3>

    <div className="space-y-3">
      {recentBookings.map((booking) => (
        <div
          key={booking.id}
          className="flex justify-between border-b pb-2"
        >
          <div>
            <div className="font-medium">
              {booking.bookingId}
            </div>

            <div className="text-xs text-muted-foreground">
              {booking.bookingStatus}
            </div>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>
    </DashboardLayout>
  );
}