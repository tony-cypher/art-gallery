import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// dotenv helps to view the MONGO_URI IN .env file
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready now");
});

// console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log("Server started well at http://localhost:5000");
});

// npm run dev
