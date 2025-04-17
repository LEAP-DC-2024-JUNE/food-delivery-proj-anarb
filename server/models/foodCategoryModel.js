import mongoose from "mongoose";

const foodCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const FoodCategory = mongoose.model("FoodCategory", foodCategorySchema);
export default FoodCategory;
