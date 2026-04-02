"use client";

import { useEffect, useState } from "react";
// import { getMyMeals } from "@/app/services/meal.service";
import MealCard from "@/app/modules/meals/MealCard";
import { getMeals } from "@/services/meal.service";

export default function ProviderMealsPage() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getMeals().then();
  }, []);

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      {meals.map((meal: any) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  );
}