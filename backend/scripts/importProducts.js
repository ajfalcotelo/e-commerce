import axios from "axios";
import Product from "../models/Product.js";
import connectDB from "../config/db.js";
import mongoose from "mongoose";

// INSERTS PRODUCTS FROM FAKESTOREAPI TO OUR DATABASE
// ONLY NEEDS TO RUN ONCE!
// no need to run again if fakestoreapi products are already in database

const importProducts = async () => {
  try {
    connectDB(); // Ensure MongoDB is connected
    console.log("Connected to MongoDB.");

    const response = await axios.get("https://fakestoreapi.com/products");
    const products = response.data;

    // removes id, in favor of _id
    // converts image string into a string array to allow more image sources
    const newProducts = products.map(({ id, image, ...props }) => ({
      ...props,
      image: [image],
    }));

    await Product.insertMany(newProducts);
    console.log("Products Imported Successfully!");
  } catch (error) {
    console.error("Error importing products:", error);
  } finally {
    mongoose.connection.close(); // Close connection properly
    console.log("MongoDB Connection Closed.");
  }
};

importProducts();

// node --env-file=.env .\scripts\importProducts.js
