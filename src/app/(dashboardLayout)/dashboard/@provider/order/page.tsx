"use client";

import { useEffect, useState } from "react";
import { getProviderOrders , updateProviderOrderStatus, } from "@/app/services/order.service";
import { ProviderOrder , OrderStatus} from "@/app/types/order";

export default function ProviderOrdersPage() {
  const [orders, setOrders] = useState<ProviderOrder[]>([]);

  useEffect(() => {
    getProviderOrders().then(setOrders);
  }, []);

  const handleStatusChange = async (
    orderId: string,
    status: OrderStatus
  ) => {
    await updateProviderOrderStatus(orderId, status);
    const updated = await getProviderOrders();
    setOrders(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Incoming Orders</h1>

      {orders.map(order => (
        <div key={order.id} className="border p-4 mb-4 rounded">
          <p>Customer: {order.customer.name}</p>
          <p>Status: {order.status}</p>

          <ul className="mt-2">
            {order.items.map(item => (
              <li key={item.id}>
                {item.meal.name} × {item.quantity}
              </li>
            ))}
          </ul>

          {order.status === "PLACED" && (
            <button
              className="btn mt-3"
              onClick={() =>
                handleStatusChange(order.id, "PREPARING")
              }
            >
              Start Preparing
            </button>
          )}

          {order.status === "PREPARING" && (
            <button
              className="btn mt-3"
              onClick={() =>
                handleStatusChange(order.id, "READY")
              }
            >
              Mark Ready
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
