import { mealService } from "@/services/meal.service";
import { notFound } from "next/navigation";
import MealDetailsClient from "./MealDetailsClient";
import { use } from "react";

interface Props {
  params: { id: string };
}

export default async function MealDetailsPage({ params }: Props) {
  const { id } =await params;

  const { data: meal } = await mealService.getMealById(id);

  if (!meal) return notFound();

  return <MealDetailsClient meal={meal} />;
}