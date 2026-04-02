"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Order {
  id: string;
  totalPrice: number;
  status: string;
  paymentType: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();

        setOrders(data.orders || []);
      } catch (error) {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 🔥 Update Status
  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Order updated");

        setOrders((prev) =>
          prev.map((order) =>
            order.id === id ? { ...order, status } : order
          )
        );
      }
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-white/10">
          <thead className="bg-white/5">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-white/10">
                <td className="p-3">
                  <p>{order.user?.name}</p>
                  <p className="text-sm text-gray-400">
                    {order.user?.email}
                  </p>
                </td>

                <td className="p-3">৳{order.totalPrice}</td>

                <td className="p-3">
                  {order.paymentType === "ONLINE" ? (
                    <span className="text-green-400">Online</span>
                  ) : (
                    <span className="text-yellow-400">COD</span>
                  )}
                </td>

                <td className="p-3">
                  <span className="px-2 py-1 rounded bg-white/10">
                    {order.status}
                  </span>
                </td>

                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value)
                    }
                    className="bg-black border border-white/20 p-2"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PAID">PAID</option>
                    <option value="DELIVERED">DELIVERED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center py-10 text-gray-400">
            No orders found
          </p>
        )}
      </div>
    </div>
  );
}