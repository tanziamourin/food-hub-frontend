"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/provider/AuthProvider";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Hide navbar on dashboard routes
  if (pathname.startsWith("/dashboard")) return null;
  if (loading) return null;

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          FoodHub 🍱
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/meals" className="hover:text-primary transition">
            Meals
          </Link>

          {!user && (
            <>
              <Link href="/providers">Providers</Link>
              <Link href="/login">Login</Link>
              <Link
                href="/register"
                className="px-3 py-1 rounded-md bg-primary text-primary-foreground"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <button
                onClick={logout}
                className="hover:text-red-500 transition"
              >
                Logout
              </button>
            </>
          )}

          <ModeToggle />
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-background px-4 pb-4 space-y-3">
          <Link
            href="/meals"
            onClick={() => setOpen(false)}
            className="block"
          >
            Meals
          </Link>

          {!user && (
            <>
              <Link
                href="/providers"
                onClick={() => setOpen(false)}
                className="block"
              >
                Providers
              </Link>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="block font-medium text-primary"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="block"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="block text-left text-red-500"
              >
                Logout
              </button>
            </>
          )}

          <div className="pt-2">
            <ModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
