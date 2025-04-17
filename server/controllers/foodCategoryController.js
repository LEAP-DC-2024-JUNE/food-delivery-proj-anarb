import FoodCategory from "../models/foodCategoryModel.js";

export const getFoodCategories = async (req, res) => {
  try {
    const categories = await FoodCategory.find({});

    if (!categories) {
      return res.status(404).json({
        message: "No categories found!",
      });
    }

    return res.status(200).json({
      data: { categories },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createFoodCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) {
      return res.status(400).json({
        message: "Category Name is required!",
      });
    }
    const category = await FoodCategory.create({ categoryName });

    res.status(201).json({
      data: { category },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateFoodCategory = async (req, res) => {
  try {
    const { foodCategoryId } = req.params;
    const { categoryName } = req.body;

    if (!categoryName) {
      return res.status(400).json({
        message: "Category name is required!",
      });
    }

    const foodCategory = await FoodCategory.findByIdAndUpdate(
      foodCategoryId,
      req.body
    );

    if (!foodCategory) {
      return res.status(404).json({
        message: "Food Category not found!",
      });
    }

    res.status(200).json({
      data: { foodCategory },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteFoodCategory = async (req, res) => {
  try {
    const { foodCategoryId } = req.params;
    const foodCategory = await FoodCategory.findByIdAndDelete(foodCategoryId);

    if (!foodCategory) {
      return res.status(404).json({
        message: "Food Category not found!",
      });
    }

    return res.status(204).json();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
