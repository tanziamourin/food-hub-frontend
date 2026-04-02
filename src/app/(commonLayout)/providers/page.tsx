"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ProvidersPage = () => {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProviders = async () => {
    try {
      const res = await fetch("https://food-hub-backend-one.vercel.app/api/providers");

      const result = await res.json();

      if (result.success) {
        setProviders(result.data);
      } else {
        toast.error("Failed to load providers");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  //  Skeleton UI
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Providers</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {providers.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg shadow p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-bold">{p.shopName}</h2>
              <p className="text-gray-600 text-sm">{p.address}</p>
            </div>

            <button
              onClick={() => router.push(`/providers/${p.id}`)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProvidersPage;