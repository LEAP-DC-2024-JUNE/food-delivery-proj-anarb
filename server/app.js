import express from "express";
import connectDb from "./configs/mongoDbConfig.js";
import { ObjectId } from "mongodb";
import cors from "cors";

const server = express();
const PORT = 3001;

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({ message: "Hello from Render!" });
});

server.post("/create-user", async (req, res) => {
  let db = await connectDb();
  try {
    const { name, age, phoneNumber } = req.body;

    if (!name || !age || !phoneNumber) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }
    let result = await db.insertOne({
      name,
      age,
      phoneNumber,
    });
    res.json({ success: true, result });
  } catch (error) {
    res.json({ success: false, error });
  }
});

server.get("/get-all-users", async (req, res) => {
  let db = await connectDb();
  try {
    let result = await db.find().toArray();
    res.json({ success: true, result });
  } catch (error) {
    res.json({ success: false, error });
  }
});

server.get("/get-user", async (req, res) => {
  let db = await connectDb();
  try {
    let result = await db.findOne({
      _id: new ObjectId("6799116c6ee00e2a780bb9c2"),
    });
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
});

server.put("/update-user", async (req, res) => {
  let db = await connectDb();
  const { id, name, age, phoneNumber } = req.body;
  try {
    let result = await db.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      { $set: { name, age, phoneNumber } }
    );
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
});

server.delete("/delete-user", async (req, res) => {
  let db = await connectDb();
  try {
    let result = await db.deleteOne({
      _id: new ObjectId("6798fcebedde1dd306c5da2e"),
    });
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
