import express from "express";
import {
  deleteProductById,
  getProductById,
  getProducts,
  postOneProduct,
  patchProduct,
  putProduct,
} from "../controllers/productController.js";

const productRoutes = express.Router();

// GET all products
productRoutes.get("/", getProducts);

// GET one product
productRoutes.get("/:id", getProductById);

// POST a product
productRoutes.post("/", postOneProduct);

// PATCH a product
productRoutes.patch("/:id", patchProduct);

// PUT a product
productRoutes.put("/:id", putProduct);

// DELETE a product
productRoutes.delete("/:id", deleteProductById);

export default productRoutes;
