import express from "express";

const server = express();
const PORT = 3001;

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
