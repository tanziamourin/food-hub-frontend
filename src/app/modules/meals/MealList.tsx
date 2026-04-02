"use client";

import MealCard from "./MealCard";

export default function MealGrid({
  meals,
  loading,
}: {
  meals: any[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-60 bg-gray-200 animate-pulse rounded-xl"
          />
        ))}
      </div>
    );
  }

  if (!meals || meals.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No meals found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <MealCard key={meal._id || meal.id} meal={meal} />
      ))}
    </div>
  );
}