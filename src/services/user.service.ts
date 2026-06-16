import { apiFetch, FetchOptions } from "@/lib/api-client";
import { User } from "../types/user.type";

interface Session {
  user: User;
  session: {
    id: string;
    expiresAt: string;
  };
}

export const userService = {
  // 🔹 Get session
  getSession: async () => {
    return apiFetch<Session | null>("/api/auth/get-session");
  },

  // 🔹 Profile
  getProfile: async () => {
    return apiFetch<User & { phone?: string }>("/api/users/me");
  },

  // 🔹 Update profile
  updateProfile: async (userData: {
    name?: string;
    phone?: string;
  }) => {
    return apiFetch<User & { phone?: string }>("/api/users/me", {
      method: "PATCH",
      body: userData,
    });
  },

  // 🔹 Admin users
  getAllUsers: async (options?: FetchOptions) => {
    return apiFetch<User[]>("/api/admin/users", options);
  },

  // 🔹 Update user status
  updateUserStatus: async (
    id: string,
    newStatus: boolean,
    options?: FetchOptions
  ) => {
    return apiFetch<User>(`/api/admin/users/${id}`, {
      ...options,
      method: "PATCH",
      body: { status: newStatus },
    });
  },

  // 🔹 Admin stats
  getAdminStats: async (options?: FetchOptions) => {
    return apiFetch<any>("/api/admin/stats", options);
  },
};