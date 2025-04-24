import express from "express";
import {
  orderFood,
  getFoodOrders,
  getFoodOrdersByUserId,
  updateFoodOrder,
  updateMultipleFoodOrders,
} from "../controllers/orderController.js";
import { authorize } from "../middlewares/authorize.js";
import { authenticate } from "../middlewares/authenticate.js";
import { getFoodOrderItemsGrouped } from "../controllers/foodGroupedController.js";

const foodOrderRouter = express.Router();

foodOrderRouter.post("/", authenticate, orderFood);
foodOrderRouter.route("/").get(authenticate, authorize("admin"), getFoodOrders);
foodOrderRouter
  .route("/grouped")
  .get(authenticate, authorize("admin"), getFoodOrderItemsGrouped);
foodOrderRouter
  .route("/update-status")
  .patch(authenticate, authorize("admin"), updateMultipleFoodOrders);
foodOrderRouter.get("/:userId", authenticate, getFoodOrdersByUserId);
foodOrderRouter
  .route("/:foodOrderId")
  .patch(authenticate, authorize("admin"), updateFoodOrder);
export default foodOrderRouter;

// foodOrderRouter.get("/", getFoodOrders);
// foodOrderRouter.get("/grouped", getFoodOrderItemsGrouped);
// foodOrderRouter.patch("/update-status", updateMultipleFoodOrders);
// foodOrderRouter.patch("/:foodOrderId", updateFoodOrder);
