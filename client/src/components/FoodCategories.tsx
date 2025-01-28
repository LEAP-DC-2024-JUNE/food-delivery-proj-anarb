import { Badge } from "./ui/badge";

type CategoryType = {
  name: string;
};

type CategoryPropsType = {
  category: CategoryType;
};

export const FoodCategories = ({ category }: CategoryPropsType) => {
  return (
    <Badge className="rounded-full py-1 px-5 text-lg font-normal bg-[#FAFAFA] text-[#18181B] hover:bg-[#EF4444] hover:text-[#FAFAFA]">
      {category.name}
    </Badge>
  );
};
