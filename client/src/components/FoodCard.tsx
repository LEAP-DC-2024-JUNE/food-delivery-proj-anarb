import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type CardType = {
  title: string;
  price: number;
  description: string;
  // image?: HTMLImageElement;
};

type CardPropsType = {
  card: CardType;
};

export const FoodCard = ({ card }: CardPropsType) => {
  return (
    <Card className="w-[400px] rounded-[20px]">
      <CardContent className="flex flex-col gap-5 p-4">
        <Image
          src="/FingerFood.png"
          width={365}
          height={210}
          alt="food"
        ></Image>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h1 className="text-[#EF4444] text-2xl font-semibold">
              {card.title}
            </h1>
            <p className="text-lg font-semibold">{card.price}</p>
          </div>
          <p className="text-sm font-normal">{card.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
