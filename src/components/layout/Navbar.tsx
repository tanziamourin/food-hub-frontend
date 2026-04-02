"use client";


import { useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/provider/AuthProvider";
import { usePathname } from "next/navigation";
import { useCart } from "@/provider/CartProvider";
import Link from "next/link";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const { cart } = useCart(); 
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Hide navbar on dashboard routes
  if (pathname.startsWith("/dashboard")) return null;
  if (loading) return null;

  const isCustomer = user?.role === "CUSTOMER";

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          FoodHub 🍱
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          <Link href="/meals" className="hover:text-primary">
            Meals
          </Link>

          <Link href="/providers">
            Providers
          </Link>

          {/* NOT logged in */}
          {!user && (
            <>
              <Link href="/login">Login</Link>
              <Link
                href="/register"
                className="px-3 py-1 rounded-md bg-primary text-primary-foreground"
              >
                Register
              </Link>
            </>
          )}

          {/* Logged in */}
          {user && (
            <>
              <Link href="/dashboard">Dashboard</Link>

              {/* ✅ Customer only */}
              {isCustomer && (
                <>
                  <Link href="/cart" className="relative">
                    <ShoppingCart className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />

                    {/* ✅ SAFE LENGTH */}
                    {(cart?.length || 0) > 0 && (
                      <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
                        {cart?.length || 0}
                      </span>
                    )}
                  </Link>

                  <Link href="/checkout">Checkout</Link>
                </>
              )}

              <button
                onClick={logout}
                className="hover:text-red-500"
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
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t px-4 pb-4 space-y-3">

          <Link href="/meals" onClick={() => setOpen(false)}>
            Meals
          </Link>

          {!user && (
            <>
              <Link href="/providers" onClick={() => setOpen(false)}>
                Providers
              </Link>
              <Link href="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link href="/register" onClick={() => setOpen(false)}>
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>

              {/* ✅ Customer only */}
              {isCustomer && (
                <>
                  <Link href="/cart" onClick={() => setOpen(false)}>
                    Cart
                    {(cart?.length || 0) > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-2 rounded-full">
                        {cart?.length || 0}
                      </span>
                    )}
                  </Link>

                  <Link href="/checkout" onClick={() => setOpen(false)}>
                    Checkout
                  </Link>
                </>
              )}

              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="text-red-500"
              >
                Logout
              </button>
            </>
          )}

          <ModeToggle />
        </div>
      )}
    </nav>
  );
}