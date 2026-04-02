import MealCard from "@/app/modules/meals/MealCard";
import { getMeals } from "@/services/meal.service";

export default async function ProviderMenuPage() {
  const meals = await getMeals();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Meals</h1>

      <div className="grid grid-cols-3 gap-4">
        {meals.map((meal: any) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}