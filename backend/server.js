import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import router from "./routes/product.route.js";

// dotenv helps to view the MONGO_URI IN .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware that allows to accept json data in req.body
app.use(express.json());

app.use("/api/products", router);

// console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started well at http://localhost:5000");
});

// npm run dev
