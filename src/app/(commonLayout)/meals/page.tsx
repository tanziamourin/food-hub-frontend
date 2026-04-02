"use client";

import { useEffect, useState, useCallback } from "react";
import { mealService } from "@/services/meal.service";
import MealFiltersPanel from "./MealFiltersPanel";
import MealGrid from "@/app/modules/meals/MealList";

export default function MealsPage() {
  const [meals, setMeals] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    search: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await mealService.getMeals(filters);

      setMeals(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  // 🔥 Skeleton Card
  const SkeletonCard = () => (
    <div className="border rounded-lg p-4 animate-pulse">
      <div className="h-40 bg-gray-300 rounded mb-3"></div>

      <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>

      <div className="mt-4 h-9 bg-gray-300 rounded"></div>
    </div>
  );

  return (
    <div className="flex gap-10">
      {/* Filters */}
      <MealFiltersPanel
        filters={filters}
        onFilterChange={(newFilters) =>
          setFilters((prev) => ({
            ...prev,
            ...newFilters,
            page: 1,
          }))
        }
      />

      {/* Grid */}
      <div className="flex-1">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <MealGrid meals={meals} loading={loading} />
        )}
      </div>
    </div>
  );
}