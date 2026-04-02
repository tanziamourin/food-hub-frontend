"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ProviderProfilePage = () => {
  const [form, setForm] = useState({
    shopName: "",
    address: "",
    phone: "",
    description: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // FETCH
  const fetchProfile = async () => {
    try {
      const res = await fetch("https://food-hub-backend-one.vercel.app/api/provider/profile", {
        credentials: "include",
      });

      const data = await res.json();

      setForm({
        shopName: data.shopName || "",
        address: data.address || "",
        phone: data.phone || "",
        description: data.description || "",
      });

      setPreview(data.logo || "");
    } catch {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // INPUT
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // IMAGE
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setLogoFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value && value.trim() !== "") {
          formData.append(key, value);
        }
      });

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      const res = await fetch(
        "https://food-hub-backend-one.vercel.app/api/provider/profile",
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Profile updated");
        fetchProfile();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <h1 className="text-xl font-bold">Edit Profile</h1>

        <input
          name="shopName"
          value={form.shopName}
          onChange={handleChange}
          placeholder="Shop Name"
          className="border p-2 w-full"
        />

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="border p-2 w-full"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full"
        />

        <input type="file" onChange={handleImageChange} />

        <button className="bg-orange-600 text-white px-4 py-2 rounded">
          {loading ? "Saving..." : "Update"}
        </button>
      </form>

      {/* PREVIEW */}
      <div className="border p-4 rounded-xl text-center">
        <img
          src={preview || "/no-image.png"}
          className="w-32 h-32 rounded-full mx-auto object-cover"
        />

        <h2 className="text-lg font-bold mt-2">
          {form.shopName || "Shop Name"}
        </h2>

        <p>{form.address || "Address"}</p>
        <p className="text-sm">{form.description || "Description"}</p>
        <p className="text-xs text-gray-500">{form.phone || "Phone"}</p>
      </div>
    </div>
  );
};

export default ProviderProfilePage;
  