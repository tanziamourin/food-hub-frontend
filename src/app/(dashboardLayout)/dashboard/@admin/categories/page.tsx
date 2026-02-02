"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

 
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories", {
        credentials: "include", 
      });
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : (data?.data || []));
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
        credentials: "include", 
      });

      if (res.ok) {
        toast.success("Category added!");
        setNewCategory("");
        fetchCategories();
      } else if (res.status === 401) {
        toast.error("Unauthorized: Please login as Admin");
      } else {
        toast.error("Failed to add category");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.status === 204 || res.ok) {
        toast.success("Category deleted");
        fetchCategories();
      } else {
        toast.error("Could not delete. Check your permissions.");
      }
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
   
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-8">Manage Categories 📂</h1>
      <form onSubmit={handleCreate} className="flex gap-2 mb-10">
        <Input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category Name..."
          className="flex-1"
        />
        <Button type="submit" disabled={loading} className="bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          {loading ? "Adding..." : "Add Category"}
        </Button>
      </form>

      <div className="bg-white rounded-lg shadow overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold">Category Name</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{cat.name}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(cat.id)} className="text-red-500">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}