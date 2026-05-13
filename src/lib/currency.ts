/**
 * Format helpers for South African Rand (ZAR) currency display.
 */

const zarFormatter = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  minimumFractionDigits: 2,
});

/**
 * Format a number as ZAR currency, e.g. R 15 000.00
 */
export function formatZAR(amount: number): string {
  return zarFormatter.format(amount);
}

/**
 * Calculate 15% SARS VAT
 */
export function calculateVAT(subtotal: number): number {
  return subtotal * 0.15;
}
