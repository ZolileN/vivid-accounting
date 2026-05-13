import { Bell, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card/80 backdrop-blur-sm px-6">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile menu button (sidebar is hidden on mobile) */}
        <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>

        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search invoices, contacts, or transactions..."
            className="w-full bg-muted/40 pl-9 md:w-[300px] lg:w-[400px] border-transparent focus:border-violet-300 focus:bg-background transition-all duration-200 rounded-lg"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          {/* Notification dot */}
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full bg-linear-to-br from-violet-500/10 to-indigo-500/10 hover:from-violet-500/20 hover:to-indigo-500/20">
          <User className="h-5 w-5 text-violet-600" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  );
}
