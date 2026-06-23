import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Ticket,
  Wallet,
  MapPin,
  User,
  History,
  BookOpenCheck,
  MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      {
        title: "My Dashboard — Raigad Fort",
      },
      {
        name: "description",
        content: "View bookings, tickets and profile.",
      },
    ],
  }),
  component: Dashboard,
});

const items = [
  {
    to: "/dashboard",
    label: "Overview",
    icon: BookOpenCheck,
  },
  {
    to: "/book",
    label: "Book Ticket",
    icon: Ticket,
  },
  {
    to: "/bookings",
    label: "My Bookings",
    icon: History,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: User,
  },
  {
    to: "/feedback",
    label: "Feedback",
    icon: MessageSquare,
  },
];

function Dashboard() {
  const city =
    localStorage.getItem("city") || "Unknown";

    const [weather, setWeather] =
    useState<any>(null);

  useEffect(() => {

    const loadWeather = async () => {

      const response =
        await axios.get(
          "https://api.open-meteo.com/v1/forecast?latitude=18.2346&longitude=73.4408&current=temperature_2m"
        );

      setWeather(response.data);

    };

    loadWeather();

  }, []);

  return (
    <DashboardLayout
      title="My Dashboard"
      role="Visitor"
      items={items}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Upcoming Visits"
          value={1}
          icon={Calendar}
          accent="primary"
        />

        <StatCard
          label="Total Bookings"
          value={12}
          icon={Ticket}
          accent="accent"
        />

        <StatCard
          label="Total Spent"
          value="₹4,820"
          icon={Wallet}
          accent="chart-2"
        />

        <StatCard
  label="Raigad Weather"
  value={
    weather
      ? `${weather.current.temperature_2m}°C`
      : "Loading..."
  }
  icon={MapPin}
  accent="chart-3"
/>
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">
              Upcoming Ticket
            </h2>

            <Button
              asChild
              variant="outline"
              size="sm"
            >
              <Link to="/bookings">
                View All
              </Link>
            </Button>
          </div>

          <div className="p-6 border rounded-lg">
            No upcoming ticket found
          </div>
        </div>

        <Card className="border-border/60">
          <CardContent className="p-6 space-y-3">
            <h3 className="font-display text-lg">
              Plan your next visit
            </h3>

            <p className="text-sm text-muted-foreground">
              Weekend slots fill up fast.
              Reserve early for Saturday sunrise.
            </p>

            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/${city}/Raigad Fort`
                )
              }
            >
              View Route To Raigad
            </Button>

            <Button
              asChild
              className="w-full"
            >
              <Link to="/book">
                Book New Ticket
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}