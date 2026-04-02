"use client";

import { useState } from "react";

export default function MealFiltersPanel({
  filters,
  onFilterChange,
}: {
  filters: any;
  onFilterChange: (filters: any) => void;
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (key: string, value: any) => {
    const updated = { ...localFilters, [key]: value };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="w-64 p-4 border rounded-xl space-y-4">
      <h2 className="text-lg font-semibold">Filters</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search meal..."
        className="w-full border p-2 rounded"
        onChange={(e) => handleChange("searchTerm", e.target.value)}
      />

      {/* Category */}
      <select
        className="w-full border p-2 rounded"
        onChange={(e) => handleChange("category", e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>

      {/* Price */}
      <input
        type="number"
        placeholder="Max price"
        className="w-full border p-2 rounded"
        onChange={(e) => handleChange("maxPrice", e.target.value)}
      />

      {/* Reset Button */}
      <button
        onClick={() => {
          const reset = { page: 1, limit: 12 };
          setLocalFilters(reset);
          onFilterChange(reset);
        }}
        className="w-full bg-red-500 text-white p-2 rounded"
      >
        Reset Filters
      </button>
    </div>
  );
}