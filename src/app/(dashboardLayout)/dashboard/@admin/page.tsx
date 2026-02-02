"use client";

import React from 'react';
import { Users, ShoppingBag, LayoutGrid, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { id: 1, name: 'Total Users', value: '1,250', icon: Users, color: 'bg-blue-500' },
    { id: 2, name: 'Total Orders', value: '450', icon: ShoppingBag, color: 'bg-green-500' },
    { id: 3, name: 'Categories', value: '12', icon: LayoutGrid, color: 'bg-orange-500' },
    { id: 4, name: 'Total Revenue', value: '$12,400', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Admin! 👋</h1>
        <p className="text-gray-500">Here's what's happening today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className={`${item.color} p-3 rounded-lg text-white mr-4`}>
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{item.name}</p>
              <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Insights Section */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Quick Insights</h2>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
          Charts will go here...
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;