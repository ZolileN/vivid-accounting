"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, CreditCard, Settings, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Transactions", href: "/transactions", icon: CreditCard },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Bank Feeds", href: "/banking", icon: PiggyBank },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-card shadow-sm">
      {/* Brand */}
      <div className="flex h-16 items-center px-6 border-b gap-3">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-8 w-8 rounded-lg bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-500/25"
        >
          <span className="text-white font-bold text-sm">V</span>
        </motion.div>
        <h1 className="text-lg font-bold tracking-tight">
          <span className="bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Vivid</span>
          <span className="text-foreground ml-1">Accounting</span>
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-violet-700 dark:text-violet-400"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-lg bg-linear-to-r from-violet-500/10 to-indigo-500/10 border border-violet-200/50 dark:border-violet-800/50 shadow-sm"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className={cn("relative z-10 h-4 w-4 transition-colors", isActive && "text-violet-600 dark:text-violet-400")} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t p-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl bg-linear-to-br from-violet-500/5 to-indigo-500/10 p-4 border border-violet-200/30"
        >
          <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">Pro Tip</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Share invoices via WhatsApp for 3× faster payments.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
