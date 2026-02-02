"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CustomerDashboard() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Welcome, Customer 👋</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="border rounded p-4">
          <h2>🍽 Browse Meals</h2>
          <Link href="/meals">
            <Button className="w-full mt-2">Explore</Button>
          </Link>
        </div>

        <div className="border rounded p-4">
          <h2>📦 My Orders</h2>
          <Link href="/orders">
            <Button className="w-full mt-2">View Orders</Button>
          </Link>
        </div>

        <div className="border rounded p-4">
          <h2>👤 Profile</h2>
          <Link href="/profile">
            <Button variant="outline" className="w-full mt-2">Edit Profile</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
