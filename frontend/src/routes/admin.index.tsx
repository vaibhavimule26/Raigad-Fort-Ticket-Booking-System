
import {
  createFileRoute,
  redirect,
} from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { adminItems } from "@/components/AdminNav";
import {
  Users,
  Ticket,
  Wallet,
  TrendingUp,
  LogIn,
  LogOut,
} from "lucide-react";
import { visitorTrend, ticketTypeBreakdown } from "@/lib/mockData";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

export const Route = createFileRoute("/admin/")({

  beforeLoad: () => {

    const token =
      localStorage.getItem("token");

    const role =
      localStorage.getItem("role");

    if (
  !token ||
  role !== "ROLE_ADMIN"
) {

  localStorage.clear();

  throw redirect({
    to: "/login",
  });

}

  },

  head: () => ({
    meta: [
      {
        title:
          "Admin Dashboard — Raigad Fort",
      },
    ],
  }),

  component: AdminDash,
});

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-5)",
];

function AdminDash() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [availableCapacity, setAvailableCapacity] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalExits, setTotalExits] = useState(0);


  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const users = await axios.get(
          "http://localhost:8081/api/admin/total-users"
        );

        const bookings = await axios.get(
          "http://localhost:8081/api/admin/total-bookings"
        );

        const revenue = await axios.get(
          "http://localhost:8081/api/admin/total-revenue"
        );

        const capacity = await axios.get(
          "http://localhost:8081/api/admin/available-capacity"
        );

        const entries = await axios.get(
  "http://localhost:8081/api/admin/total-entries"
);

const exits = await axios.get(
  "http://localhost:8081/api/admin/total-exits"
);

        setTotalUsers(users.data);
        setTotalBookings(bookings.data);
        setTotalRevenue(revenue.data);
        setAvailableCapacity(capacity.data);
        setTotalEntries(entries.data);
        setTotalExits(exits.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <DashboardLayout
      title="Admin Dashboard"
      role="Administrator"
      items={adminItems}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Users"
          value={totalUsers}
          hint="Registered Users"
          icon={Users}
          accent="primary"
        />

        <StatCard
          label="Total Revenue"
          value={`₹${totalRevenue}`}
          hint="All Bookings"
          icon={Wallet}
          accent="accent"
        />

        <StatCard
          label="Available Capacity"
          value={availableCapacity}
          hint="Remaining Capacity"
          icon={TrendingUp}
          accent="chart-2"
        />

        <StatCard
          label="System Status"
          value="ACTIVE"
          hint="Backend Running"
          icon={Wallet}
          accent="chart-3"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total Bookings"
          value={totalBookings}
          icon={Ticket}
          accent="primary"
        />

        <StatCard
          label="Entries (Today)"
          value={totalEntries}
          icon={LogIn}
          accent="chart-2"
        />

        <StatCard
          label="Exits (Today)"
          value={totalExits}
          icon={LogOut}
          accent="accent"
        />
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <Card className="border-border/60 lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg">
                Weekly Visitors & Revenue
              </h3>

              <span className="text-xs text-muted-foreground">
                Last 7 Days
              </span>
            </div>

            <div className="h-72">
              <ResponsiveContainer>
                <AreaChart data={visitorTrend}>
                  <defs>
                    <linearGradient
                      id="v"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0.6}
                      />

                      <stop
                        offset="100%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="var(--border)"
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="day"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                  />

                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                  />

                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="var(--chart-1)"
                    fill="url(#v)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardContent className="p-6">
            <h3 className="font-display text-lg mb-4">
              Ticket Mix
            </h3>

            <div className="h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={ticketTypeBreakdown}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {ticketTypeBreakdown.map((_, i) => (
                      <Cell
                        key={i}
                        fill={COLORS[i % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}