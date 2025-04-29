import mongoose from "mongoose";

const foodOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    foodOrderItems: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "delivered", "canceled"],
      default: "pending",
    },
    deliveryAddress: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const FoodOrder = mongoose.model("FoodOrder", foodOrderSchema);
export default FoodOrder;
