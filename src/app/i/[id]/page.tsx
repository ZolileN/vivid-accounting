"use client";

import { Suspense, use, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Download, Shield, Clock, CheckCircle2, PartyPopper, Copy, Check } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { formatZAR } from "@/lib/currency";
import { PaystackPayButton } from "@/components/payments/PaystackPayButton";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock invoice data — in production this would come from Prisma
function getInvoice(id: string) {
  return {
    id,
    invoiceNum: `INV-2026-${id.padStart(3, "0")}`,
    businessName: "Vivid Accounting",
    businessAddress: "123 Business Road\nCape Town, 8001\nSouth Africa",
    businessEmail: "hello@vivid-accounting.co.za",
    clientName: "SignalDesk Africa",
    clientEmail: "hello@signaldesk.africa",
    clientAddress: "45 Innovation Drive\nJohannesburg, 2000",
    issueDate: "May 8, 2026",
    dueDate: "May 11, 2026",
    status: "UNPAID" as const,
    items: [
      { id: 1, description: "Monthly Retainer — Web Development", details: "Includes hosting and minor updates", quantity: 1, unitPrice: 15000.0 },
      { id: 2, description: "Consultation Hours", details: "Strategic planning and architecture", quantity: 4, unitPrice: 850.0 },
    ],
    templatePreference: "classic", // "modern" or "classic"
    bankDetails: {
      bankName: "Nedbank",
      accountHolder: "ZOLILE NONZAPA",
      accountType: "Current Account",
      branchCode: "198765",
      accountNumber: "1304521303",
      swiftBic: "NEDSZAJJ"
    }
  };
}

function InvoiceStatusBadge({ status }: { status: string }) {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode; className: string }> = {
    PAID: {
      variant: "default",
      icon: <CheckCircle2 className="h-3.5 w-3.5 mr-1" />,
      className: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800",
    },
    UNPAID: {
      variant: "secondary",
      icon: <Clock className="h-3.5 w-3.5 mr-1" />,
      className: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800",
    },
    OVERDUE: {
      variant: "destructive",
      icon: <Clock className="h-3.5 w-3.5 mr-1" />,
      className: "bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-800",
    },
  };

  const config = variants[status] || variants.UNPAID;

  return (
    <Badge variant="outline" className={`text-sm py-1.5 px-3 font-semibold ${config.className}`}>
      {config.icon}
      {status}
    </Badge>
  );
}

type InvoiceData = ReturnType<typeof getInvoice>;

interface InvoiceTemplateProps {
  invoice: InvoiceData;
  subtotal: number;
  tax: number;
  total: number;
}

// ----------------------------------------------------------------------
// MODERN TEMPLATE
// ----------------------------------------------------------------------
function ModernInvoiceTemplate({ invoice, subtotal, tax, total }: InvoiceTemplateProps) {
  return (
    <Card className="p-6 sm:p-10 border shadow-xl shadow-black/5 rounded-2xl bg-card/90 backdrop-blur-sm print:shadow-none print:border-none print:p-0">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent print:text-black">
            INVOICE
          </h2>
          <p className="text-muted-foreground mt-2 font-mono text-sm">{invoice.invoiceNum}</p>
        </div>
        <div className="text-right">
          <h3 className="text-lg font-bold">{invoice.businessName}</h3>
          <p className="text-muted-foreground text-sm mt-1 whitespace-pre-line leading-relaxed">
            {invoice.businessAddress}
          </p>
        </div>
      </div>

      {/* Client + Dates Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-2">
            Billed To
          </p>
          <h4 className="font-bold text-lg">{invoice.clientName}</h4>
          <p className="text-muted-foreground text-sm">{invoice.clientEmail}</p>
          <p className="text-muted-foreground text-sm whitespace-pre-line">{invoice.clientAddress}</p>
        </div>
        <div className="sm:text-right space-y-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:justify-items-end">
            <span className="font-medium text-muted-foreground">Issue Date</span>
            <span className="font-medium">{invoice.issueDate}</span>
            <span className="font-medium text-muted-foreground">Due Date</span>
            <span className="font-medium">{invoice.dueDate}</span>
          </div>
          <div className="pt-3 border-t">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.15em]">
              Amount Due
            </p>
            <p className="text-3xl font-black tracking-tight bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mt-1 print:text-black">
              {formatZAR(total)}
            </p>
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2">
              <TableHead className="w-[50%] font-semibold">Description</TableHead>
              <TableHead className="text-center font-semibold">Qty</TableHead>
              <TableHead className="text-right font-semibold">Unit Price</TableHead>
              <TableHead className="text-right font-semibold">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.items.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="py-4">
                  <div className="font-medium">{item.description}</div>
                  {item.details && <div className="text-sm text-muted-foreground mt-1">{item.details}</div>}
                </TableCell>
                <TableCell className="text-center py-4">{item.quantity}</TableCell>
                <TableCell className="text-right py-4 font-mono text-sm">
                  {formatZAR(item.unitPrice)}
                </TableCell>
                <TableCell className="text-right py-4 font-semibold font-mono text-sm">
                  {formatZAR(item.quantity * item.unitPrice)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Totals */}
      <div className="mt-8 flex justify-end">
        <div className="w-72 space-y-3">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span className="font-mono">{formatZAR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>SARS VAT (15%)</span>
            <span className="font-mono">{formatZAR(tax)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t-2 pt-4">
            <span>Total</span>
            <span className="font-mono bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent print:text-black">
              {formatZAR(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 pt-6 border-t">
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          Payment is due by <span className="font-semibold">{invoice.dueDate}</span>. 
          Please make payment via the &quot;Pay Now&quot; button above. 
          For queries, contact <span className="font-semibold">{invoice.businessEmail}</span>.
        </p>
      </div>
    </Card>
  );
}

// ----------------------------------------------------------------------
// CLASSIC TEMPLATE (Matching the requested image)
// ----------------------------------------------------------------------
function ClassicInvoiceTemplate({ invoice, total }: { invoice: InvoiceData; total: number }) {
  return (
    <Card className="p-8 sm:p-12 border shadow-xl shadow-black/5 rounded-none bg-white text-black print:shadow-none print:border-none print:p-0 font-sans">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {/* Logo Placeholder */}
          <div className="h-12 w-12 rounded-full border-2 border-blue-600 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-2xl">V</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 uppercase">{invoice.businessName}</h1>
            <p className="text-[10px] text-blue-600 tracking-widest uppercase mt-0.5">Hardware | Software | Services</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 mb-6 uppercase">
            {invoice.businessName.split(' ')[0]} INVOICE
          </h2>
          <h3 className="text-sm font-bold text-slate-900">{invoice.businessName}</h3>
          <p className="text-sm text-slate-700 mt-1 whitespace-pre-line leading-snug">
            {invoice.businessAddress}
          </p>
          <div className="mt-4 text-sm text-slate-700">
            <p>{invoice.businessEmail}</p>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-slate-200 mt-8 mb-8" />

      {/* Client + Dates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
            BILL TO
          </p>
          <h4 className="font-bold text-sm text-slate-900">{invoice.clientName}</h4>
          <p className="text-slate-800 text-sm whitespace-pre-line leading-snug">{invoice.clientAddress}</p>
          <div className="mt-4 text-sm text-slate-800">
            <p>{invoice.clientEmail}</p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <div className="w-full max-w-sm">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-2">
              <span className="font-bold text-right text-slate-900">Invoice Number:</span>
              <span className="text-slate-800">{invoice.id}</span>
              
              <span className="font-bold text-right text-slate-900">Invoice Date:</span>
              <span className="text-slate-800">{invoice.issueDate}</span>
              
              <span className="font-bold text-right text-slate-900">Payment Due:</span>
              <span className="text-slate-800">{invoice.dueDate}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-sm bg-slate-100 p-2 font-bold text-slate-900">
              <span className="text-right">Amount Due (ZAR):</span>
              <span>{formatZAR(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="mt-12">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b-2 border-slate-200">
              <th className="py-3 font-bold text-slate-900">Product/Service</th>
              <th className="py-3 font-bold text-slate-900 text-center">Quantity</th>
              <th className="py-3 font-bold text-slate-900 text-right">Price</th>
              <th className="py-3 font-bold text-slate-900 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoice.items.map((item) => (
              <tr key={item.id}>
                <td className="py-4 align-top">
                  <div className="font-bold text-slate-900">{item.description}</div>
                  {item.details && <div className="text-slate-600 mt-1 pr-4">{item.details}</div>}
                </td>
                <td className="py-4 text-center text-slate-800 align-top">{item.quantity}</td>
                <td className="py-4 text-right text-slate-800 align-top">
                  {formatZAR(item.unitPrice)}
                </td>
                <td className="py-4 text-right text-slate-800 align-top">
                  {formatZAR(item.quantity * item.unitPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mt-8 border-t border-slate-200 pt-8 flex justify-end">
        <div className="w-72 space-y-4">
          <div className="flex justify-between text-sm font-bold text-slate-900">
            <span>Total:</span>
            <span>{formatZAR(total)}</span>
          </div>
          <div className="h-px w-full bg-slate-200 my-2" />
          <div className="flex justify-between font-bold text-sm text-slate-900">
            <span>Amount Due (ZAR):</span>
            <span>{formatZAR(total)}</span>
          </div>
        </div>
      </div>

      {/* Footer Bank Details */}
      {invoice.bankDetails && (
        <div className="mt-32 pt-8 text-center">
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {invoice.bankDetails.bankName} Bank Account Details Account Holder: {invoice.bankDetails.accountHolder} Account Type: {invoice.bankDetails.accountType} Branch Code: {invoice.bankDetails.branchCode} BIC/SWIFT: {invoice.bankDetails.swiftBic} Account Number: {invoice.bankDetails.accountNumber}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-blue-800 font-bold tracking-tight">Powered by</span>
            <div className="flex items-center text-blue-600 font-black text-xl italic">
              <span className="mr-1">{"//"}</span> vivid
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}


function InvoiceContent({ id, isPaidSuccess }: { id: string; isPaidSuccess: boolean }) {
  const [copied, setCopied] = useState(false);
  const invoice = getInvoice(id);

  const subtotal = invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  const waLink = generateWhatsAppLink({
    invoiceId: invoice.invoiceNum,
    clientName: invoice.clientName,
    totalAmount: total,
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentStatus = isPaidSuccess ? "PAID" : invoice.status;

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex justify-center print:p-0 print:bg-white">
      <div className="w-full max-w-3xl space-y-6">
        {/* Success Banner */}
        <AnimatePresence>
          {isPaidSuccess && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-emerald-500 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-emerald-500/20 mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <PartyPopper className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold">Payment Successful!</p>
                    <p className="text-emerald-50 text-xs">Thank you for your business. Your receipt has been sent to your email.</p>
                  </div>
                </div>
                <CheckCircle2 className="h-6 w-6 text-white/40" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Bar with Branding */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between print:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">{invoice.businessName}</h1>
              <p className="text-xs text-muted-foreground">{invoice.businessEmail}</p>
            </div>
          </div>
          <InvoiceStatusBadge status={currentStatus} />
        </motion.div>

        {/* Action Bar */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-card/80 backdrop-blur-sm p-4 rounded-2xl border shadow-sm print:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">
              Invoice <span className="font-semibold text-foreground">{invoice.invoiceNum}</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-border" />
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              onClick={handleCopyLink}
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy Link"}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none gap-2" onClick={handlePrint}>
              <Download className="h-4 w-4" /> PDF
            </Button>
            <a 
              href={waLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "flex-1 sm:flex-none bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border-[#25D366]/30 gap-2 transition-all duration-300"
              )}
            >
              <MessageCircle className="h-4 w-4" /> Share
            </a>
            {!isPaidSuccess && (
              <PaystackPayButton
                invoiceId={invoice.invoiceNum}
                amount={total}
                email={invoice.clientEmail}
              />
            )}
          </div>
        </motion.div>

        {/* Invoice Document Card */}
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {invoice.templatePreference === "classic" ? (
            <ClassicInvoiceTemplate invoice={invoice} total={total} />
          ) : (
            <ModernInvoiceTemplate invoice={invoice} subtotal={subtotal} tax={tax} total={total} />
          )}
        </motion.div>

        {/* Trust Footer */}
        {invoice.templatePreference === "modern" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-xs text-muted-foreground pb-8 print:hidden"
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Secured by Paystack • 256-bit SSL encryption</span>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function PublicInvoicePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment?: string }>;
}) {
  const { id } = use(params);
  const { payment } = use(searchParams);
  
  const isPaidSuccess = payment === "success";

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 animate-pulse" />
            <p className="text-muted-foreground text-sm animate-pulse">Loading invoice...</p>
          </div>
        </div>
      }
    >
      <InvoiceContent id={id} isPaidSuccess={isPaidSuccess} />
    </Suspense>
  );
}
