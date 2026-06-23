import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { securityItems } from "@/components/AdminNav";
import { ScanLine, CheckCircle2 } from "lucide-react";
import QRScanner from "@/components/QRScanner";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/security/scan")({
  head: () => ({ meta: [{ title: "QR Scanner — Security" }] }),
  component: Scan,
});

function Scan() {
  const [code, setCode] = useState("");
  const [last, setLast] = useState<string | null>(null);
  const [result, setResult] = useState("");
  return (
    <DashboardLayout title="QR Scanner" role="Security" items={securityItems}>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-border/60">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <div className="w-full aspect-square max-w-sm rounded-xl border-2 border-dashed border-primary/40 bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative overflow-hidden">
              <ScanLine className="h-20 w-20 text-primary/40" />
              <div className="absolute inset-x-6 h-0.5 bg-accent animate-pulse top-1/2" />
            </div>
            <p className="text-sm text-muted-foreground">Point the camera at the visitor's QR code.</p>
            <QRScanner
  onScanSuccess={(decodedText) => {
    setCode(decodedText);
  }}
/>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-display text-lg">Manual entry</h3>
            <form
              className="flex gap-2"
              onSubmit={async (e) => {
  e.preventDefault();

  if (!code) return;

  try {

    const response = await axios.post(
      `http://localhost:8081/api/bookings/verify/${code}`
    );

    setResult(response.data);

    setLast(code);

    toast.success(response.data);

    setCode("");

  } catch (error) {

    console.error(error);

    toast.error("Invalid QR Code");
  }
}}
            >
              <Input placeholder="RGD-XXXX-XXXXX" value={code} onChange={(e) => setCode(e.target.value)} />
              <Button type="submit">Verify</Button>
            </form>
            {last && (
              <div className="rounded-md border border-accent/40 bg-accent/10 p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent-foreground mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">
  {result}
</div>
                  <div className="text-muted-foreground font-mono text-xs">{last}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}