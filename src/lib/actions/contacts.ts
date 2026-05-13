"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type CreateContactInput = {
  name: string;
  email?: string;
  phone?: string;
  type: "CUSTOMER" | "SUPPLIER";
  businessId?: string;
};

export async function createContact(data: CreateContactInput) {
  try {
    let businessId = data.businessId;

    // Fallback to the first business if not provided (for MVP simplicity)
    if (!businessId) {
      const business = await prisma.business.findFirst();
      if (!business) {
        return { success: false, error: "No active business found." };
      }
      businessId = business.id;
    }

    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        type: data.type,
        businessId: businessId,
      },
    });

    revalidatePath("/contacts");
    return { success: true, contactId: contact.id };
  } catch (error) {
    console.error("Failed to create contact:", error);
    return { success: false, error: "Database error" };
  }
}

export async function getContacts() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: contacts };
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return { success: false, error: "Database error" };
  }
}
