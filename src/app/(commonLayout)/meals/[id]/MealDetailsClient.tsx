"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Store, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/provider/CartProvider";
// import { useCart } from "@/providers/CartProvider";

export default function MealDetailsClient({ meal }: { meal: any }) {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <Link
          href="/meals"
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to Meals
        </Link>

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-[400px] rounded-3xl overflow-hidden"
          >
            <Image
              src={meal.image || "/placeholder.png"}
              alt={meal.title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-black">{meal.title}</h1>

            <p className="text-gray-400">{meal.description}</p>

            <div className="text-3xl font-bold text-primary">
              ৳ {meal.price}
            </div>

            <div className="flex items-center gap-3">
              <Tag className="size-4 text-primary" />
              <span className="text-sm text-gray-400">
                {meal.category?.name || "General"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Store className="size-4 text-primary" />
              <span className="text-sm text-gray-400">
                {meal.provider?.shopName}
              </span>
            </div>

            {/* ✅ FIXED BUTTON */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => addToCart(meal)}
                className="bg-primary text-white px-6 py-2 rounded-md flex items-center gap-2"
              >
                <ShoppingCart className="size-4" />
                Add to Cart
              </button>

              <Button variant="outline">
                Contact Provider
              </Button>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}