import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, Info } from "lucide-react";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "Ticket Information — Raigad Fort" },
      { name: "description", content: "Ticket categories, pricing, timings, and visitor guidelines for Raigad Fort." },
      { property: "og:title", content: "Ticket Information — Raigad Fort" },
      { property: "og:description", content: "Plans, pricing, and timings for your visit." },
    ],
  }),
  component: Tickets,
});

const plans = [
  { name: "Indian Adult", price: 50, includes: ["Entry to fort", "Heritage walk map", "Valid 1 day"] },
  { name: "Indian Child", price: 25, includes: ["Below 12 yrs", "Heritage walk map", "Valid 1 day"], highlight: false },
  { name: "Foreign National", price: 600, includes: ["Entry to fort", "Audio guide", "Valid 1 day"], highlight: true },
  { name: "Student / Group", price: 30, includes: ["Verified ID required", "10+ pax discount", "Valid 1 day"] },
];

function Tickets() {
  return (
    <PublicLayout>
      <section className="container mx-auto px-4 pt-16 pb-8 text-center">
        <div className="text-xs uppercase tracking-widest text-accent font-semibold">Tickets</div>
        <h1 className="font-display text-5xl mt-2">Choose your pass</h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          All tickets include access to the upper fort plateau and major landmarks.
          Ropeway charges are billed separately at the foothill.
        </p>
      </section>

      <section className="container mx-auto px-4 py-10 grid md:grid-cols-4 gap-6">
        {plans.map((p) => (
          <Card key={p.name} className={`relative border-border/60 ${p.highlight ? "ring-2 ring-accent" : ""}`}>
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[10px] uppercase font-semibold px-2 py-0.5 rounded">
                Popular
              </span>
            )}
            <CardContent className="p-6 space-y-4">
              <h3 className="font-display text-2xl">{p.name}</h3>
              <div>
                <span className="text-4xl font-display font-semibold text-primary">₹{p.price}</span>
                <span className="text-muted-foreground text-sm"> /person</span>
              </div>
              <ul className="space-y-2 text-sm">
                {p.includes.map((i) => (
                  <li key={i} className="flex gap-2"><Check className="h-4 w-4 text-accent" />{i}</li>
                ))}
              </ul>
              <Button asChild className="w-full"><Link to="/book">Book {p.name}</Link></Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
        <Card className="border-border/60">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-primary"><Clock className="h-5 w-5" /><h3 className="font-display text-xl">Timings</h3></div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Mon – Sun: 9:00 AM – 6:00 PM</li>
              <li>Last entry: 5:00 PM</li>
              <li>Ropeway: 8:00 AM – 5:30 PM</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-primary"><Info className="h-5 w-5" /><h3 className="font-display text-xl">Visitor guidelines</h3></div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>· Carry a valid government-issued photo ID</li>
              <li>· No littering or graffiti on monuments</li>
              <li>· Drones permitted only with prior ASI approval</li>
              <li>· Wear comfortable footwear for the trek</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </PublicLayout>
  );
}