import axios from "axios";
import { CreateOrderPayload,
  Order,
  ProviderOrder,
  OrderStatus,

 } from "../types/order";

// export const createOrder = async (payload: CreateOrderPayload) => {
//   const res = await axios.post("http://localhost:5000/api/orders", payload, {
//     withCredentials: true,
//   });
//   return res.data.data as Order;
// };
export const createOrder = async (payload: any) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/orders",
      payload,
      { withCredentials: true }
    );

    return {
      order: res.data.data.order,
      clientSecret: res.data.data.clientSecret,
      error: null,
    };
  } catch (err: any) {
    return {
      order: null,
      clientSecret: null,
      error: err.response?.data?.message,
    };
  }
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
