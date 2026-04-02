"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { UserCheck, UserX, Shield } from "lucide-react";

const ManageUsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 401) {
        toast.error("You are not logged in as Admin!");
        return;
      }

      const result = await res.json();

      if (result.success) {
        setUsers(result.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Toggle status
  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

    try {
      setUpdatingUserId(userId);

      const res = await fetch(
        `http://localhost:5000/api/admin/users/${userId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || `User is now ${newStatus}`);
        fetchUsers();
      } else {
        toast.error(result.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Network error occurred");
    } finally {
      setUpdatingUserId(null);
    }
  };

  // Change role
  const changeUserRole = async (userId: string, role: string) => {
    try {
      setUpdatingUserId(userId);

      const res = await fetch(
        `http://localhost:5000/api/admin/users/${userId}/role`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ role }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Role updated successfully");
        fetchUsers();
      } else {
        toast.error(result.message || "Failed to update role");
      }
    } catch (err) {
      toast.error("Network error occurred");
    } finally {
      setUpdatingUserId(null);
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading users...</div>;

  return (
    <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 mt-5 mx-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="text-orange-600" /> Manage Users
        </h1>

        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
          Total: {users.length}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 font-semibold text-gray-600">Name</th>
              <th className="p-4 font-semibold text-gray-600">Email</th>
              <th className="p-4 font-semibold text-gray-600">Role</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Name */}
                <td className="p-4 font-medium">
                  {user.name || "N/A"}
                </td>

                {/* Email */}
                <td className="p-4 text-gray-600">
                  {user.email}
                </td>

                {/* Role */}
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      changeUserRole(user.id, e.target.value)
                    }
                    disabled={updatingUserId === user.id}
                    className={`border px-2 py-1 rounded text-xs font-bold ${
                      user.role === "ADMIN"
                        ? "text-purple-700"
                        : user.role === "PROVIDER"
                        ? "text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="PROVIDER">PROVIDER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`flex items-center gap-1 text-sm ${
                      user.status === "ACTIVE"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {user.status === "ACTIVE" ? (
                      <UserCheck size={16} />
                    ) : (
                      <UserX size={16} />
                    )}
                    {user.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-4 text-right">
                  <button
                    onClick={() =>
                      toggleUserStatus(user.id, user.status)
                    }
                    disabled={updatingUserId === user.id}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      user.status === "ACTIVE"
                        ? "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                        : "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                    }`}
                  >
                    {user.status === "ACTIVE"
                      ? "Suspend"
                      : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsersPage;