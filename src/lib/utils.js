import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn() {
  return twMerge(clsx(...arguments));
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value || 0));
}

export function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(Number(value || 0));
}

export function normalizeList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}
