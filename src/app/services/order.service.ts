import axios from "axios";
import { CreateOrderPayload,
  Order,
  ProviderOrder,
  OrderStatus,

 } from "../types/order";

export const createOrder = async (payload: CreateOrderPayload) => {
  const res = await axios.post("http://localhost:5000/api/orders", payload, {
    withCredentials: true,
  });
  return res.data.data as Order;
};

export const getMyOrders = async () => {
  const res = await axios.get("http://localhost:5000/api/orders/me", {
    withCredentials: true,
  });
  return res.data.data as Order[];
};

// Provider
export const getProviderOrders = async () => {
  const res = await axios.get("http://localhost:5000/api/provider/orders", {
    withCredentials: true,
  });
  return res.data as ProviderOrder[];
};

export const updateProviderOrderStatus = async (
  orderId: string,
  status: OrderStatus
) => {
  const res = await axios.patch(
    `http://localhost:5000/api/provider/orders/${orderId}`,
    { status },
    { withCredentials: true }
  );
  return res.data;
};
