import { BarChart3, Bell, Building2, CreditCard, LayoutDashboard, Settings, ShieldCheck, Users } from "lucide-react";

export const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Tenants", href: "/tenants", icon: Building2 },
  { label: "Users", href: "/users", icon: Users },
  { label: "Subscriptions", href: "/subscriptions", icon: ShieldCheck },
  { label: "Payments", href: "/payments", icon: CreditCard },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings }
];
