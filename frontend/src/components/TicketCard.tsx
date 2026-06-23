import { QRCodeCanvas } from "qrcode.react";
import { CalendarDays, Users, Ticket as TicketIcon } from "lucide-react";

export interface TicketData {
  id: string;
  visitorName: string;
  date: string;
  slot: string;
  type: string;
  count: number;
  amount: number;
  status: "active" | "used" | "expired";
}

export function TicketCard({ ticket }: { ticket: TicketData }) {
  return (
    <div className="relative grid sm:grid-cols-[1fr_auto] overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-heritage)]">
      <div className="absolute left-0 top-0 h-full w-1.5 bg-[image:var(--gradient-gold)]" />
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Heritage E-Ticket</div>
            <h3 className="font-display text-xl font-semibold text-foreground">Raigad Fort</h3>
          </div>
          <span className={`text-[10px] uppercase font-semibold px-2 py-1 rounded ${
            ticket.status === "active" ? "bg-accent/20 text-accent-foreground"
            : ticket.status === "used" ? "bg-muted text-muted-foreground"
            : "bg-destructive/15 text-destructive"
          }`}>{ticket.status}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-xs text-muted-foreground">Visitor</div>
            <div className="font-medium text-foreground">{ticket.visitorName}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Ticket ID</div>
            <div className="font-mono text-xs text-foreground">{ticket.id}</div>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span className="text-foreground">{ticket.date} · {ticket.slot}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-foreground">{ticket.count} × {ticket.type}</span>
          </div>
        </div>
        <div className="pt-3 border-t border-dashed border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TicketIcon className="h-4 w-4" /> Total
          </div>
          <div className="font-display text-xl font-semibold text-primary">₹{ticket.amount}</div>
        </div>
      </div>
      <div className="bg-secondary/50 border-l border-dashed border-border p-5 flex flex-col items-center justify-center gap-2">
        <div className="rounded-md bg-white p-2">
          <QRCodeCanvas value={ticket.id} size={110} />
        </div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Scan at gate</div>
      </div>
    </div>
  );
}