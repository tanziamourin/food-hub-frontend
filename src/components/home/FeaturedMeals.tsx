"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Meal = {
  id: string;
  name: string;
  provider: string;
  price: number;
  rating: number;
  time: string;
  image: string;
};

export default function FeaturedMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch("https://your-api.com/meals"); // 🔁 তোমার API URL বসাও
        const data = await res.json();

        setMeals(data || []); // ✅ fallback
      } catch (error) {
        console.error("Failed to fetch meals", error);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16">
        ⏳ Loading meals...
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">

        <h2 className="text-3xl font-bold mb-8">
          🍽️ Popular Meals Near You
        </h2>

        {/* Empty state */}
        {meals.length === 0 && (
          <p className="text-center text-gray-500">
            No meals found 😢
          </p>
        )}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {meals?.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={meal.image || "/meal.jpg"}
                  alt={meal.name}
                  className="h-44 w-full object-cover"
                />

                <div className="absolute top-3 left-3 bg-white text-xs px-2 py-1 rounded shadow">
                  ⭐ {meal.rating || 4.5}
                </div>

                <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded shadow">
                  {meal.time || "20 min"}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg">{meal.name}</h3>
                <p className="text-sm text-gray-500">{meal.provider}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-lg text-orange-500">
                    ৳{meal.price}
                  </span>

                  <button className="text-sm bg-black text-white px-4 py-1.5 rounded-lg hover:bg-orange-500 transition">
                    View
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}