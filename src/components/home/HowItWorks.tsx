"use client";

import { motion } from "framer-motion";

const steps = [
  {
    icon: "🍽️",
    title: "Choose Meal",
    desc: "Browse meals from top providers",
  },
  {
    icon: "🛒",
    title: "Place Order",
    desc: "Add to cart & checkout easily",
  },
  {
    icon: "🚚",
    title: "Track Delivery",
    desc: "Get food delivered fast",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-14"
        >
          ⚡ How FoodHub Works
        </motion.h2>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-10 text-center">

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: index * 0.2 }}
              className="relative p-8 rounded-2xl shadow-lg bg-gradient-to-br from-orange-50 to-white hover:shadow-2xl transition"
            >
              {/* Step number */}
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="text-5xl mb-4">{step.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm">
                {step.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}