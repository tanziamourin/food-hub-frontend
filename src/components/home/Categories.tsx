// components/home/Categories.tsx
const categories = [
  { name: "Pizza", icon: "🍕" },
  { name: "Burger", icon: "🍔" },
  { name: "Healthy", icon: "🥗" },
  { name: "Asian", icon: "🍜" },
];

export default function Categories() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-6">Browse by Cuisine</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="border rounded-xl p-6 flex flex-col items-center hover:shadow-md cursor-pointer transition"
          >
            <span className="text-4xl">{cat.icon}</span>
            <p className="mt-3 font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
