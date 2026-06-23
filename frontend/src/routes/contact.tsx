import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Raigad Fort Visitor Services" },
      { name: "description", content: "Reach the Raigad Fort visitor services team for bookings, group tours, and accessibility support." },
      { property: "og:title", content: "Contact Raigad Fort" },
      { property: "og:description", content: "Visitor services, bookings, and group inquiries." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PublicLayout>
      <section className="container mx-auto px-4 pt-16 pb-6 text-center">
        <div className="text-xs uppercase tracking-widest text-accent font-semibold">Contact</div>
        <h1 className="font-display text-5xl mt-2">We're happy to help</h1>
      </section>
      <section className="container mx-auto px-4 py-10 grid lg:grid-cols-3 gap-6">
        <Card className="border-border/60 lg:col-span-2">
          <CardContent className="p-6">
            <form
              className="grid sm:grid-cols-2 gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Message sent! We'll respond within 1 business day.");
              }}
            >
              <div className="space-y-1">
                <Label>Full name</Label>
                <Input required placeholder="Your name" />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input type="email" required placeholder="you@example.com" />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <Label>Subject</Label>
                <Input required placeholder="How can we help?" />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <Label>Message</Label>
                <Textarea rows={6} required placeholder="Tell us more…" />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <Button type="submit">Send message</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {[
            { icon: MapPin, t: "Visit", d: "Raigad Fort, Mahad, Maharashtra 402305" },
            { icon: Phone, t: "Call", d: "+91 22 2202 4522" },
            { icon: Mail, t: "Email", d: "info@raigadfort.gov.in" },
          ].map((c) => (
            <Card key={c.t} className="border-border/60">
              <CardContent className="p-5 flex gap-3">
                <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{c.t}</div>
                  <div className="text-sm text-muted-foreground">{c.d}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}