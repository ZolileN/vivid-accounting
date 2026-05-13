"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type CreateInvoiceInput = {
  invoiceNum: string;
  clientName: string;
  clientEmail: string;
  issueDate: string;
  dueDate?: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
};

export async function createInvoice(data: CreateInvoiceInput) {
  try {
    // 1. Find or create a default business (for MVP simplicity)
    let business = await prisma.business.findFirst();
    
    if (!business) {
      // Find a user first
      let user = await prisma.user.findFirst();
      if (!user) {
        user = await prisma.user.create({
          data: {
            email: "demo@vivid.co.za",
            name: "Demo User",
          },
        });
      }
      
      business = await prisma.business.create({
        data: {
          name: "Vivid Accounting Demo",
          userId: user.id,
        },
      });
    }

    // 2. Find or create the contact
    let contact = await prisma.contact.findFirst({
      where: { email: data.clientEmail },
    });

    if (!contact) {
      contact = await prisma.contact.create({
        data: {
          name: data.clientName,
          email: data.clientEmail,
          businessId: business.id,
        },
      });
    }

    // 3. Calculate totals
    const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const taxTotal = subtotal * 0.15;
    const totalAmount = subtotal + taxTotal;

    // 4. Create the invoice
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNum: data.invoiceNum,
        issueDate: new Date(data.issueDate),
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        subtotal,
        taxTotal,
        totalAmount,
        businessId: business.id,
        contactId: contact.id,
        status: "SENT", // Default for generated invoices
        items: {
          create: data.items.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            taxRate: 15.0,
          })),
        },
      },
    });

    revalidatePath("/invoices");
    return { success: true, invoiceId: invoice.id };
  } catch (error) {
    console.error("Failed to create invoice:", error);
    return { success: false, error: "Database error" };
  }
}
