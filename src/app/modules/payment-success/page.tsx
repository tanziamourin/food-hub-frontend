"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-10 rounded-3xl bg-white/5 border border-white/10 text-center space-y-6"
      >
        <CheckCircle2 className="mx-auto text-green-400 size-16" />

        <h1 className="text-2xl font-bold text-white">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-400 text-sm">
          Your order has been confirmed and is being processed.
        </p>

        <Link
          href="/orders"
          className="inline-block mt-4 px-6 py-2 bg-primary rounded-xl text-white font-bold"
        >
          View Orders
        </Link>
      </motion.div>
    </div>
  );
}