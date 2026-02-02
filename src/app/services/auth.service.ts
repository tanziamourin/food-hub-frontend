import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

type AuthData = {
  email: string;
  password: string;
};

export const login = async (data: AuthData) => {
  return axios.post(`${API}/api/auth/login`, data, { withCredentials: true });
};

export const register = async (data: AuthData) => {
  return axios.post(`${API}/api/auth/register`, data);
};
export const logout = async () => {
  return axios.post(
    `${API}/api/auth/logout`);}