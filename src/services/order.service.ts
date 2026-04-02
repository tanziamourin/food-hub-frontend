import axios from "axios";
import { CreateOrderPayload,
  Order,
  ProviderOrder,
  OrderStatus,

 } from "../types/order";

// export const createOrder = async (payload: CreateOrderPayload) => {
//   const res = await axios.post("https://food-hub-backend-one.vercel.app/api/orders", payload, {
//     withCredentials: true,
//   });
//   return res.data.data as Order;
// };
export const createOrder = async (payload: any) => {
  try {
    const res = await axios.post(
      "https://food-hub-backend-one.vercel.app/api/orders",
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
  const res = await axios.get("https://food-hub-backend-one.vercel.app/api/orders/me", {
    withCredentials: true,
  });
  return res.data.data as Order[];
};

// Provider
export const getProviderOrders = async () => {
  const res = await axios.get("https://food-hub-backend-one.vercel.app/api/provider/orders", {
    withCredentials: true,
  });
  return res.data as ProviderOrder[];
};

export const updateProviderOrderStatus = async (
  orderId: string,
  status: OrderStatus
) => {
  const res = await axios.patch(
    `https://food-hub-backend-one.vercel.app/api/provider/orders/${orderId}`,
    { status },
    { withCredentials: true }
  );
  return res.data;
};
