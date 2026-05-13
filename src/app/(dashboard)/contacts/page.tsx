"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Mail, Phone, MapPin, MoreVertical, UserPlus, Users, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const mockContacts = [
  {
    id: "1",
    name: "Mandondo Consulting",
    type: "CUSTOMER",
    email: "info@mandondo.co.za",
    phone: "+27 11 456 7890",
    address: "Sandton, Johannesburg",
    initials: "MC",
    color: "bg-violet-100 text-violet-700",
  },
  {
    id: "2",
    name: "SignalDesk Africa",
    type: "CUSTOMER",
    email: "hello@signaldesk.africa",
    phone: "+27 21 789 1234",
    address: "Cape Town, WC",
    initials: "SA",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "3",
    name: "Vodacom South Africa",
    type: "SUPPLIER",
    email: "accounts@vodacom.co.za",
    phone: "082 123 4567",
    address: "Midrand, Gauteng",
    initials: "V",
    color: "bg-rose-100 text-rose-700",
  },
  {
    id: "4",
    name: "Office World",
    type: "SUPPLIER",
    email: "sales@officeworld.co.za",
    phone: "011 234 5678",
    address: "Randburg, GP",
    initials: "OW",
    color: "bg-amber-100 text-amber-700",
  },
];

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

export default function ContactsPage() {
  const [activeTab, setActiveTab] = useState<"ALL" | "CUSTOMER" | "SUPPLIER">("ALL");

  const filteredContacts = mockContacts.filter(c => 
    activeTab === "ALL" ? true : c.type === activeTab
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-bold tracking-tight">Contacts</h2>
          <p className="text-muted-foreground">
            Manage your customers, suppliers and partners.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Button className="bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 gap-2">
            <UserPlus className="h-4 w-4" /> Add Contact
          </Button>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
          <Button 
            variant={activeTab === "ALL" ? "secondary" : "ghost"} 
            size="sm"
            onClick={() => setActiveTab("ALL")}
            className="rounded-md"
          >
            All
          </Button>
          <Button 
            variant={activeTab === "CUSTOMER" ? "secondary" : "ghost"} 
            size="sm"
            onClick={() => setActiveTab("CUSTOMER")}
            className="rounded-md"
          >
            Customers
          </Button>
          <Button 
            variant={activeTab === "SUPPLIER" ? "secondary" : "ghost"} 
            size="sm"
            onClick={() => setActiveTab("SUPPLIER")}
            className="rounded-md"
          >
            Suppliers
          </Button>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search contacts..." className="pl-9" />
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredContacts.map((contact) => (
          <motion.div variants={item} key={contact.id}>
            <Card className="hover:shadow-md transition-all duration-300 group overflow-hidden border-violet-100/50">
              <CardHeader className="pb-3 relative">
                <div className="flex justify-between items-start">
                  <div className={`h-12 w-12 rounded-xl ${contact.color} flex items-center justify-center font-bold text-lg shadow-sm`}>
                    {contact.initials}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                      <DropdownMenuItem>View Invoices</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-3">
                  <CardTitle className="text-lg group-hover:text-violet-600 transition-colors">{contact.name}</CardTitle>
                  <Badge variant="outline" className={`mt-1 font-medium ${contact.type === "CUSTOMER" ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-rose-50 text-rose-600 border-rose-100"}`}>
                    {contact.type === "CUSTOMER" ? <Users className="h-3 w-3 mr-1" /> : <Building2 className="h-3 w-3 mr-1" />}
                    {contact.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center text-muted-foreground gap-3">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{contact.email}</span>
                </div>
                <div className="flex items-center text-muted-foreground gap-3">
                  <Phone className="h-4 w-4" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center text-muted-foreground gap-3 pt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{contact.address}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
