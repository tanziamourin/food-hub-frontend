"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api-client";

const ProviderDetailsPage = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProvider = async () => {
  try {
    const { data, error } = await apiFetch<any>(`/api/providers/${id}`);

    if (error) {
      toast.error(error);
    } else {
      setProvider(data);
    }
  } catch {
    toast.error("Network error");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (id) fetchProvider();
  }, [id]);

   const SkeletonCard = () => (
    <div className="border rounded-lg p-4 animate-pulse">
      <div className="h-5 bg-gray-300 rounded w-2/3 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>

      <div className="mt-4 h-9 bg-gray-300 rounded"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Providers</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }


  if (!provider) return <p className="p-6">Provider not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">
        {provider.shopName}
      </h1>

      <p className="text-gray-600">{provider.address}</p>
      <p className="mt-2">{provider.description}</p>

      <h2 className="text-xl font-semibold mt-6 mb-4">
        Meals
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {provider.meals?.map((meal: any) => (
          <div key={meal.id} className="border p-3 rounded-lg">
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-32 object-cover rounded"
            />

            <h3 className="font-bold mt-2">{meal.name}</h3>
            <p>৳ {meal.price}</p>
            <p className="text-sm text-gray-500">
              {meal.category?.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderDetailsPage;