import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const transactions = [
  {
    id: "1",
    name: "Web Development Services",
    email: "client@example.com",
    amount: "+R 15,000.00",
    isIncome: true,
    date: "2026-05-12",
  },
  {
    id: "2",
    name: "AWS Hosting",
    email: "billing@aws.amazon.com",
    amount: "-R 850.00",
    isIncome: false,
    date: "2026-05-11",
  },
  {
    id: "3",
    name: "Consulting — Q2",
    email: "sarah@startup.co.za",
    amount: "+R 7,500.00",
    isIncome: true,
    date: "2026-05-10",
  },
  {
    id: "4",
    name: "Office Supplies",
    email: "sales@makro.co.za",
    amount: "-R 1,200.00",
    isIncome: false,
    date: "2026-05-09",
  },
];

const avatarColors = [
  "bg-violet-500/10 text-violet-600",
  "bg-sky-500/10 text-sky-600",
  "bg-emerald-500/10 text-emerald-600",
  "bg-amber-500/10 text-amber-600",
];

export function RecentTransactions() {
  return (
    <Card className="col-span-1 md:col-span-2 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
        <CardDescription>You have 4 new transactions this week.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {transactions.map((transaction, i) => (
            <div key={transaction.id} className="flex items-center group hover:bg-muted/30 -mx-2 px-2 py-1.5 rounded-lg transition-colors">
              <Avatar className={`h-10 w-10 ${avatarColors[i % avatarColors.length]}`}>
                <AvatarFallback className={`text-xs font-bold ${avatarColors[i % avatarColors.length]}`}>
                  {transaction.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-0.5 flex-1 min-w-0">
                <p className="text-sm font-medium leading-none truncate">{transaction.name}</p>
                <p className="text-xs text-muted-foreground">{transaction.date}</p>
              </div>
              <div className={`ml-4 font-semibold text-sm font-mono ${transaction.isIncome ? "text-emerald-600" : "text-foreground"}`}>
                {transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
