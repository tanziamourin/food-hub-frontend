"use client";

import { useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/provider/AuthProvider";
import { usePathname } from "next/navigation";
import { useCart } from "@/provider/CartProvider";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const { cart } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/dashboard")) return null;
  if (loading) return null;

  const isCustomer = user?.role === "CUSTOMER";

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`relative px-2 py-1 transition-all duration-300 hover:text-primary ${
        pathname === href ? "text-primary font-semibold" : ""
      }`}
    >
      {label}
      {pathname === href && (
        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-primary rounded-full"></span>
      )}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/40 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent"
        >
          🍱 FoodHub
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm">

          {navLink("/meals", "Meals")}
          {navLink("/providers", "Providers")}

          {!user && (
            <>
              <Link href="/login" className="hover:text-primary transition">
                Login
              </Link>

              <Link
                href="/register"
                className="px-3 py-1 rounded-full bg-primary text-white hover:scale-105 transition"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              {navLink("/dashboard", "Dashboard")}

              {isCustomer && (
                <>
                  <Link href="/cart" className="relative group">
                    <ShoppingCart className="size-5 group-hover:scale-110 transition" />

                    {(cart?.length || 0) > 0 && (
                      <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] px-1.5 rounded-full animate-pulse">
                        {cart?.length || 0}
                      </span>
                    )}
                  </Link>

                  {navLink("/checkout", "Checkout")}
                </>
              )}

              <button
                onClick={logout}
                className="text-sm px-3 py-1 rounded-md border hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          )}

          <ModeToggle />
        </div>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t px-4 pb-4 space-y-4 bg-white/90 dark:bg-black/80 backdrop-blur-md"
          >
            {navLink("/meals", "Meals")}
            {navLink("/providers", "Providers")}

            {!user && (
              <>
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
                {navLink("/dashboard", "Dashboard")}

                {isCustomer && (
                  <>
                    <Link href="/cart" onClick={() => setOpen(false)}>
                      Cart ({cart?.length || 0})
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}