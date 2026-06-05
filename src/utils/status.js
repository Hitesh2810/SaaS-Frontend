export function statusTone(status) {
  if (["ACTIVE", "PAID", "READ"].includes(status)) return "green";
  if (["FAILED", "SUSPENDED", "INACTIVE"].includes(status)) return "red";
  if (["PENDING", "TRIAL"].includes(status)) return "amber";
  return "neutral";
}
