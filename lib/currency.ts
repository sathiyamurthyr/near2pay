/**
 * Utility for formatting currency in Indian Rupees (INR)
 * Adheres strictly to the en-IN locale format (e.g., ₹1,82,500, ₹26,000, ₹48,75,000)
 */

export const formatINR = (
  amount: number,
  options?: {
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
  }
): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: options?.maximumFractionDigits ?? 0,
    minimumFractionDigits: options?.minimumFractionDigits ?? 0,
  }).format(amount);
};

export const CURRENCY_CODE = "INR";
export const CURRENCY_SYMBOL = "₹";
