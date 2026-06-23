import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { adminItems } from "@/components/AdminNav";
import { Download, FileText } from "lucide-react";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({ meta: [{ title: "Reports — Admin" }] }),
  component: Reports,
});

const reports = [
  { name: "Daily revenue report", period: "12 Jun 2026" },
  { name: "Weekly visitor summary", period: "Week 24, 2026" },
  { name: "Monthly tax report (GST)", period: "May 2026" },
  { name: "Foreign visitor breakdown", period: "Q2 2026" },
  { name: "Slot utilisation report", period: "Last 30 days" },
];

function Reports() {
  const exportReport = (reportName: string) => {

  const csvContent =
    "Report Name,Generated Date\n" +
    `${reportName},${new Date().toLocaleDateString()}`;

  const blob = new Blob(
    [csvContent],
    { type: "text/csv" }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    reportName.replaceAll(" ", "_") + ".csv";

  link.click();

  window.URL.revokeObjectURL(url);
};
  return (
    <DashboardLayout title="Reports" role="Administrator" items={adminItems}>
      <div className="grid sm:grid-cols-2 gap-4">
        {reports.map((r) => (
          <Card key={r.name} className="border-border/60">
            <CardContent className="p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center"><FileText className="h-5 w-5" /></div>
                <div>
                  <div className="font-medium text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.period}</div>
                </div>
              </div>
              <Button
  variant="outline"
  size="sm"
  onClick={() =>
    exportReport(r.name)
  }
>
  <Download className="h-4 w-4 mr-1" />
  Export
</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}