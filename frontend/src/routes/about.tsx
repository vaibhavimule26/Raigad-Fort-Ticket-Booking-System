import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import statueImg from "@/assets/raigad-statue.jpg";
import gateImg from "@/assets/raigad-gate.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Raigad Fort — History & Heritage" },
      { name: "description", content: "Discover Raigad Fort: the capital of Chhatrapati Shivaji Maharaj's Swarajya, its history, architecture, and key landmarks." },
      { property: "og:title", content: "About Raigad Fort" },
      { property: "og:description", content: "History, architecture, and heritage of the Maratha capital." },
    ],
  }),
  component: About,
});

const facts = [
  { k: "Built by", v: "Chandrarao More" },
  { k: "Captured", v: "1656 CE by Shivaji" },
  { k: "Coronation", v: "6 June 1674" },
  { k: "Elevation", v: "820 metres" },
  { k: "Ropeway", v: "Aerial tram available" },
  { k: "Status", v: "ASI Protected Monument" },
];

const landmarks = [
  { title: "Maha Darwaja", desc: "The grand main gateway flanked by massive bastions." },
  { title: "Raj Bhavan", desc: "Ruins of the royal palace where Shivaji held court." },
  { title: "Jagdishwar Temple", desc: "A Hemadpanthi-style Shiva temple of black stone." },
  { title: "Hirakani Buruj", desc: "The famous bastion named after the brave milkmaid Hirakani." },
  { title: "Takmak Tok", desc: "A dramatic cliff used historically for executions." },
  { title: "Samadhi of Shivaji", desc: "The final resting place of Chhatrapati Shivaji Maharaj." },
];

function About() {
  return (
    <PublicLayout>
      <section className="relative isolate">
        <img src={statueImg} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="container mx-auto px-4 py-24 text-white">
          <div className="text-xs uppercase tracking-widest text-accent font-semibold">About</div>
          <h1 className="font-display text-5xl md:text-6xl mt-2">Raigad — The Gibraltar of the East</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Perched on a Sahyadri cliff, Raigad Fort served as the political capital of the
            Maratha Empire. Its strategic isolation made it nearly impregnable.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-4">
        {facts.map((f) => (
          <Card key={f.k} className="border-border/60">
            <CardContent className="p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{f.k}</div>
              <div className="font-display text-2xl mt-1 text-foreground">{f.v}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-10 items-center">
        <img src={gateImg} alt="Maha Darwaja" loading="lazy" className="rounded-xl shadow-lg object-cover h-96 w-full" />
        <div className="space-y-4">
          <h2 className="font-display text-4xl">A capital, a coronation, a kingdom</h2>
          <p className="text-muted-foreground">
            On 6 June 1674, Shivaji was crowned Chhatrapati at Raigad in a coronation
            attended by thousands. From this cliff he governed a vast Swarajya stretching
            across the Deccan, with Raigad as its beating heart.
          </p>
          <p className="text-muted-foreground">
            Today the fort is a protected monument under the Archaeological Survey of India,
            welcoming pilgrims and travellers from across the world.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-4xl text-center mb-10">Key landmarks</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {landmarks.map((l) => (
            <Card key={l.title} className="border-border/60 hover:shadow-md transition">
              <CardContent className="p-6">
                <h3 className="font-display text-xl text-primary">{l.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{l.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}