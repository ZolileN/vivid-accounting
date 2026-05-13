# // vivid accounting

Vivid Accounting is a premium, **WhatsApp-first** accounting platform designed specifically for South African SMMEs. It streamlines the invoicing and payment process, allowing business owners to manage their finances directly from their mobile workflow.

![Vivid Accounting Banner](https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000)

## 🚀 Key Features

-   **WhatsApp Integration**: Share professional invoice links directly via WhatsApp with one click.
-   **SARS Compliant**: Automatic 15% VAT calculation and formatted invoicing that meets SA regulatory standards.
-   **Paystack Payments**: Integrated "Pay Now" functionality for instant ZAR payments via card, EFT, or QR.
-   **Dynamic Templates**: Choose between **Modern** (digital-first) and **Classic** (print-friendly) invoice designs.
-   **Financial Dashboard**: Real-time analytics on revenue, outstanding payments, and business health.
-   **Contact Management**: Simple CRM to manage customers and suppliers.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org) (App Router)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com) + [Shadcn UI](https://ui.shadcn.com)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Database**: [Prisma ORM](https://www.prisma.io) with PostgreSQL
-   **Charts**: [Recharts](https://recharts.org)
-   **Payments**: [Paystack](https://paystack.com)

## 🚦 Project Status

We are currently in **Phase 2 (MVP Finalization)**. 

### What's Complete:
-   [x] Core Invoicing Engine
-   [x] Paystack Payment Integration
-   [x] WhatsApp Sharing Logic
-   [x] Multi-template Rendering
-   [x] Business Settings & Bank Config

### Upcoming:
-   [ ] Ozow Instant EFT Integration
-   [ ] Authentication (Supabase/NextAuth)
-   [ ] Real-time Bank Feeds (Stitch)
-   [ ] Expense Tracking & Categorization
-   [ ] SARS VAT201 Reporting

For a detailed breakdown of the development roadmap, see our [Implementation Plan](./implementation_plan.md).

## 🛠️ Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deployment

### Deploying to Vercel

1.  **Environment Variables**: Copy `.env.example` to your Vercel project settings and fill in the values.
2.  **Database**: Ensure your PostgreSQL database (e.g., Supabase) is accessible and migrations are run.
3.  **Build Command**: Vercel will automatically detect Next.js. The build script `npm run build` is already configured to run `prisma generate`.

To run migrations in production:
```bash
npx prisma migrate deploy
```

## 📄 License

Internal use only for SignalDesk Africa.

