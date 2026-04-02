"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function MealCard({ meal }: { meal: any }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white/5 backdrop-blur"
    >
      {/* Image */}
      <Link href={`/meals/${meal._id || meal.id}`}>
        <div className="h-40 bg-gray-200 overflow-hidden">
          <img
            src={meal.image || "/placeholder.png"}
            alt={meal.name}
            className="w-full h-full object-cover hover:scale-110 transition"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg line-clamp-1">{meal.name}</h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {meal.description}
        </p>

        <div className="flex justify-between items-center pt-2">
          <span className="font-bold text-orange-600">
            ${meal.price}
          </span>

          <Link href={`/meals/${meal._id || meal.id}`}>
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}