// src/app/(dashboardLayout)/@provider/providerDashboard/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProviderDashboardPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Provider Dashboard 👨‍🍳</h1>
        <Link href="/providerDashboard/add-meal">
          <Button className="bg-orange-600 hover:bg-orange-700">
            + Add New Meal
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="border border-orange-100 bg-orange-50 p-6 rounded-xl">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Active Orders</h3>
          <p className="text-3xl font-bold text-orange-600">05</p>
        </div>

        <div className="border border-blue-100 bg-blue-50 p-6 rounded-xl">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Total Meals</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
        </div>

        <div className="border border-green-100 bg-green-50 p-6 rounded-xl">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">$450.00</p>
        </div>
      </div>

      {/* Recent Orders Section Placeholder */}
      <div className="mt-8 border rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Recent Incoming Orders</h2>
        <p className="text-gray-400 text-sm italic">No new orders yet today.</p>
      </div>
    </div>
  );
}