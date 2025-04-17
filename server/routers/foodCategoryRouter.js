import express from "express";
import {
  createFoodCategory,
  deleteFoodCategory,
  getFoodCategories,
  updateFoodCategory,
} from "../controllers/foodCategoryController.js";

const foodCategoryRouter = express.Router();

foodCategoryRouter.get("/", getFoodCategories);
foodCategoryRouter.post("/", createFoodCategory);
foodCategoryRouter.patch("/:foodCategoryId", updateFoodCategory);
foodCategoryRouter.delete("/:foodCategoryId", deleteFoodCategory);

export default foodCategoryRouter;
