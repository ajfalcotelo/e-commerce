import Product from "../models/Product.js";
import connectDB from "../config/db.js";
import mongoose from "mongoose";

// INSERTS PRODUCTS FROM DUMMYJSON TO OUR DATABASE
// ONLY NEEDS TO RUN ONCE!
// no need to run again if dummyjson products are already in database

const importFakeStoreProducts = async () => {
  try {
    await connectDB(); // Ensure MongoDB is connected
    console.log("Connected to MongoDB.");

    const response = await fetch("https://dummyjson.com/products");
    const json = await response.json();

    const discounts = [10, 15, 20, 25, 30, 35, 40];

    // converts category to reflect categories in database
    // adds random discount with random value
    // add counts to rating
    const [...products] = json.products;
    const newProducts = products
      .filter(
        (product) =>
          !(
            product.category === "groceries" ||
            product.category === "sunglasses"
          )
      )
      .map(({ rating, thumbnail, images, category, ...props }, i) => {
        let newCategory;
        switch (category) {
          case "vehicle":
          case "motorcycle":
          case "sports-accessories":
            newCategory = "sports";
            break;
          case "skin-care":
          case "beauty":
          case "fragrances":
            newCategory = "beauty";
            break;
          case "womens-jewellery":
            newCategory = "jewelry";
            break;
          case "home-decoration":
          case "kitchen-accessories":
          case "furniture":
            newCategory = "home";
            break;
          case "laptops":
          case "smartphones":
          case "tablets":
            newCategory = "electronics";
            break;
          case "womens-bags":
          case "womens-dresses":
          case "womens-shoes":
          case "womens-watches":
          case "tops":
            newCategory = "women-fashion";
            break;
          case "mens-watches":
          case "mens-shoes":
          case "mens-shirts":
            newCategory = "men-fashion";
            break;
          default:
            newCategory = category;
        }

        const getRandomCount = () => Math.ceil(Math.random() * 700);

        const newRating = {
          rate: rating,
          count: getRandomCount(),
        };

        const applyRandomDiscount = () => {
          if (Math.random() <= 0.5) {
            const discountIndex = Math.floor(Math.random() * discounts.length);
            return discounts[discountIndex];
          } else {
            return null;
          }
        };

        images.unshift(thumbnail);

        return {
          ...props,
          image: images,
          rating: newRating,
          category: newCategory,
          discount: applyRandomDiscount(),
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

// node --env-file=.env .\scripts\importDummyProducts.js
