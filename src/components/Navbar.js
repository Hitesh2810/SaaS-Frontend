"use client";

import { Bell, LogOut, Menu, Moon, Search, Sun, UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/Dropdown";

export default function Navbar({ onMenuClick }) {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 -mx-4 mb-6 border-b bg-background/60 px-4 py-3 backdrop-blur-xl md:-mx-8 md:px-8">
      <div className="flex items-center gap-3">
        <Button className="lg:hidden" size="icon" variant="ghost" onClick={onMenuClick}><Menu className="h-5 w-5" /></Button>
        <div className="relative hidden w-full max-w-md md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search tenants, users, invoices..." />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost"><Bell className="h-5 w-5" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="px-3 py-2 text-sm font-medium">Notifications</div>
              <DropdownMenuItem>New payment received</DropdownMenuItem>
              <DropdownMenuItem>Tenant usage spike</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="icon" variant="ghost" onClick={toggleTheme}>{theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="max-w-44 justify-start">
                <UserCircle className="h-5 w-5" />
                <span className="hidden truncate sm:inline">{user?.name || user?.email || "Admin"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>{user?.email || "Signed in"}</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}><LogOut className="h-4 w-4" /> Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
