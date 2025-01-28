import { Header } from "@/components/Header";
import { FoodCard } from "../components/FoodCard";
import Image from "next/image";
import { FoodCategories } from "@/components/FoodCategories";
import { Footer } from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const cards = [
    {
      title: "Finger Food",
      price: 12.99,
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
      // image: FingerFood,
    },
    {
      title: "Cranberry Brie Bites",
      price: 12.99,
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
      // image: CranberryBrieBites,
    },

    {
      title: "Sunshine Stackers ",
      price: 12.99,
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
      // image: SunShineStackers,
    },
    {
      title: "Sunshine Stackers ",
      price: 12.99,
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
      // image: SunShineStackers,
    },
  ];

  const categories = [
    {
      name: "Appetizers",
    },
    { name: "Salads" },
    { name: "Pizzas" },
    { name: "Lunch favorites" },
    { name: "Main dishes" },
    { name: "Fish & Sea foods" },
    { name: "Side dish" },
    { name: "Brunch" },
    { name: "Desserts" },
  ];

  return (
    <div>
      <Header />
      <Image src="/BG.png" width={1440} height={570} alt="background-image" />
      <div className="bg-[#404040] py-8 px-[88px] flex flex-col gap-[10px]">
        <h1 className="text-3xl font-semibold text-white">Categories</h1>
        <div className="flex justify-between">
          {categories.map((category, index) => {
            return <FoodCategories category={category} key={index} />;
          })}
        </div>
      </div>
      <div className="bg-[#404040] px-[88px] pb-[48px] flex flex-col gap-[54px]">
        <h1 className="text-3xl font-semibold text-white">Appetizers</h1>
        <div className="flex flex-wrap gap-5">
          {cards.map((card, index) => {
            return <FoodCard card={card} key={index} />;
          })}
        </div>
        <h1 className="text-3xl font-semibold text-white">Salads</h1>
        <div className="flex flex-wrap gap-5">
          {cards.map((card, index) => {
            return <FoodCard card={card} key={index} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
