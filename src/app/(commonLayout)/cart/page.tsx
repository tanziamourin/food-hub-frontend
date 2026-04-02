"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/provider/CartProvider";
// import { useCart } from "@/providers/CartProvider";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, itemCount } = useCart();

  const handleRemove = (id: string, title: string) => {
    removeFromCart(id);
    toast.success(`${title} removed from cart`);
  };

  if (itemCount === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Cart is Empty 🍱</h1>
          <Link href="/meals">
            <Button>Browse Meals</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 border p-4 rounded-xl">

              <Image
                src={item.image || "/placeholder.png"}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />

              <div className="flex-1 space-y-2">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.description || "Delicious meal"}
                </p>

                <div className="flex items-center gap-3">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Minus />
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus />
                  </button>
                </div>

                <p className="font-bold">
                  ৳ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <button onClick={() => handleRemove(item.id, item.name)}>
                <Trash2 className="text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-bold">Summary</h2>

          <div className="flex justify-between">
            <span>Items</span>
            <span>{itemCount}</span>
          </div>

          <div className="flex justify-between">
            <span>Total</span>
            <span>৳ {totalPrice.toFixed(2)}</span>
          </div>

          <Link href="/checkout">
            <Button className="w-full">
              Checkout <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}