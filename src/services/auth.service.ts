import { apiFetch } from "@/lib/api-client";


// const API = process.env.NEXT_PUBLIC_API_URL;

type AuthData = {
  email: string;
  password: string;
};

export const login = async (data: AuthData) => {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: data,
  });
};

export const register = async (data: AuthData) => {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: data,
  });
};

export const logout = async () => {
  return apiFetch("/api/auth/logout", {
    method: "POST",
  });
};