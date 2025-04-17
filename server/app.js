import express from "express";
import cors from "cors";
import foodRouter from "./routers/foodRouter.js";
import authRouter from "./routers/authRouter.js";
import connectDb from "./configs/mongoDbConfig.js";
import foodOrderRouter from "./routers/foodOrderRouter.js";
import foodCategoryRouter from "./routers/foodCategoryRouter.js";

const server = express();
const PORT = 3001;

server.use(express.json());
server.use(cors());
connectDb();

server.use("/food", foodRouter);
server.use("/auth", authRouter);
server.use("/food-order", foodOrderRouter);
server.use("/food-category", foodCategoryRouter);

server.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({ message: "Hello from Render!" });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
