import FoodOrder from "../models/foodOrderModel.js";

export const orderFood = async (req, res) => {
  try {
    const { user, foodOrderItems, totalPrice } = req.body;

    if (!user || !foodOrderItems?.length || !totalPrice) {
      return res.status(400).json({
        message: "Missing required order fields",
      });
    }

    const newOrder = await FoodOrder.create({
      user,
      foodOrderItems,
      totalPrice,
    });

    res.status(201).json({
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getFoodOrders = async (req, res) => {
  try {
    const orders = await FoodOrder.find()
      .populate("user", "name email")
      .populate("foodOrderItems.food", "foodName price");

    res.status(200).json({
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getFoodOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const userOrders = await FoodOrder.find({ user: userId })
      .populate("user", "name email address")
      .populate("foodOrderItems.food", "foodName price");

    res.status(200).json({
      orders: userOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateFoodOrder = async (req, res) => {
  const { foodOrderId } = req.params;
  const { status } = req.body;

  try {
    const updateFoodOrder = await FoodOrder.findByIdAndUpdate(
      foodOrderId,
      { status },
      { new: true }
    );

    if (!updateFoodOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      order: updateFoodOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateMultipleFoodOrders = async (req, res) => {
  const { orderIds, status } = req.body;

  if (!Array.isArray(orderIds) || !status) {
    return res.status(400).json({
      message: "Invalid request",
    });
  }
  try {
    const result = await FoodOrder.updateMany(
      { _id: { $in: orderIds } },
      { status }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        status: "Failed",
        message: "No orders were updated",
      });
    }

    res.status(200).json({
      message: `${result.modifiedCount} order(s) updated successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
