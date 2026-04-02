"use client";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { useCart } from "@/provider/CartProvider";

export default function CheckoutPage() {
  const { totalPrice } = useCart();

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      <p>Total: ৳ {totalPrice}</p>

      <Elements stripe={stripePromise}>
        <StripeCheckoutForm />
      </Elements>
    </div>
  );
}