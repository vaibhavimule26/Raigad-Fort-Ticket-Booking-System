import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, MapPin, QrCode, ShieldCheck, Sparkles, Ticket } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImg from "@/assets/raigad-hero.jpg";
import statueImg from "@/assets/raigad-statue.jpg";
import gateImg from "@/assets/raigad-gate.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raigad Fort — Official Ticket Booking & Visitor Management" },
      { name: "description", content: "Book heritage tickets to Raigad Fort, capital of Shivaji Maharaj's Swarajya. Skip the queue with digital QR tickets." },
      { property: "og:title", content: "Raigad Fort — Heritage Ticket Booking" },
      { property: "og:description", content: "Plan your visit to Raigad Fort with secure online booking and instant QR e-tickets." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Raigad Fort at golden hour"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="container mx-auto px-4 py-24 md:py-36 text-white">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-widest backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Capital of Swarajya
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05]">
  Experience the Legacy of<br />
  <span className="italic text-accent">
    Chhatrapati Shivaji Maharaj
  </span>
</h1>
            <p className="text-lg text-white/85 max-w-xl">
              Book your official e-ticket to Raigad Fort in seconds. Choose your time slot,
              pay securely, and breeze through entry with a digital QR pass.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
                <Link to="/book">
                  Book Tickets <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Link to="/about">Explore the Fort</Link>
              </Button>
            </div>
            <dl className="grid grid-cols-3 gap-4 pt-6 max-w-md">
              {[
                { k: "820m", v: "Above sea level" },
                { k: "1656", v: "Captured by Shivaji" },
                { k: "300+", v: "Heritage structures" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-display text-2xl text-accent">{s.k}</dt>
                  <dd className="text-xs text-white/70">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-accent font-semibold">Why book online</div>
          <h2 className="font-display text-4xl mt-2">A heritage visit, modernised</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Ticket, title: "Instant E-Tickets", desc: "Confirmation in seconds. No queues at the counter." },
            { icon: QrCode, title: "Scan & Enter", desc: "A single QR code grants entry for your entire group." },
            { icon: ShieldCheck, title: "Secure & Official", desc: "Authorised by ASI & Govt. of Maharashtra." },
          ].map((f) => (
            <Card key={f.title} className="border-border/60">
              <CardContent className="p-6 space-y-3">
                <div className="h-11 w-11 rounded-md flex items-center justify-center bg-primary text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Gallery / story */}
      <section className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <div className="text-xs uppercase tracking-widest text-accent font-semibold">The Living Fort</div>
          <h2 className="font-display text-4xl">Where stone remembers a king</h2>
          <p className="text-muted-foreground">
            Crowned as the capital in 1674, Raigad witnessed the coronation of Chhatrapati
            Shivaji Maharaj. Its towering gates, royal court, and cliffside throne still
            echo with the spirit of Swarajya.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5" /> Mahad Tehsil, Raigad district, Maharashtra</li>
            <li className="flex gap-2"><Calendar className="h-4 w-4 text-primary mt-0.5" /> Open all days · 9:00 AM – 6:00 PM</li>
          </ul>
          <Button asChild variant="outline"><Link to="/about">Read the history</Link></Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <img src={statueImg} alt="Statue of Shivaji Maharaj" loading="lazy" width={1280} height={896}
            className="rounded-lg object-cover h-64 w-full shadow-md" />
          <img src={gateImg} alt="Stone gateway" loading="lazy" width={1280} height={896}
            className="rounded-lg object-cover h-64 w-full shadow-md mt-8" />
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-2xl p-10 md:p-14 text-center text-primary-foreground relative overflow-hidden"
             style={{ background: "var(--gradient-gold)" }}>
          <h2 className="font-display text-3xl md:text-4xl text-primary">Plan your pilgrimage today</h2>
          <p className="mt-2 text-primary/80 max-w-xl mx-auto">Limited slots per day to protect this living heritage. Book early to reserve your spot.</p>
          <Button asChild size="lg" className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/book">Book Now <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
