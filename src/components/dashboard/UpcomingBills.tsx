import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar } from "lucide-react";

const bills = [
  {
    id: "1",
    vendor: "Vodacom",
    description: "Fiber Internet",
    amount: "R 999.00",
    dueDate: "Tomorrow",
    status: "PENDING",
  },
  {
    id: "2",
    vendor: "Google Workspace",
    description: "Monthly Subscription",
    amount: "R 250.00",
    dueDate: "In 3 days",
    status: "PENDING",
  },
  {
    id: "3",
    vendor: "SARS",
    description: "Provisional Tax",
    amount: "R 5,000.00",
    dueDate: "In 5 days",
    status: "URGENT",
  },
];

export function UpcomingBills() {
  return (
    <Card className="col-span-1 md:col-span-2 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Bills</CardTitle>
        <CardDescription>You have 3 bills due in the next 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                bill.status === "URGENT"
                  ? "bg-rose-500/5 border-rose-200/50 hover:bg-rose-500/10"
                  : "bg-card hover:bg-muted/30 border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                  bill.status === "URGENT"
                    ? "bg-rose-500/10"
                    : "bg-muted"
                }`}>
                  {bill.status === "URGENT" ? (
                    <AlertTriangle className="h-4 w-4 text-rose-500" />
                  ) : (
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium leading-none flex items-center gap-2">
                    {bill.vendor}
                    {bill.status === "URGENT" && (
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0 bg-rose-500">
                        URGENT
                      </Badge>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{bill.description}</p>
                </div>
              </div>
              <div className="text-right space-y-0.5">
                <div className="font-semibold text-sm font-mono">{bill.amount}</div>
                <div className="text-[11px] text-muted-foreground">Due: {bill.dueDate}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
