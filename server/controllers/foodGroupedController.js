import Food from "../models/foodModel.js";
import FoodOrder from "../models/foodOrderModel.js";
import FoodCategory from "../models/foodCategoryModel.js";

// export const getFoodsGroupedByCategory = async (req, res) => {
//   try {
//     const groupedFoods = await Food.aggregate([
//       {
//         $group: {
//           _id: "$category",
//           foods: { $push: "$$ROOT" },
//         },
//       },
//     ]);
//     const result = await FoodCategory.populate(groupedFoods, {
//       path: "_id",
//       select: "categoryName",
//     });

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

export const getFoodsGroupedByCategory = async (req, res) => {
  try {
    const allCategories = await FoodCategory.find({}, "_id categoryName");
    const allFoods = await Food.find({}).populate(
      "category",
      "_id categoryName"
    );

    const grouped = allCategories.map((category) => {
      const foods = allFoods.filter(
        (food) =>
          food.category &&
          food.category._id.toString() === category._id.toString()
      );
      return {
        _id: {
          _id: category._id,
          categoryName: category.categoryName,
        },
        foods,
      };
    });

    res.status(200).json(grouped);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

      {
        $group: {
          _id: "$_id",
          foodOrderItems: { $push: "$foodOrderItem" },
          totalQuantity: { $sum: "$foodOrderItems.quantity" },
          totalPrice: { $first: "$totalPrice" },
          createdAt: { $first: "$createdAt" },
          status: { $first: "$status" },
          user: { $first: "$userDetails" },
          // address: { $first: "$userDetails.address" },
          deliveryAddress: { $first: "$deliveryAddress" },
        },
      },

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
          deliveryAddress: 1,
        },
      },
    ]);

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
