"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white">

      {/* Background Blur */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
            Hungry? <br />
            <span className="text-yellow-300">Order Instantly 🍔</span>
          </h1>

          <p className="text-lg opacity-90 mb-8 max-w-md">
            Find your favorite meals, add to cart instantly, and get it delivered fast.
          </p>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/30 shadow-lg mb-6">
            <input
              placeholder="Search meals..."
              className="flex-1 px-4 py-3 rounded-lg text-black outline-none"
            />
            <button className="px-6 py-3 bg-black rounded-lg font-semibold hover:scale-105 transition">
              Search
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <button className="bg-black px-5 py-3 rounded-lg font-semibold hover:scale-105 transition">
              Explore Meals
            </button>

            <button className="bg-white text-black px-5 py-3 rounded-lg font-semibold flex items-center gap-2 hover:scale-105 transition">
              <ShoppingCart size={18} />
              View Cart
            </button>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6"
        >

          {/* Main Image */}
          <div className="relative">
            <img
              src="/hero-food.png"
              alt="Food"
              className="rounded-3xl shadow-2xl max-w-md w-full hover:scale-105 transition duration-500"
            />

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-white text-black px-4 py-2 rounded-full shadow-lg text-sm font-semibold animate-bounce">
              🔥 Hot & Fresh
            </div>
          </div>

          {/* Quick Add Cards (Zomato style) */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">

            {[1, 2].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30 shadow-lg"
              >
                <img
                  src="/hero-food.png"
                  alt="food"
                  className="rounded-lg mb-2"
                />

                <h3 className="text-sm font-semibold">Burger</h3>

                <p className="text-xs opacity-80">$5.99</p>

                {/* Add to cart */}
                <button className="mt-2 w-full bg-black text-white text-xs py-2 rounded-md flex items-center justify-center gap-1 hover:bg-gray-900 transition">
                  <ShoppingCart size={14} />
                  Add
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}