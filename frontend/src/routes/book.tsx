import axios from "axios";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo, useState, useEffect } from "react";
import { Ticket, BookOpenCheck, History, User } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/book")({
  head: () => ({ meta: [{ title: "Book Ticket — Raigad Fort" }] }),
  component: Book,
});

const items = [
  { to: "/dashboard", label: "Overview", icon: BookOpenCheck },
  { to: "/book", label: "Book Ticket", icon: Ticket },
  { to: "/bookings", label: "My Bookings", icon: History },
  { to: "/profile", label: "Profile", icon: User },
];

const PRICES = { adult: 50, child: 25, foreign: 600, student: 30 } as const;

  function Book() {

  const nav = useNavigate();

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      nav({ to: "/login" });

    }

  }, []);

  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [foreign, setForeign] = useState(0);
  const [student, setStudent] = useState(0);

  const [slots, setSlots] = useState<any[]>([]);

  const [selectedSlotId, setSelectedSlotId] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const total = useMemo(
    () =>
      adult * PRICES.adult +
      child * PRICES.child +
      foreign * PRICES.foreign +
      student * PRICES.student,
    [adult, child, foreign, student]
  );

  useEffect(() => {
  const loadSlots = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/slots/all"
      );

      setSlots(response.data);

      if (response.data.length > 0) {
        setSelectedSlotId(
          response.data[0].id.toString()
        );
      }

    } catch (error) {
      console.error(error);
    }
  };

  loadSlots();

}, []);

 
  return (
    <DashboardLayout title="Book Ticket" role="Visitor" items={items}>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="border-border/60 lg:col-span-2">
          <CardContent className="p-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Visit date</Label>
                <Input type="date" defaultValue="2026-06-12" required />
              </div>
              <div className="space-y-1.5">
                <Label>Time slot</Label>
                <Select
  value={selectedSlotId}
  onValueChange={(value) =>
    setSelectedSlotId(value)
  }
>
  <SelectTrigger>
    <SelectValue placeholder="Select Slot" />
  </SelectTrigger>

  <SelectContent>
    {slots.map((slot) => (
      <SelectItem
  key={slot.id}
  value={slot.id.toString()}
>
  {slot.slotName} ({slot.startTime} - {slot.endTime})

  {slot.availableCapacity === 0
    ? " ❌ SOLD OUT"
    : slot.availableCapacity < 50
    ? ` ⚠ Almost Full (${slot.availableCapacity}/${slot.maxCapacity})`
    : ` ✅ Available (${slot.availableCapacity}/${slot.maxCapacity})`}
</SelectItem>
    ))}
  </SelectContent>
</Select>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-lg">Tickets</h3>
              {([
                ["Indian Adult", "₹50", adult, setAdult],
                ["Indian Child", "₹25", child, setChild],
                ["Foreign National", "₹600", foreign, setForeign],
                ["Student / Group", "₹30", student, setStudent],
              ] as const).map(([label, price, val, set]) => (
                <div key={label} className="flex items-center justify-between p-3 rounded-md border border-border bg-card">
                  <div>
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-xs text-muted-foreground">{price} per person</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button type="button" size="sm" variant="outline" onClick={() => set(Math.max(0, val - 1))}>−</Button>
                    <div className="w-8 text-center font-semibold">{val}</div>
                    <Button type="button" size="sm" variant="outline" onClick={() => set(val + 1)}>+</Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <Label>Lead visitor ID (Aadhaar / Passport)</Label>
              <Input placeholder="XXXX-XXXX-XXXX" required />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 h-fit sticky top-20">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-display text-xl">Order summary</h3>
            <div className="space-y-1 text-sm">
              <Row label={`Adult × ${adult}`} value={adult * PRICES.adult} />
              <Row label={`Child × ${child}`} value={child * PRICES.child} />
              <Row label={`Foreign × ${foreign}`} value={foreign * PRICES.foreign} />
              <Row label={`Student × ${student}`} value={student * PRICES.student} />
            </div>
           <div className="border-t border-border pt-3 flex items-center justify-between">
  <span className="text-sm text-muted-foreground">Total</span>
  <span className="font-display text-2xl text-primary">
    ₹{total}
  </span>
</div>

{/* ADD BUTTON HERE */}

<Button
  className="w-full"
  disabled={total === 0 || loading}
  onClick={async () => {

    setLoading(true);

    try {

      const userId =
        localStorage.getItem("userId");

      const visitorCount =
        adult + child + foreign + student;

      const response = await axios.post(
        "http://localhost:8081/api/bookings/book",
        {
  userId: Number(userId),
  slotId: Number(selectedSlotId),

  adultCount: adult,
  childCount: child,
  foreignCount: foreign,
  studentCount: student
}
      );

      toast.success(response.data);

      nav({ to: "/bookings" });

    } catch (error) {

      console.error(error);

      toast.error("Booking Failed");

    } finally {

      setLoading(false);

    }

  }}
>
  {loading
    ? "Booking Ticket..."
    : "Confirm & Pay"}
</Button>

<p className="text-[11px] text-muted-foreground text-center">
  You'll receive a QR e-ticket. Carry a valid ID at the gate.
</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-foreground">
      <span className="text-muted-foreground">{label}</span>
      <span>₹{value}</span>
    </div>
  );
}