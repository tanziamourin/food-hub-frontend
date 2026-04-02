"use client";

import { useEffect, useState } from "react";
import { getMyOrders } from "@/services/order.service";

const statusSteps = ["PLACED", "PREPARING", "READY", "DELIVERED"];

export default function DashboardOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    getMyOrders().then(setOrders);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Order Tracking</h1>

      {orders.map(order => (
        <div
          key={order.id}
          className="p-5 rounded-2xl bg-white/5 border border-white/10"
        >
          <p className="text-sm text-gray-400 mb-4">
            Order #{order.id.slice(0, 6)}
          </p>

          <div className="flex justify-between items-center">
            {statusSteps.map((step, i) => {
              const currentIndex = statusSteps.indexOf(order.status);

              return (
                <div key={step} className="flex-1 text-center">
                  <div
                    className={`mx-auto size-6 rounded-full ${
                      i <= currentIndex
                        ? "bg-primary"
                        : "bg-gray-600"
                    }`}
                  />
                  <p className="text-[10px] mt-1 text-gray-400">
                    {step}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}