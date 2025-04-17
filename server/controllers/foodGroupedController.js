import Food from "../models/foodModel.js";
import FoodOrder from "../models/foodOrderModel.js";
import FoodCategory from "../models/foodCategoryModel.js";

export const getFoodsGroupedByCategory = async (req, res) => {
  try {
    const groupedFoods = await Food.aggregate([
      {
        $group: {
          _id: "$category",
          foods: { $push: "$$ROOT" },
        },
      },
    ]);
    console.log(groupedFoods);
    const result = await FoodCategory.populate(groupedFoods, {
      path: "_id",
      select: "categoryName",
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: "Failed!",
      message: error.message,
    });
  }
};

export const getFoodOrderItemsGrouped = async (req, res) => {
  try {
    const orders = await FoodOrder.aggregate([
      {
        $unwind: "$foodOrderItems",
      },
      {
        $lookup: {
          from: "foods",
          localField: "foodOrderItems.food",
          foreignField: "_id",
          as: "foodDetails",
        },
      },
      { $unwind: "$foodDetails" },

      // Lookup user info
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },

      {
        $addFields: {
          foodOrderItem: {
            _id: "$foodOrderItems._id", // Keep the original foodOrderItem _id
            quantity: "$foodOrderItems.quantity", // Include the quantity
            food: {
              _id: "$foodDetails._id", // Include food ID
              foodName: "$foodDetails.foodName", // Include food name
              price: "$foodDetails.price", // Include food price
              image: "$foodDetails.image", // Include food image
            },
          },
        },
      },

      // Group back by order ID
      {
        $group: {
          _id: "$_id",
          foodOrderItems: { $push: "$foodOrderItem" },
          totalQuantity: { $sum: "$foodOrderItems.quantity" },
          totalPrice: { $first: "$totalPrice" },
          createdAt: { $first: "$createdAt" },
          status: { $first: "$status" },
          user: { $first: "$userDetails" },
          address: { $first: "$userDetails.address" },
        },
      },

      // Final cleanup
      {
        $project: {
          _id: 1,
          foodOrderItems: 1,
          totalQuantity: 1,
          totalPrice: 1,
          createdAt: 1,
          status: 1,
          user: {
            _id: "$user._id",
            email: "$user.email",
            address: "$user.address",
          },
        },
      },
    ]);

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      status: "Failed!",
      message: error.message,
    });
  }
};
