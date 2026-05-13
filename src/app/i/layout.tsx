import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoice | Vivid Accounting",
  description: "View and pay your invoice securely online.",
};

/**
 * Separate layout for the public-facing invoice route (/i/[id]).
 * This removes the sidebar and header so clients see a clean, focused invoice page.
 */
export default function PublicInvoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {children}
    </div>
  );
}
