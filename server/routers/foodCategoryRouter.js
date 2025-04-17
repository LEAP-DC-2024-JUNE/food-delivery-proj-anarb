import express from "express";
import {
  getFoodCategories,
  createFoodCategory,
  updateFoodCategory,
  deleteFoodCategory,
} from "../controllers/foodCategoryController.js";

const foodCategoryRouter = express.Router();

foodCategoryRouter.get("/", getFoodCategories);
foodCategoryRouter.post("/", createFoodCategory);
foodCategoryRouter.patch("/:foodCategoryId", updateFoodCategory);
foodCategoryRouter.delete("/:foodCategoryId", deleteFoodCategory);

export default foodCategoryRouter;
