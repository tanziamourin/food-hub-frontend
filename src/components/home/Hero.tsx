// components/home/Hero.tsx
export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
      <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover & Order Delicious Meals
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Fresh food from your favorite restaurants, delivered fast.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              placeholder="Search meals or cuisine..."
              className="px-4 py-3 rounded text-black w-full"
            />
            <button className="bg-black px-6 py-3 rounded font-semibold">
              Browse Meals
            </button>
          </div>
        </div>

        <img
          src="/hero-food.png"
          alt="Food"
          className="hidden md:block rounded-xl"
        />
      </div>
    </section>
  );
}
