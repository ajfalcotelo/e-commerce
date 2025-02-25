import express from "express";
import {
  deleteProductById,
  getProductById,
  getProducts,
  postOneProduct,
  updateProductById,
} from "../controllers/productController.js";

const productRoutes = express.Router();

// GET all products
productRoutes.get("/", getProducts);

// GET one product
productRoutes.get("/:id", getProductById);

// POST a product
productRoutes.post("/", postOneProduct);

// PUT / update a product
productRoutes.patch("/:id", updateProductById);

// DELETE a product
productRoutes.delete("/:id", deleteProductById);

export default productRoutes;
