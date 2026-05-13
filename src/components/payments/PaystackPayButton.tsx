"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PaystackButtonProps {
  invoiceId: string;
  amount: number; // in ZAR (e.g. 1500.00)
  email: string;
}

/**
 * Paystack "Pay Now" button — initializes a payment session via
 * Paystack Inline JS and handles the redirect flow.
 */
export function PaystackPayButton({ invoiceId, amount, email }: PaystackButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);

    try {
      // Initialize transaction via our API route
      const res = await fetch("/api/payments/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId,
          amount: Math.round(amount * 100), // Paystack expects amount in kobo (cents)
          email,
        }),
      });

      const data = await res.json();

      if (data.authorization_url) {
        // Redirect to Paystack hosted checkout
        window.location.href = data.authorization_url;
      } else if (data.error) {
        console.error("Paystack init error:", data.error);
        alert("Payment initialization failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Button
      onClick={handlePay}
      disabled={loading}
      className="flex-1 sm:flex-none bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-none gap-2 shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-violet-500/40 hover:scale-[1.02] overflow-hidden min-w-[120px]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.div
            key="loading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing...</span>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            <span>Pay Now</span>
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
