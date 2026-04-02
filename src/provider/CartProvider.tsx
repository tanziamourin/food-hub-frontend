"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
// import { Meal } from "@/types/meal.type";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Meal } from "@/types/meal";

export interface CartItem extends Meal {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (meal: Meal) => void;
  removeFromCart: (mealId: string) => void;
  updateQuantity: (mealId: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { data: session } = authClient.useSession();
  const prevUserIdRef = useRef<string | undefined>(undefined);

  const getCartKey = () =>
    session?.user?.id ? `cart_${session.user.id}` : null;

  // Load cart
  useEffect(() => {
    const currentUserId = session?.user?.id;

    if (currentUserId !== prevUserIdRef.current) {
      const key = getCartKey();

      if (key) {
        const savedCart = localStorage.getItem(key);
        if (savedCart) {
          try {
            setCart(JSON.parse(savedCart));
          } catch {
            setCart([]);
          }
        } else {
          setCart([]);
        }
      } else {
        setCart([]);
      }

      prevUserIdRef.current = currentUserId;
    }

    setIsInitialized(true);
  }, [session]);

  // Save cart
  useEffect(() => {
    if (isInitialized) {
      const key = getCartKey();
      if (key) {
        localStorage.setItem(key, JSON.stringify(cart));
      }
    }
  }, [cart, isInitialized, session]);

  // ✅ Add Meal
  const addToCart = (meal: Meal) => {
    if (!session?.user) {
      toast.error("Login required", {
        description: "Please login to add meals",
      });
      return;
    }

    const role = (session.user as any)?.role;
    if (role === "ADMIN" || role === "PROVIDER") {
      toast.error("Only customers can order meals");
      return;
    }

    setCart((prev) => {
      const exist = prev.find((item) => item.id === meal.id);

      if (exist) {
        return prev.map((item) =>
          item.id === meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...meal, quantity: 1 }];
    });

    toast.success("Meal added to cart 🍱");
  };

  const removeFromCart = (mealId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== mealId));
  };

  const updateQuantity = (mealId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(mealId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === mealId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const itemCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};