"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, PiggyBank, ShieldCheck, Zap, ArrowRight, Wallet, History, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function BankingPage() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [step, setStep] = useState(0);

  const startConnection = () => {
    setIsConnecting(true);
    setStep(1);
    setTimeout(() => setStep(2), 2000);
    setTimeout(() => {
      setIsConnecting(false);
      setStep(0);
    }, 4500);
  };

  const connectedAccounts = [
    {
      id: "1",
      bank: "Standard Bank",
      account: "Business Current (0012)",
      balance: 145230.50,
      status: "CONNECTED",
      lastSync: "2 minutes ago",
    },
    {
      id: "2",
      bank: "First National Bank",
      account: "Business Savings (8892)",
      balance: 245000.00,
      status: "SYNCING",
      lastSync: "Just now",
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-bold tracking-tight">Bank Feeds</h2>
          <p className="text-muted-foreground">
            Connect your South African bank accounts for automated reconciliation.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button 
            className="bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 gap-2"
            onClick={startConnection}
            disabled={isConnecting}
          >
            {isConnecting ? <Zap className="h-4 w-4 animate-pulse text-amber-400" /> : <Plus className="h-4 w-4" />}
            {isConnecting ? "Connecting..." : "Connect Bank"}
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isConnecting && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-violet-600 text-white p-6 rounded-2xl shadow-xl flex items-center justify-between overflow-hidden relative"
          >
            <motion.div 
              className="absolute inset-0 bg-white/10"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            <div className="flex items-center gap-4 relative z-10">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold">
                  {step === 1 ? "Initializing Secure Handshake..." : "Authenticating with Stitch..."}
                </p>
                <p className="text-xs text-violet-200">Please wait while we establish a secure connection.</p>
              </div>
            </div>
            <div className="flex gap-2 relative z-10">
              <div className={`h-2 w-2 rounded-full bg-white ${step >= 1 ? "opacity-100" : "opacity-30"}`} />
              <div className={`h-2 w-2 rounded-full bg-white ${step >= 2 ? "opacity-100" : "opacity-30"}`} />
              <div className={`h-2 w-2 rounded-full bg-white animate-pulse opacity-30`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {connectedAccounts.map((account) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card className="h-full border-violet-100 shadow-sm group-hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg">{account.bank}</CardTitle>
                  <CardDescription className="text-xs">{account.account}</CardDescription>
                </div>
                <div className="h-10 w-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                  <Wallet className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Current Balance</p>
                  <p className="text-2xl font-bold">R {account.balance.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1.5">
                    <div className={`h-2 w-2 rounded-full ${account.status === "CONNECTED" ? "bg-emerald-500 animate-pulse" : "bg-blue-500 animate-spin"}`} />
                    <span className="text-xs font-medium">{account.status}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <History className="h-3 w-3" /> {account.lastSync}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -5 }}
          className="cursor-pointer"
          onClick={() => setIsConnecting(true)}
        >
          <Card className="h-full border-dashed border-violet-200 bg-violet-50/20 hover:bg-violet-50/40 transition-colors duration-300 flex flex-col items-center justify-center p-8 text-center gap-4">
            <div className="h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
              <Plus className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold text-violet-900">Add New Feed</p>
              <p className="text-xs text-violet-600/70">Securely link another account</p>
            </div>
          </Card>
        </motion.div>
      </div>

      <Card className="mt-6 bg-linear-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck className="h-48 w-48" />
        </div>
        <CardContent className="p-8 relative z-10">
          <div className="max-w-2xl space-y-4">
            <Badge className="bg-violet-500 hover:bg-violet-600 text-white border-none">Secure Integration</Badge>
            <h3 className="text-2xl font-bold">Bank-grade security via Stitch & Akahu</h3>
            <p className="text-slate-300 leading-relaxed">
              Vivid Accounting never stores your bank credentials. We use South Africa's leading financial APIs 
              to provide real-time transaction syncing with end-to-end encryption and SARS-compliant audit trails.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-violet-400" />
                <span className="text-sm font-medium">Auto-Reconciliation</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-violet-400" />
                <span className="text-sm font-medium">Read-only Access</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-violet-400" />
                <span className="text-sm font-medium">Daily Syncs</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
