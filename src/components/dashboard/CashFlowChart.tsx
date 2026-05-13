"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

// Static data to avoid hydration mismatches from Math.random()
const data = [
  { name: "Jan", income: 28500, expenses: 12000 },
  { name: "Feb", income: 32000, expenses: 15500 },
  { name: "Mar", income: 45000, expenses: 18000 },
  { name: "Apr", income: 38000, expenses: 14200 },
  { name: "May", income: 52000, expenses: 21000 },
  { name: "Jun", income: 48000, expenses: 16800 },
];

export function CashFlowChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="col-span-1 md:col-span-3 lg:col-span-4"
    >
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg">Cash Flow</CardTitle>
          <CardDescription>Monthly overview of income vs expenses.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `R${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1)",
                  backgroundColor: "hsl(var(--card))",
                  padding: "12px 16px",
                }}
                formatter={(value: any, name: any) => [
                  `R ${Number(value).toLocaleString("en-ZA")}`,
                  String(name) === "income" ? "Income" : "Expenses",
                ]}
              />
              <Bar
                dataKey="income"
                fill="url(#incomeGradient)"
                radius={[6, 6, 0, 0]}
                maxBarSize={40}
                animationDuration={1500}
              />
              <Bar
                dataKey="expenses"
                fill="url(#expenseGradient)"
                radius={[6, 6, 0, 0]}
                maxBarSize={40}
                animationDuration={2000}
              />
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e2e8f0" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#cbd5e1" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
