// User service - uses reusable API client
// import { apiFetch, API_URL, FetchOptions } from "@/lib/api-client";
import { apiFetch , FetchOptions} from "@/lib/api-client";
import { User } from "../types/user.type";
// import { User } from "@/types/user.type";

interface Session {
    user: User;
    session: {
        id: string;
        expiresAt: string;
    };
}

export const userService = {
    // Get current user session
    getSession: async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/get-session", {
                credentials: "include",
            });
            const data = await res.json();
            return { data: data as Session | null, error: null };
        } catch (error) {
            console.error("Session error:", error);
            return { data: null, error: "Failed to get session" };
        }
    },

    // Get user profile
    getProfile: async () => {
        return apiFetch<User & { phone?: string }>("http://localhost:5000/api/users/me");
    },

    // Update user profile
    updateProfile: async (userData: { name?: string; phone?: string }) => {
        return apiFetch<User & { phone?: string }>("http://localhost:5000/api/users/me", {
            method: "PATCH",
            body: userData,
        });
    },

    // Admin: Get all users
    getAllUsers: async (options?: FetchOptions) => {
        return apiFetch<User[]>("http://localhost:5000/api/admin/users", options);
    },

    // Admin: Update user block status
    updateUserStatus: async (id: string, newStatus: boolean, options?: FetchOptions) => {
        return apiFetch<User>(`http://localhost:5000/api/admin/users/${id}`, {
            ...options,
            method: "PATCH",
            body: { status: newStatus },
        });
    },

    // Admin: Get dashboard stats
    getAdminStats: async (options?: FetchOptions) => {
        return apiFetch<any>("http://localhost:5000/api/admin/stats", options);
    },
};
