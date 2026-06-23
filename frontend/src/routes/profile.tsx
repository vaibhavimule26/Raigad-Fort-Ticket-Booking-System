import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Ticket, BookOpenCheck, History, User } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Raigad Fort" }] }),
  component: Profile,
});

const items = [
  { to: "/dashboard", label: "Overview", icon: BookOpenCheck },
  { to: "/book", label: "Book Ticket", icon: Ticket },
  { to: "/bookings", label: "My Bookings", icon: History },
  { to: "/profile", label: "Profile", icon: User },
];

function Profile() {

  const fullName =
    localStorage.getItem("fullName") || "";

  const email =
    localStorage.getItem("userEmail") || "";

    const [city, setCity] = useState(
  localStorage.getItem("city") || ""
);

const [phone, setPhone] = useState(
  localStorage.getItem("phone") || ""
);

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const firstName =
    fullName.split(" ")[0] || "";

  const lastName =
    fullName.split(" ").slice(1).join(" ");

  return (
    <DashboardLayout title="My Profile" role="Visitor" items={items}>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="border-border/60">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-accent to-primary text-primary-foreground flex items-center justify-center text-2xl font-display font-semibold">
              {initials}
            </div>
            <h2 className="font-display text-xl mt-3"> {fullName}</h2>
            
          </CardContent>
        </Card>
        <Card className="border-border/60 lg:col-span-2">
          <CardContent className="p-6">
<form
  className="grid sm:grid-cols-2 gap-4"
  onSubmit={async (e) => {

    e.preventDefault();

    try {

      const userId =
        localStorage.getItem("userId");

      await axios.put(
        `http://localhost:8081/api/users/update/${userId}`,
        {
          fullName,
          phone,
          city,
        }
      );

      localStorage.setItem(
        "city",
        city
      );

      localStorage.setItem(
        "phone",
        phone
      );

      toast.success(
        "Profile Updated Successfully"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Profile Update Failed"
      );

    }

  }}
>              <div className="space-y-1.5"><Label>First name</Label><Input defaultValue={firstName}  /></div>
              <div className="space-y-1.5"><Label>Last name</Label><Input defaultValue={lastName} /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label>Email</Label><Input
  type="email"
  defaultValue={email}
/></div>
              <div className="space-y-1.5"><Label>Phone</Label><Input
  type="tel"
  value={phone}
  onChange={(e) =>
    setPhone(e.target.value)
  }
/></div>
              <div className="space-y-1.5"><Label>City</Label><Input
  value={city}
  onChange={(e) =>
    setCity(e.target.value)
  }
/></div>
              <div className="sm:col-span-2 flex justify-end"><Button type="submit">Save changes</Button></div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}