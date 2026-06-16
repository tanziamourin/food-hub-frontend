"use client";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { createOrder } from "@/services/order.service";
import { toast } from "sonner";
import { useCart } from "@/provider/CartProvider";

export default function StripeCheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const { cart, clearCart } = useCart();

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (!address) {
      toast.error("Delivery address required");
      return;
    }

    if (!stripe || !elements) {
      toast.error("Stripe not loaded");
      return;
    }

    setLoading(true);

    try {
      // 🧾 Create Order + Payment Intent
      const res = await createOrder({
        items: cart.map((item: any) => ({
          mealId: item.id,
          quantity: item.quantity,
        })),
        deliveryAddress: address,
      });

      if (res.error) {
        toast.error(res.error);
        setLoading(false);
        return;
      }

      const card = elements.getElement(CardElement);

      if (!card) {
        toast.error("Card not found");
        setLoading(false);
        return;
      }

      // 🔥🔥🔥 IMPORTANT FIX HERE
      if (!res.clientSecret) {
        toast.error("Payment failed: missing client secret");
        setLoading(false);
        return;
      }

      // 💳 Confirm Payment
      const result = await stripe.confirmCardPayment(res.clientSecret, {
        payment_method: {
          card,
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success("Payment Successful 🎉");
        clearCart();
      }
    } catch (error: any) {
      toast.error(error.message || "Payment failed");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <div className="border p-4 rounded">
        <CardElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-500 text-white p-2 w-full rounded"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}