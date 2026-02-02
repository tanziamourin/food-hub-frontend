// app/page.tsx
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedMeals from "@/components/home/FeaturedMeals";
import HowItWorks from "@/components/home/HowItWorks";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedMeals />
      <HowItWorks />
      <Footer></Footer>
    </>
  );
}
