import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const PORT = 4000;

app.use(cors);

await mongoose
  .connect(
    "mongodb+srv://SohaibAshraf:college123456789@mern-cluster.q3fdpq5.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connection is successful"))
  .catch((error) => {
    console.log(error);
  });

app.post("/transaction", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("server is running at  http://localhost:4000");
});
