import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const PORT = 4000;
import TransactionsApi from "./routes/TransactionsApi.js";
import AuthApi from "./routes/AuthApi.js"
import connect from "./database/mongoDB.js";

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/transaction", TransactionsApi);
app.use("/auth",  AuthApi);

await connect();

app.listen(PORT, () => {
  console.log("server is running at  http://localhost:4000");
});
