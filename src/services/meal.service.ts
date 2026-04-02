import axios from "axios";
import { Meal } from "../types/meal";
// import { Meal } from "@/types/meal";
const BASE_URL = "http://localhost:5000/api";

export const getMeals = async (): Promise<Meal[]> => {
  const res = await axios.get("http://localhost:5000/api/meals", {
    withCredentials: true,
  });
 return res.data;
};
export const addMeal = async (mealData: any) => {
  try {
  
    const res = await axios.post("http://localhost:5000/api/provider/meals", mealData, {
      withCredentials: true, 
    });
    return res.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to add meal";
  }
};
export const mealService = {
  async getMeals(filters: any = {}) {
    const query = new URLSearchParams(filters).toString();

    const res = await axios.get(
      `${BASE_URL}/meals?${query}`,
      { withCredentials: true }
    );

    console.log("🔥 RAW:", res.data);

    // ✅ Backend direct array return kore
    return {
      data: res.data || [],
    };
  },

  async getMealById(id: string) {
    const res = await axios.get(
      `${BASE_URL}/meals/${id}`,
      { withCredentials: true }
    );

    return {
      data: res.data,
    };
  },
};