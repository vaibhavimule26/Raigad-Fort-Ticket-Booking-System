import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label, value, hint, icon: Icon, accent = "primary",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: "primary" | "accent" | "chart-2" | "chart-3";
}) {
  const accentMap = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/15 text-accent-foreground",
    "chart-2": "bg-[color:var(--chart-2)]/15 text-[color:var(--chart-2)]",
    "chart-3": "bg-[color:var(--chart-3)]/15 text-[color:var(--chart-3)]",
  } as const;

  return (
    <Card className="border-border/60 hover:shadow-md transition-shadow">
      <CardContent className="p-5 flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-1 text-2xl font-display font-semibold text-foreground">{value}</div>
          {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
        </div>
        <div className={cn("h-10 w-10 rounded-md flex items-center justify-center", accentMap[accent])}>
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}