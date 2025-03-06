import Product from "../models/Product.js";
import connectDB from "../config/db.js";
import mongoose from "mongoose";

// INSERTS PRODUCTS FROM FAKESTOREAPI TO OUR DATABASE
// ONLY NEEDS TO RUN ONCE!
// no need to run again if fakestoreapi products are already in database

const importProducts = async () => {
  try {
    await connectDB(); // Ensure MongoDB is connected
    console.log("Connected to MongoDB.");

    Product.collection.drop();

    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    const discounts = [10, 15, 20, 25, 30, 35, 40];

    // removes id, in favor of _id
    // converts image string into a string array to allow more image sources
    // adds discount key with random value
    // change jewelery to jewelry
    const newProducts = products.map(({ id, image, category, ...props }) => {
      const newCategory = category === "jewelery" ? "jewelry" : category;
      const randomDiscount =
        discounts[Math.floor(Math.random() * discounts.length)];
      return {
        ...props,
        category: newCategory,
        image: [image],
        discount: randomDiscount,
      };
    });

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
