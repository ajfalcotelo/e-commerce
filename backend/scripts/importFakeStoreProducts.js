import Product from "../models/Product.js";
import connectDB from "../config/db.js";
import mongoose from "mongoose";

// INSERTS PRODUCTS FROM FAKESTOREAPI TO OUR DATABASE
// ONLY NEEDS TO RUN ONCE!
// no need to run again if fakestoreapi products are already in database

const importFakeStoreProducts = async () => {
  try {
    await connectDB(); // Ensure MongoDB is connected
    console.log("Connected to MongoDB.");

    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    const discounts = [10, 15, 20, 25, 30, 35, 40];

    // converts image string into a string array to allow more image sources
    // adds random discount with random value
    // change jewelery to jewelry
    const newProducts = products.map(({ image, category, ...props }, i) => {
      let newCategory;
      switch (category) {
        case "men's clothing":
          newCategory = "men-fashion";
          break;
        case "women's clothing":
          newCategory = "women-fashion";
          break;
        case "jewelery":
          newCategory = "jewelry";
          break;
        default:
          newCategory = category;
          break;
      }

      const applyDiscountRateRandom = () => {
        if (Math.random() <= 0.25) {
          const discountIndex = Math.floor(Math.random() * discounts.length);
          return discounts[discountIndex];
        }
      };

      const getRandomCount = () => Math.ceil(Math.random() * 700);

      return {
        ...props,
        category: newCategory,
        image: [image],
        discountRate: applyDiscountRateRandom(),
        stock: getRandomCount(),
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

importFakeStoreProducts();

// node --env-file=.env .\scripts\importFakeStoreProducts.js
