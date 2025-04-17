import express from "express";
import connectDb from "./configs/mongoDbConfig.js";
import cors from "cors";
import foodCategoryRouter from "./routers/foodCategoryRouter.js";
import foodRouter from "./routers/foodRouter.js";
import authRouter from "./routers/authRouter.js";
import foodOrderRouter from "./routers/foodOrderRouter.js";

const server = express();
const PORT = 3001;

server.use(express.json());
server.use(cors());
connectDb();

server.use("/food-category", foodCategoryRouter);
server.use("/food", foodRouter);
server.use("/auth", authRouter);
server.use("/food-order", foodOrderRouter);

server.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({ message: "Hello from Render!" });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
