import express from "express";
import {
  getFood,
  getAllFood,
  createFood,
  updateFood,
  deleteFood,
} from "../controllers/foodController.js";
import { authorize } from "../middlewares/authorize.js";
import { authenticate } from "../middlewares/authenticate.js";
import { getFoodsGroupedByCategory } from "../controllers/foodGroupedController.js";

const foodRouter = express.Router();

foodRouter.route("/").post(authenticate, authorize("admin"), createFood);
foodRouter.get("/", getAllFood);
foodRouter.get("/grouped-foods", getFoodsGroupedByCategory);
foodRouter.get("/:foodId", getFood);
foodRouter
  .route("/:foodId")
  .patch(authenticate, authorize("admin"), updateFood);
foodRouter
  .route("/:foodId")
  .delete(authenticate, authorize("admin"), deleteFood);

export default foodRouter;
