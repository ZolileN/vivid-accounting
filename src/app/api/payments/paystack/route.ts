import { NextRequest } from "next/server";

/**
 * POST /api/payments/paystack
 * Initializes a Paystack transaction and returns the authorization URL.
 *
 * Body: { invoiceId: string, amount: number (in kobo/cents), email: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { invoiceId, amount, email } = body;

    if (!invoiceId || !amount || !email) {
      return Response.json(
        { error: "Missing required fields: invoiceId, amount, email" },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return Response.json(
        { error: "Paystack is not configured" },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://vivid-accounting.vercel.app";

    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount, // already in kobo (cents)
        currency: "ZAR",
        reference: `vivid-${invoiceId}-${Date.now()}`,
        callback_url: `${baseUrl}/i/${invoiceId}?payment=success`,
        metadata: {
          invoice_id: invoiceId,
          custom_fields: [
            {
              display_name: "Invoice",
              variable_name: "invoice_id",
              value: invoiceId,
            },
          ],
        },
      }),
    });

    const paystackData = await paystackRes.json();

    if (paystackData.status) {
      return Response.json({
        authorization_url: paystackData.data.authorization_url,
        access_code: paystackData.data.access_code,
        reference: paystackData.data.reference,
      });
    } else {
      return Response.json(
        { error: paystackData.message || "Failed to initialize payment" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Paystack initialization error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
