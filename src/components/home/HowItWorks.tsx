// components/home/HowItWorks.tsx
export default function HowItWorks() {
  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-2xl font-bold text-center mb-12">
        How FoodHub Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-4xl mb-3">🍽️</div>
          <h3 className="font-semibold mb-2">Choose Meal</h3>
          <p className="text-gray-600">
            Browse meals from top providers
          </p>
        </div>

        <div>
          <div className="text-4xl mb-3">🛒</div>
          <h3 className="font-semibold mb-2">Place Order</h3>
          <p className="text-gray-600">
            Add to cart & checkout easily
          </p>
        </div>

        <div>
          <div className="text-4xl mb-3">🚚</div>
          <h3 className="font-semibold mb-2">Track Delivery</h3>
          <p className="text-gray-600">
            Get food delivered fast
          </p>
        </div>
      </div>
    </section>
  );
}
