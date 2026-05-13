import Link from "next/link";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { CashFlowChart } from "@/components/dashboard/CashFlowChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { UpcomingBills } from "@/components/dashboard/UpcomingBills";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Your financial command center. Welcome back.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Download Report
          </Button>
          <Link href="/invoices/new">
            <Button className="bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 gap-2">
              <Plus className="h-4 w-4" /> New Invoice
            </Button>
          </Link>
        </div>
      </div>

      <SummaryCards />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CashFlowChart />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <RecentTransactions />
        <UpcomingBills />
      </div>
    </div>
  );
}
