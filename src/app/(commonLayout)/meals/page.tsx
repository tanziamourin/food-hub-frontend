// src/app/(commonLayout)/meals/page.tsximport MealCard from "@/app/modules/meals/MealCard";
import { getMeals } from "@/app/services/meal.service";

export default async function MealsPage() {
  const meals = await getMeals();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Explore Delicious Meals 🍱</h1>
 
      {meals && meals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal: any) => (
            <MealCard key={meal._id || meal.id} meal={meal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No meals found at the moment.</p>
        </div>
      )}
    </div>
  );
}