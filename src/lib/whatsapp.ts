/**
 * WhatsApp Deep Link Utility
 * Generates wa.me links pre-filled with invoice details for easy sharing.
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://vivid-accounting.vercel.app";

export interface WhatsAppShareOptions {
  invoiceId: string;
  clientName: string;
  totalAmount: number;
  phoneNumber?: string; // Optional — if provided, opens chat with specific number
}

/**
 * Generates a WhatsApp deep link with a pre-filled message containing invoice details.
 * If a phone number is provided, opens the chat directly with that contact.
 */
export function generateWhatsAppLink({
  invoiceId,
  clientName,
  totalAmount,
  phoneNumber,
}: WhatsAppShareOptions): string {
  const invoiceUrl = `${BASE_URL}/i/${invoiceId}`;
  const formattedAmount = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  }).format(totalAmount);

  const message = `Hi ${clientName},

Here is your invoice *${invoiceId}* for *${formattedAmount}*.

You can view and pay it securely online here:
${invoiceUrl}

Thank you for your business!
— Sent via Vivid Accounting`;

  const encodedMessage = encodeURIComponent(message);

  if (phoneNumber) {
    // Strip spaces, dashes, and leading zeros for international format
    const cleanNumber = phoneNumber.replace(/[\s\-()]/g, "").replace(/^0/, "27");
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  }

  return `https://wa.me/?text=${encodedMessage}`;
}
