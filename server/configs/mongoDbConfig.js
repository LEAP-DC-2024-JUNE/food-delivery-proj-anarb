import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const MONGO_URL = process.env.MONGO_URL;
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
