import express from "express";
import {
  getFoodCategories,
  createFoodCategory,
  updateFoodCategory,
  deleteFoodCategory,
} from "../controllers/foodCategoryController.js";
import { authorize } from "../middlewares/authorize.js";
import { authenticate } from "../middlewares/authenticate.js";

const foodCategoryRouter = express.Router();

foodCategoryRouter.get("/", getFoodCategories);
foodCategoryRouter
  .route("/")
  .post(authenticate, authorize("admin"), createFoodCategory);
foodCategoryRouter
  .route("/:foodCategoryId")
  .patch(authenticate, authorize("admin"), updateFoodCategory);
foodCategoryRouter
  .route("/:foodCategoryId")
  .delete(authenticate, authorize("admin"), deleteFoodCategory);

export default foodCategoryRouter;
