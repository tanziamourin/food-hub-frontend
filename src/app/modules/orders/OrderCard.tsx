"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function OrderCard({ order }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl transition-all"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-white">
          Order #{order.id.slice(0, 6)}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded-full font-bold ${
            order.status === "DELIVERED"
              ? "bg-green-500/20 text-green-400"
              : order.status === "CANCELLED"
              ? "bg-red-500/20 text-red-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {order.status}
        </span>
      </div>

      <p className="text-xs text-gray-400 mb-2">
        📍 {order.deliveryAddress}
      </p>

      <div className="space-y-1 text-xs text-gray-300">
        {order.items.slice(0, 2).map((item: any) => (
          <p key={item.id}>
            {item.meal.name} × {item.quantity}
          </p>
        ))}
        {order.items.length > 2 && (
          <p className="text-gray-500">
            +{order.items.length - 2} more items
          </p>
        )}
      </div>

      <Link
        href={`/orders/${order.id}`}
        className="inline-block mt-4 text-xs text-primary font-bold hover:underline"
      >
        View Details →
      </Link>
    </motion.div>
  );
}