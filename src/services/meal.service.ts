import axios from "axios";
import { Meal } from "../types/meal";
// import { Meal } from "@/types/meal";
const BASE_URL = "https://food-hub-backend-one.vercel.app/api";

export const getMeals = async (): Promise<Meal[]> => {
  const res = await axios.get("https://food-hub-backend-one.vercel.app/api/meals", {
    withCredentials: true,
  });
 return res.data;
};
export const addMeal = async (mealData: any) => {
  try {
  
    const res = await axios.post("https://food-hub-backend-one.vercel.app/api/provider/meals", mealData, {
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