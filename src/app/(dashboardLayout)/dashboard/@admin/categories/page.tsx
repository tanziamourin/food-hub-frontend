"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { apiFetch } from "@/lib/api-client";

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

 type Category = {
  id: string;
  name: string;
};

const fetchCategories = async () => {
  try {
    const { data, error } = await apiFetch<Category[]>("/api/categories");

    if (error) {
      toast.error(error);
      return;
    }

    setCategories(data || []);
  } catch {
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
      const { error } = await apiFetch("/api/categories", {
        method: "POST",
        body: { name: newCategory },
      });

      if (error) {
        toast.error(error);
      } else {
        toast.success("Category added!");
        setNewCategory("");
        fetchCategories();
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const { error } = await apiFetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (error) {
        toast.error(error);
      } else {
        toast.success("Category deleted");
        fetchCategories();
      }
    } catch {
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
              <th className="p-4">Category Name</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{cat.name}</td>

                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-500"
                  >
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