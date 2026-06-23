import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { adminItems } from "@/components/AdminNav";
import { useEffect, useState } from "react";
import axios from "axios";import {
  BarChart, Bar, LineChart, Line, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Admin" }] }),
  component: Analytics,
});

function Analytics() {
  const [totalBookings, setTotalBookings] =
    useState(0);

  const [totalVisitors, setTotalVisitors] =
    useState(0);

  const [totalRevenue, setTotalRevenue] =
    useState(0);
    const [visitorTrend, setVisitorTrend] =
  useState<any[]>([]);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {

        const response = await axios.get(
          "http://localhost:8081/api/bookings/all"
        );

        const bookings = response.data;

        setTotalBookings(bookings.length);

        const visitors = bookings.reduce(
          (sum: number, booking: any) =>
            sum + booking.visitorCount,
          0
        );

        setTotalVisitors(visitors);

        const revenue = bookings.reduce(
          (sum: number, booking: any) =>
            sum + booking.totalAmount,
          0
        );

        setTotalRevenue(revenue);
        const trendMap: any = {};

bookings.forEach((booking: any) => {

  const day =
    booking.bookingDate?.substring(0, 10);

  if (!trendMap[day]) {
    trendMap[day] = {
      day: day,
      revenue: 0,
      visitors: 0,
      bookings: 0,
    };
  }

  trendMap[day].revenue +=
    booking.totalAmount;

  trendMap[day].visitors +=
    booking.visitorCount;

  trendMap[day].bookings += 1;
});

setVisitorTrend(
  Object.values(trendMap).sort(
    (a: any, b: any) =>
      new Date(a.day).getTime() -
      new Date(b.day).getTime()
  )
);

      } catch (error) {
        console.error(error);
      }
    };

    loadAnalytics();
  }, []);
  return (
    <DashboardLayout title="Analytics" role="Administrator" items={adminItems}>
      <div className="grid md:grid-cols-3 gap-4 mb-6">

  <Card>
    <CardContent className="p-6">
      <h3>Total Bookings</h3>
      <p className="text-3xl font-bold">
        {totalBookings}
      </p>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-6">
      <h3>Total Visitors</h3>
      <p className="text-3xl font-bold">
        {totalVisitors}
      </p>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-6">
      <h3>Total Revenue</h3>
      <p className="text-3xl font-bold">
        ₹{totalRevenue}
      </p>
    </CardContent>
  </Card>

</div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-border/60">
          <CardContent className="p-6">
            <h3 className="font-display text-lg mb-4">Revenue trend</h3>
            <div className="h-72">
              <ResponsiveContainer>
                <LineChart data={visitorTrend}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="var(--chart-2)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-6">
            <h3 className="font-display text-lg mb-4">Visitor footfall</h3>
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={visitorTrend}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Bar dataKey="visitors" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}