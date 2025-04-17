import express from "express";
import {
  orderFood,
  getFoodOrders,
  getFoodOrdersByUserId,
  updateFoodOrder,
  updateMultipleFoodOrders,
} from "../controllers/orderController.js";
import { getFoodOrderItemsGrouped } from "../controllers/foodGroupedController.js";

const foodOrderRouter = express.Router();

foodOrderRouter.post("/", orderFood);
foodOrderRouter.get("/", getFoodOrders);
foodOrderRouter.get("/grouped", getFoodOrderItemsGrouped);
foodOrderRouter.patch("/update-status", updateMultipleFoodOrders);
foodOrderRouter.get("/:userId", getFoodOrdersByUserId);
foodOrderRouter.patch("/:foodOrderId", updateFoodOrder);

export default foodOrderRouter;
