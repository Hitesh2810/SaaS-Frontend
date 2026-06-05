"use client";

export function initials(user) {
  const source = `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || user?.username || user?.email || "U";
  return source.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}
