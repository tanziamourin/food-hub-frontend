"use client";

import { useState, useEffect } from "react";

export default function MealFilters({
  filters,
  onFilterChange,
}: {
  filters: any;
  onFilterChange: (filters: any) => void;
}) {
  const [search, setSearch] = useState(filters.search || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({
        ...filters,
        search: search || undefined,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="p-4 border rounded-xl space-y-4 bg-white/5">
      <input
        type="text"
        placeholder="Search meals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
      />

      <button
        onClick={() => {
          setSearch("");
          onFilterChange({});
        }}
        className="text-sm text-red-500"
      >
        Reset Filters
      </button>
    </div>
  );
}