"use client";

import { useEffect, useState } from "react";
// import { Order } from "@/types/order";
// import { getMyOrders } from "@/services/order.service";
import { Order } from "@/app/types/order";
import { getMyOrders } from "@/app/services/order.service";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getMyOrders().then(setOrders);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.map(order => (
        <div key={order.id} className="border p-4 mb-4 rounded">
          <p>Status: {order.status}</p>
          <p>Address: {order.deliveryAddress}</p>

          <ul className="mt-2">
            {order.items.map(item => (
              <li key={item.id}>
                {item.meal.name} × {item.quantity} — ৳{item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
