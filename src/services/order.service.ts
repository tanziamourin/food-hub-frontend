import { apiFetch } from "@/lib/api-client";
import {
  CreateOrderPayload,
  Order,
  ProviderOrder,
  OrderStatus,
} from "../types/order";

//  Create Order
export const createOrder = async (payload: CreateOrderPayload) => {
  const { data, error } = await apiFetch<{
    order: Order;
    clientSecret: string;
  }>("/api/orders", {
    method: "POST",
    body: payload,
  });

  if (error) {
    return {
      order: null,
      clientSecret: null,
      error,
    };
  }

  return {
    order: data?.order || null,
    clientSecret: data?.clientSecret || null,
    error: null,
  };
};

//  Get my orders
export const getMyOrders = async () => {
  const { data, error } = await apiFetch<Order[]>("/api/orders/me");

  if (error) throw new Error(error);

  return data || [];
};

//  Provider orders
export const getProviderOrders = async () => {
  const { data, error } = await apiFetch<ProviderOrder[]>(
    "/api/provider/orders"
  );

  if (error) throw new Error(error);

  return data || [];
};

//  Update order status
export const updateProviderOrderStatus = async (
  orderId: string,
  status: OrderStatus
) => {
  const { data, error } = await apiFetch(
    `/api/provider/orders/${orderId}`,
    {
      method: "PATCH",
      body: { status },
    }
  );

  if (error) throw new Error(error);

  return data;
};