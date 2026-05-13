"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, User, CreditCard, Bell, Shield, Save, Upload, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your business profile, team, and integrations.
        </p>
      </motion.div>

      <Tabs defaultValue="business" className="w-full">
        <TabsList className="bg-muted/50 p-1 rounded-xl mb-6">
          <TabsTrigger value="business" className="gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Building2 className="h-4 w-4" /> Business
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <CreditCard className="h-4 w-4" /> Subscription
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="business" className="mt-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid gap-6"
            >
              <Card className="border-violet-100/50 shadow-sm">
                <CardHeader>
                  <CardTitle>Business Profile</CardTitle>
                  <CardDescription>This information will appear on your invoices.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b">
                    <div className="h-20 w-20 rounded-2xl bg-linear-to-br from-violet-100 to-indigo-100 flex items-center justify-center text-violet-600 border border-violet-200 shadow-sm relative group overflow-hidden">
                      <span className="text-2xl font-bold">V</span>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm">Business Logo</h4>
                      <p className="text-xs text-muted-foreground">JPG, PNG or SVG. Max size 2MB.</p>
                      <Button variant="outline" size="sm" className="mt-2 h-7 px-3 text-xs">Change Logo</Button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="biz-name">Legal Business Name</Label>
                      <Input id="biz-name" defaultValue="Vivid Accounting (Pty) Ltd" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="biz-reg">Registration Number</Label>
                      <Input id="biz-reg" defaultValue="2024/123456/07" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="biz-vat">VAT Number</Label>
                      <Input id="biz-vat" placeholder="4010123456" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="biz-email">Business Email</Label>
                      <Input id="biz-email" defaultValue="accounts@vivid.co.za" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="biz-addr">Physical Address</Label>
                    <Input id="biz-addr" defaultValue="123 Sandton Drive, Sandton, 2196" />
                  </div>

                  <div className="pt-6 border-t mt-6">
                    <h4 className="font-semibold text-lg mb-4">Bank Account Details</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="bank-name">Bank Name</Label>
                        <Input id="bank-name" defaultValue="Nedbank" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-holder">Account Holder</Label>
                        <Input id="account-holder" defaultValue="ZOLILE NONZAPA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-type">Account Type</Label>
                        <Input id="account-type" defaultValue="Current Account" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="branch-code">Branch Code</Label>
                        <Input id="branch-code" defaultValue="198765" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-number">Account Number</Label>
                        <Input id="account-number" defaultValue="1304521303" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="swift-bic">SWIFT / BIC</Label>
                        <Input id="swift-bic" defaultValue="NEDSZAJJ" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-violet-100/50 shadow-sm">
                <CardHeader>
                  <CardTitle>Invoicing Preferences</CardTitle>
                  <CardDescription>Customize how your invoices look and behave.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b pb-4">
                    <div className="space-y-0.5">
                      <Label className="text-base">Invoice Template</Label>
                      <p className="text-sm text-muted-foreground">Choose the design layout for your public invoices and PDFs.</p>
                    </div>
                    <Select defaultValue="classic">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern (Default)</SelectItem>
                        <SelectItem value="classic">Classic (Print Friendly)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Automatic SARS VAT</Label>
                      <p className="text-sm text-muted-foreground">Automatically apply 15% VAT to all new invoices.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">WhatsApp Deep Links</Label>
                      <p className="text-sm text-muted-foreground">Generate WhatsApp sharing links for every invoice.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-3">
                <Button variant="ghost">Cancel</Button>
                <Button 
                  className="bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 gap-2"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? <Sparkles className="h-4 w-4 animate-pulse" /> : <Save className="h-4 w-4" />}
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
