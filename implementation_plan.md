# Vivid Accounting Implementation Plan

Vivid Accounting is a "WhatsApp-first" accounting platform specifically designed for South African SMMEs. It simplifies invoicing, payments, and financial tracking for small business owners who prefer mobile-first workflows.

## Current Project Status
The project is currently in the late stages of **Phase 2 (MVP Finalization)**. Core invoicing and payment features are functional, with high-fidelity UI implemented across the dashboard and public views.

---

## Completed Features [Phase 1 & 2]

### Core Infrastructure
- [x] **Next.js 16 (App Router)**: Modern, high-performance foundation.
- [x] **Prisma ORM & PostgreSQL**: Robust data modeling for businesses, contacts, invoices, and transactions.
- [x] **Tailwind CSS 4 + Shadcn UI**: Premium, responsive design system.
- [x] **Framer Motion**: Smooth micro-animations and transitions.

### Invoicing & Payments
- [x] **Dynamic Invoice Creation**: Support for multiple line items, SARS-compliant VAT (15%), and due dates.
- [x] **Public Invoice View**: Professional, client-facing invoice pages with two distinct templates:
  - **Modern**: Sleek, digital-first design with gradients.
  - **Classic**: Print-friendly, traditional layout.
- [x] **Paystack Integration**: Native "Pay Now" functionality for instant ZAR payments.
- [ ] **Ozow Integration**: Instant EFT payment support (Keys configured, implementation pending).
- [x] **WhatsApp Sharing**: One-click generation of WhatsApp deep links for sending invoices to clients.
- [x] **Bank Details Configuration**: Customizable bank account info displayed on invoices.

### Management & Analytics
- [x] **Contact Management**: CRM-lite features for managing customers and suppliers.
- [x] **Dashboard Overview**: Financial analytics using Recharts (Revenue, Outstanding, etc.).
- [x] **Settings Module**: Comprehensive business profile and preference management.

---

## Pending Features [Phase 3 & Beyond]

### 1. Payment Gateway Expansion
- [ ] **Ozow Integration**: Implement Instant EFT payment flow using the Ozow API.
- [ ] **Manual EFT Verification**: Add a workflow for clients to upload proof of payment for manual reconciliation.

### 2. Authentication & Security
- [ ] **Auth Integration**: Implement Supabase Auth or NextAuth.js for secure user sessions.
- [ ] **Multi-Business Support**: Allow users to manage multiple companies from one account.
- [ ] **Role-Based Access Control (RBAC)**: Manage permissions for team members/accountants.

### 2. Financial Automation
- [ ] **Bank Feed Integration**: Connect to SA banks via Stitch or Akahu for real-time transaction reconciliation.
- [ ] **CSV Import**: Support for manual bank statement uploads.
- [ ] **Automated Expense Categorization**: AI-driven labeling of business expenses.

### 3. Compliance & Reporting
- [ ] **SARS VAT Reports**: Generate ready-to-file VAT201 summaries.
- [ ] **Financial Statements**: Automated Balance Sheet and P&L generation.
- [ ] **Tax Season Preparation**: Exporting data for annual tax returns.

### 4. Advanced Invoicing
- [ ] **Server-Side PDF Generation**: Generate high-quality PDFs using React-PDF or Puppeteer.
- [ ] **Recurring Invoices**: Set up automated monthly billing for retainers.
- [ ] **Inventory Management**: Track stock levels and link to invoices.

---

## Verification Plan

### Automated Testing
- [ ] Implement unit tests for VAT calculation logic in `src/lib/currency.ts`.
- [ ] Add E2E tests for the "Create Invoice -> Pay with Paystack" flow.

### Manual Verification
- [ ] Verify WhatsApp sharing links on physical mobile devices.
- [ ] Test invoice rendering across different screen sizes and browsers.
- [ ] Cross-reference VAT calculations with manual SARS-compliant math.
