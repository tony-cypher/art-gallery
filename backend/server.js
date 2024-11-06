import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

// dotenv helps to view the MONGO_URI IN .env file
dotenv.config();

const app = express();

// middleware that allows to accept json data in req.body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ready now");
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in fettching products: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Create Product
app.post("/api/products", async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(404)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Delete Product
app.delete("/api/product/:id/delete", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found" });
  }
});

// console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log("Server started well at http://localhost:5000");
});

// npm run dev
