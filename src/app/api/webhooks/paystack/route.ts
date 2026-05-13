import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(JSON.stringify(body))
      .digest("hex");

    if (hash !== req.headers.get("x-paystack-signature")) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = body.event;

    if (event === "charge.success") {
      const { reference, metadata } = body.data;
      const invoiceId = metadata?.invoice_id;

      if (invoiceId) {
        await prisma.invoice.update({
          where: { invoiceNum: invoiceId }, // Assuming we use invoiceNum or id
          data: { status: "PAID" },
        });
        
        console.log(`Invoice ${invoiceId} marked as PAID via webhook.`);
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
