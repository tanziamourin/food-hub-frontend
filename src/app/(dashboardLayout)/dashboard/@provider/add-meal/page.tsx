"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addMeal } from "@/app/services/meal.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AddMealPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories");
        const data = await res.json();
        
  
        const categoryArray = Array.isArray(data) ? data : (data?.data || []);
        setCategories(categoryArray);
      } catch (err) {
        console.error("404 Error: Check backend route mounting", err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const mealData = {
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description"),
      categoryId: formData.get("categoryId"), 
    };

    try {
      await addMeal(mealData);
      toast.success("Meal added successfully!");
      router.push("/provider/menu");
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md border mt-10">
      <h2 className="text-2xl font-bold mb-6">Create New Menu Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" placeholder="Meal Name" required />
        
        <div className="grid grid-cols-2 gap-4">
          <Input name="price" type="number" step="0.01" placeholder="Price" required />
          <select 
            name="categoryId" 
            className="border rounded-md px-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none h-10"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <textarea 
          name="description"
          className="w-full border rounded-md p-3 h-32 outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Description"
          required
        ></textarea>

        <Button type="submit" className="w-full bg-orange-600" disabled={loading}>
          {loading ? "Adding..." : "Add Meal"}
        </Button>
      </form>
    </div>
  );
}