// import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// const MONGO_URL = process.env.MONGO_URL;

// const connectDb = async () => {
//   try {
//     await mongoose.connect(MONGO_URL);
//     console.log("Connected to MONGO DB");
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDb;

import { MongoClient } from "mongodb";
const connectDB = async () => {
  const MONGO_URL = process.env.MONGO_URL;
  // const client = new MongoClient(
  //   "mongodb+srv://duluuf:LM7miFmm6q0eg0Qa@cluster1.pyncrqd.mongodb.net/"
  // );
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
  // return connection.db("Anar").collection("users");
};
export default connectDB;
