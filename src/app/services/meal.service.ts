import axios from "axios";
import { Meal } from "../types/meal";
// import { Meal } from "@/types/meal";

export const getMeals = async (): Promise<Meal[]> => {
  const res = await axios.get("http://localhost:5000/api/meals", {
    withCredentials: true,
  });
  return res.data.data;
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