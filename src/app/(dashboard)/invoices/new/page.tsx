"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, ArrowLeft, MessageCircle, Save, Sparkles, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { createInvoice } from "@/lib/actions/invoices";
import { useRouter } from "next/navigation";

type LineItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

function formatZAR(amount: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  }).format(amount);
}

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
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function NewInvoicePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<LineItem[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0 },
  ]);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [invoiceNum, setInvoiceNum] = useState(() => `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`);

  const addItem = () => {
    setItems([
      ...items,
      { id: Math.random().toString(36).slice(2), description: "", quantity: 1, unitPrice: 0 },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = subtotal * 0.15; // 15% SARS VAT
  const total = subtotal + tax;

  const handleClientSelect = (value: string | null) => {
    if (value === "mandondo") {
      setClientName("Mandondo Consulting");
      setClientEmail("info@mandondo.co.za");
    } else if (value === "signaldesk") {
      setClientName("SignalDesk Africa");
      setClientEmail("hello@signaldesk.africa");
    } else {
      setClientName("");
      setClientEmail("");
    }
  };

  const handleGenerate = async () => {
    if (!clientName || !clientEmail || items[0].description === "") {
      alert("Please fill in all required fields.");
      return;
    }

    setSaving(true);
    const result = await createInvoice({
      invoiceNum,
      clientName,
      clientEmail,
      issueDate: new Date().toISOString(),
      items: items.map(i => ({
        description: i.description,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      })),
    });

    if (result.success) {
      router.push(`/invoices?success=true`);
    } else {
      setSaving(false);
      alert("Failed to save invoice. Please try again.");
    }
  };

  const waLink = generateWhatsAppLink({
    invoiceId: invoiceNum,
    clientName: clientName || "Client",
    totalAmount: total,
  });

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6 max-w-4xl mx-auto w-full"
    >
      <motion.div variants={item} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/invoices">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Create Invoice</h2>
            <p className="text-muted-foreground">Draft a new invoice for a client.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" disabled={saving}>
            <Save className="h-4 w-4" /> Save Draft
          </Button>
          {total > 0 && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "gap-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border-[#25D366]/30 transition-all duration-300"
              )}
            >
              <MessageCircle className="h-4 w-4" /> Share via WhatsApp
            </a>
          )}
          <Button 
            className="bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 gap-2"
            onClick={handleGenerate}
            disabled={saving}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {saving ? "Creating..." : "Generate & Review"}
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div variants={item}>
          <Card className="shadow-sm h-full">
            <CardHeader>
              <CardTitle className="text-base">Client Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Client</Label>
                <Select onValueChange={handleClientSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mandondo">Mandondo Consulting</SelectItem>
                    <SelectItem value="signaldesk">SignalDesk Africa</SelectItem>
                    <SelectItem value="new">+ Add New Client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Client Email</Label>
                <Input
                  type="email"
                  placeholder="client@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="shadow-sm h-full">
            <CardHeader>
              <CardTitle className="text-base">Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Issue Date</Label>
                  <Input type="date" defaultValue="2026-05-13" />
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input type="date" defaultValue="2026-05-30" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-num">Invoice Number</Label>
                <Input 
                  id="invoice-num"
                  placeholder="INV-2026-001" 
                  className="font-mono" 
                  value={invoiceNum}
                  onChange={(e) => setInvoiceNum(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Line Items</CardTitle>
            <CardDescription>Add the products or services for this invoice.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[45%]">Description</TableHead>
                  <TableHead className="w-[12%]">Quantity</TableHead>
                  <TableHead className="w-[18%]">Unit Price (ZAR)</TableHead>
                  <TableHead className="text-right w-[18%]">Total</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input
                          placeholder="Service description"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                          className="text-center"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                          className="font-mono"
                        />
                      </TableCell>
                      <TableCell className="text-right align-middle font-semibold font-mono">
                        {formatZAR(item.quantity * item.unitPrice)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:bg-destructive/10"
                          disabled={items.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>

            <Button variant="outline" className="mt-4 gap-2" onClick={addItem}>
              <Plus className="h-4 w-4" /> Add Item
            </Button>

            <div className="mt-8 flex justify-end">
              <div className="w-72 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono">{formatZAR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">SARS VAT (15%)</span>
                  <span className="font-mono">{formatZAR(tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl border-t pt-3">
                  <span>Total</span>
                  <span className="font-mono bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    {formatZAR(total)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
