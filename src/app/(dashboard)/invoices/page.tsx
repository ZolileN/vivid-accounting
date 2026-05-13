"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, MoreHorizontal, MessageCircle, Eye, Trash2, FileText, TrendingUp, Clock, CheckCircle2, Copy, Check } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { motion, AnimatePresence } from "framer-motion";

const mockInvoices = [
  {
    id: "INV-001",
    client: "Mandondo Consulting",
    email: "info@mandondo.co.za",
    date: "2026-05-10",
    amount: 15000.0,
    status: "PAID",
  },
  {
    id: "INV-002",
    client: "SignalDesk Africa",
    email: "hello@signaldesk.africa",
    date: "2026-05-12",
    amount: 24500.0,
    status: "SENT",
  },
  {
    id: "INV-003",
    client: "TechCorp SA",
    email: "accounts@techcorp.co.za",
    date: "2026-04-20",
    amount: 8200.0,
    status: "OVERDUE",
  },
  {
    id: "INV-004",
    client: "Local Retailer",
    email: "orders@localretailer.co.za",
    date: "2026-05-13",
    amount: 3450.0,
    status: "DRAFT",
  },
];

const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; className: string; icon: React.ReactNode }> = {
  PAID: {
    variant: "default",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-500/20",
    icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
  },
  SENT: {
    variant: "secondary",
    className: "bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-500/20",
    icon: <TrendingUp className="h-3 w-3 mr-1" />,
  },
  OVERDUE: {
    variant: "destructive",
    className: "bg-rose-500/10 text-rose-600 border-rose-200 hover:bg-rose-500/20",
    icon: <Clock className="h-3 w-3 mr-1" />,
  },
  DRAFT: {
    variant: "outline",
    className: "bg-slate-500/10 text-slate-500 border-slate-200 hover:bg-slate-500/20",
    icon: <FileText className="h-3 w-3 mr-1" />,
  },
};

function formatZAR(amount: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  }).format(amount);
}

// Summary stats
const totalRevenue = mockInvoices.filter(i => i.status === "PAID").reduce((sum, i) => sum + i.amount, 0);
const totalOutstanding = mockInvoices.filter(i => i.status !== "PAID" && i.status !== "DRAFT").reduce((sum, i) => sum + i.amount, 0);
const totalOverdue = mockInvoices.filter(i => i.status === "OVERDUE").length;

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
  hidden: { x: -20, opacity: 0 },
  show: { x: 0, opacity: 1 },
};

export default function InvoicesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}/i/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
          <p className="text-muted-foreground">
            Manage your invoices and track payments.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Link href="/invoices/new">
            <Button className="bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 gap-2">
              <Plus className="h-4 w-4" /> Create Invoice
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-3"
      >
        <motion.div variants={item}>
          <Card className="bg-linear-to-br from-emerald-500/5 to-emerald-500/10 border-emerald-200/50 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{formatZAR(totalRevenue)}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="bg-linear-to-br from-blue-500/5 to-blue-500/10 border-blue-200/50 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatZAR(totalOutstanding)}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="bg-linear-to-br from-rose-500/5 to-rose-500/10 border-rose-200/50 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rose-600">{totalOverdue} invoice{totalOverdue !== 1 && "s"}</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Invoice Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border bg-card shadow-sm overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="font-semibold">Invoice</TableHead>
              <TableHead className="font-semibold">Client</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {mockInvoices.map((invoice) => {
                const config = statusConfig[invoice.status] || statusConfig.DRAFT;
                const waLink = generateWhatsAppLink({
                  invoiceId: invoice.id,
                  clientName: invoice.client,
                  totalAmount: invoice.amount,
                });

                return (
                  <TableRow
                    key={invoice.id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <TableCell className="font-semibold font-mono text-sm">{invoice.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{invoice.client}</p>
                        <p className="text-xs text-muted-foreground">{invoice.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                    <TableCell className="font-semibold font-mono">{formatZAR(invoice.amount)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold ${config.className}`}
                      >
                        {config.icon}
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="ghost" className="h-8 w-8 p-0 opacity-50 group-hover:opacity-100 transition-opacity">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>
                            <Link href={`/i/${invoice.id}`} className="flex items-center gap-2 cursor-pointer w-full">
                              <Eye className="h-4 w-4" /> View Invoice
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCopyLink(invoice.id)} className="flex items-center gap-2 cursor-pointer">
                            {copiedId === invoice.id ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                            {copiedId === invoice.id ? "Copied Link" : "Copy Link"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 cursor-pointer w-full"
                            >
                              <MessageCircle className="h-4 w-4 text-[#25D366]" /> Share via WhatsApp
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive flex items-center gap-2">
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
