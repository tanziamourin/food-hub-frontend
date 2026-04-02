import { Meal } from "./meal";

export type OrderStatus =
  | "PLACED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItem {
  id: string;
  mealId: string;
  quantity: number;
  price: number;
  meal: Meal;
}

export interface Order {
  id: string;
  customerId: string;
  deliveryAddress: string;
  status: OrderStatus;
  createdAt: string;

  customer?: {
    id: string;
    name: string;
    email: string;
  };

  items: OrderItem[];
}

export interface CreateOrderPayload {
  deliveryAddress: string;
  items: {
    mealId: string;
    quantity: number;
  }[];
}

export interface ProviderOrder extends Order {
  customer: {
    id: string;
    name: string;
    email: string;
  };
}
