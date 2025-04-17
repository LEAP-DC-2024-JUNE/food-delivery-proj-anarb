import express from "express";
import {
  createFood,
  deleteFood,
  getAllFood,
  getFood,
  updateFood,
} from "../controllers/foodController.js";
import { getFoodsGroupedByCategory } from "../controllers/foodGroupedController.js";

const foodRouter = express.Router();

foodRouter.post("/", createFood);
foodRouter.get("/", getAllFood);
foodRouter.get("/grouped-foods", getFoodsGroupedByCategory);
foodRouter.get("/:foodId", getFood);
foodRouter.patch("/:foodId", updateFood);
foodRouter.delete("/:foodId", deleteFood);

export default foodRouter;
