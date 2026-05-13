"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, CheckCircle2, Clock, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { formatZAR } from "@/lib/currency";

const mockTransactions = [
  {
    id: "TRX-001",
    date: "2026-05-13",
    description: "Payment from Mandondo Consulting",
    amount: 15000.0,
    type: "INCOME",
    status: "RECONCILED",
    category: "Sales",
  },
  {
    id: "TRX-002",
    date: "2026-05-12",
    description: "Rent Payment - Prime Office Space",
    amount: -8500.0,
    type: "EXPENSE",
    status: "UNRECONCILED",
    category: "Rent",
  },
  {
    id: "TRX-003",
    date: "2026-05-10",
    description: "Electricity Bill - City Power",
    amount: -1200.5,
    type: "EXPENSE",
    status: "RECONCILED",
    category: "Utilities",
  },
  {
    id: "TRX-004",
    date: "2026-05-08",
    description: "Payment from SignalDesk Africa",
    amount: 24500.0,
    type: "INCOME",
    status: "UNRECONCILED",
    category: "Sales",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { x: -10, opacity: 0 },
  show: { x: 0, opacity: 1 },
};

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground">
            Monitor your business cash flow and reconcile payments.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button className="bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25">
            Add Transaction
          </Button>
        </motion.div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-3"
      >
        <motion.div variants={item}>
          <Card className="bg-linear-to-br from-violet-500/5 to-indigo-500/10 border-violet-200/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R 128,450.00</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="bg-linear-to-br from-emerald-500/5 to-emerald-500/10 border-emerald-200/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Income (MTD)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">+ R 39,500.00</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="bg-linear-to-br from-rose-500/5 to-rose-500/10 border-rose-200/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Expenses (MTD)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rose-600">- R 9,700.50</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <Card className="shadow-sm border-violet-100/50 overflow-hidden">
        <CardHeader className="bg-muted/30 pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search transactions..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {mockTransactions.map((trx) => (
                  <TableRow key={trx.id} className="hover:bg-muted/30 transition-colors group">
                    <TableCell className="text-sm text-muted-foreground">{trx.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-full ${trx.type === "INCOME" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}>
                          {trx.type === "INCOME" ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                        </div>
                        <span className="font-medium">{trx.description}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal bg-slate-100">
                        {trx.category}
                      </Badge>
                    </TableCell>
                    <TableCell className={`font-semibold ${trx.type === "INCOME" ? "text-emerald-600" : "text-rose-600"}`}>
                      {trx.type === "INCOME" ? "+" : "-"} {formatZAR(Math.abs(trx.amount))}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`gap-1 ${trx.status === "RECONCILED" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-amber-50 text-amber-600 border-amber-200"}`}
                      >
                        {trx.status === "RECONCILED" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        {trx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
