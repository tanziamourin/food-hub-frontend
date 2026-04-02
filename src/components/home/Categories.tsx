"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const categories = [
  { name: "Pizza", icon: "🍕" },
  { name: "Burger", icon: "🍔" },
  { name: "Healthy", icon: "🥗" },
  { name: "Asian", icon: "🍜" },
];

export default function Categories() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="container mx-auto px-4 py-16">

      <h2 className="text-3xl font-bold mb-10 text-center">
        🍽️ Browse by Cuisine
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => setActive(cat.name)}
            className={`
              relative cursor-pointer rounded-2xl p-6 flex flex-col items-center justify-center 
              transition-all duration-300 border
              ${
                active === cat.name
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl scale-105"
                  : "bg-white dark:bg-gray-900 hover:shadow-lg"
              }
            `}
          >

            {/* Icon */}
            <span className="text-5xl mb-2">{cat.icon}</span>

            {/* Name */}
            <p className="font-semibold">{cat.name}</p>

            {/* Active indicator */}
            {active === cat.name && (
              <span className="absolute -bottom-2 w-10 h-1 bg-white rounded-full"></span>
            )}

          </motion.div>
        ))}
      </div>
    </section>
  );
}