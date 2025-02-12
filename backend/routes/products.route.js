import express from "express";
import {
  getAllProducts,
  getOneProduct,
  postOneProduct,
  updateOneProduct,
  deleteOneProduct,
} from "../controllers/products.contoller.js";

const productRouter = express.Router();

// GET all products
productRouter.get("/", getAllProducts);

// GET one product
productRouter.get("/:id", getOneProduct);

// POST a product
productRouter.post("/", postOneProduct);

// PUT / update a product
productRouter.patch("/:id", updateOneProduct);

// DELETE a product
productRouter.delete("/:id", deleteOneProduct);

export default productRouter;
