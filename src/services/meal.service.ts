import { apiFetch, buildQueryString } from "@/lib/api-client";
import { Meal } from "../types/meal";

//  Get all meals (simple)
export const getMeals = async (): Promise<Meal[]> => {
  const { data, error } = await apiFetch<Meal[]>("/api/meals");

  if (error) throw new Error(error);

  return data || [];
};

//  Add meal
export const addMeal = async (mealData: any) => {
  const { data, error } = await apiFetch("/api/provider/meals", {
    method: "POST",
    body: mealData,
  });

  if (error) throw new Error(error);

  return data;
};

//  Advanced service (filters সহ)
export const mealService = {
  async getMeals(filters: any = {}) {
    const query = buildQueryString(filters);

    const { data, error } = await apiFetch<Meal[]>(
      `/api/meals${query}`
    );

    if (error) throw new Error(error);

    return {
      data: data || [],
    };
  },

  async getMealById(id: string) {
    const { data, error } = await apiFetch<Meal>(
      `/api/meals/${id}`
    );

    if (error) throw new Error(error);

    return {
      data,
    };
  },
};