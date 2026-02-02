// components/home/FeaturedMeals.tsx
export default function FeaturedMeals() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          Popular Meals Near You
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map((i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow">
              <img src="/meal.jpg" className="h-40 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">Chicken Burger</h3>
                <p className="text-sm text-gray-500">By Food Corner</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold">৳250</span>
                  <button className="text-sm bg-orange-500 text-white px-3 py-1 rounded">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
