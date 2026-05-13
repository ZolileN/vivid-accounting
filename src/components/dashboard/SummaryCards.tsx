"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, DollarSign, CreditCard, Activity, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export function SummaryCards() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      <motion.div variants={item}>
        <Card className="relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-emerald-500/0 group-hover:from-emerald-500/10 transition-all duration-300" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">R 45,231.89</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 inline-flex items-center font-semibold">
                <ArrowUpRight className="mr-0.5 h-3 w-3" />
                +20.1%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-amber-500/0 group-hover:from-amber-500/10 transition-all duration-300" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Outstanding Invoices</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">R 12,050.00</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-rose-500 inline-flex items-center font-semibold">
                <ArrowDownRight className="mr-0.5 h-3 w-3" />
                -4%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute inset-0 bg-linear-to-br from-rose-500/5 to-rose-500/0 group-hover:from-rose-500/10 transition-all duration-300" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Upcoming Bills</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
              <Activity className="h-4 w-4 text-rose-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">R 3,200.00</div>
            <p className="text-xs text-muted-foreground mt-1">
              Due within next 7 days
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute inset-0 bg-linear-to-br from-violet-500/5 to-violet-500/0 group-hover:from-violet-500/10 transition-all duration-300" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Cash Flow</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-violet-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-emerald-600">+ R 8,500.00</div>
            <p className="text-xs text-muted-foreground mt-1">
              Net positive this month
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
