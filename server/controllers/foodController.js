import Food from "../models/foodModel.js";
import FoodCategory from "../models/foodCategoryModel.js";

export const createFood = async (req, res) => {
  try {
    const { foodName, price, ingredients, image, category } = req.body;

    if (!foodName || !price || !category || !ingredients || !image) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const food = await Food.create(req.body);

    res.status(201).json({
      data: { food },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllFood = async (req, res) => {
  try {
    const foods = await Food.find({}).populate("category");

    if (!foods || foods.length === 0) {
      return res.status(404).json({
        message: "No foods found!",
      });
    }

    return res.status(200).json({
      data: { foods },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getFood = async (req, res) => {
  try {
    const { foodId } = req.params;
    const food = await Food.findById(foodId);

    if (!food) {
      return res.status(404).json({
        message: "Food not found!",
      });
    }

    return res.status(200).json({
      data: { food },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateFood = async (req, res) => {
  try {
    const { foodId } = req.params;
    const { foodName, price, ingredients, image, category } = req.body;

    // if (!foodName || !price || !ingredients || !image || !category) {
    //   return res.status(400).json({
    //     message: "Required fields",
    //   });
    // }

    const food = await Food.findByIdAndUpdate(foodId, req.body, { new: true });

    if (!food) {
      return res.status(404).json({
        message: "Food not found!",
      });
    }

    res.status(200).json({
      data: { food },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const { foodId } = req.params;
    const food = await Food.findByIdAndDelete(foodId);

    if (!food) {
      return res.status(404).json({
        message: "Food not found!",
      });
    }

    return res.status(204).json();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

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
    const result = await FoodCategory.populate(groupedFoods, {
      path: "_id",
      select: "categoryName",
    });

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "No foods grouped by category found!",
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
