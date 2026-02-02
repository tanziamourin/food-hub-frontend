// src/app/modules/meals/MealCard.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MealCard({ meal }: { meal: any }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
  
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg">{meal.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{meal.description}</p>
        <div className="flex justify-between items-center pt-2">
          <span className="font-bold text-orange-600">${meal.price}</span>
          <Link href={`/meals/${meal._id || meal.id}`}>
            <Button size="sm" variant="outline">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}