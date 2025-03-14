import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import {
  deleteCart,
  getCart,
  patchCart,
  postCart,
} from "../controllers/cartController.js";

const cartRoutes = express.Router();

// middlewares
cartRoutes.use(requireAuth);

// GET cart by user
cartRoutes.get("/", getCart);

// POST cart by user
cartRoutes.post("/", postCart);

// PATCH cart by user
cartRoutes.patch("/", patchCart);

// DELETE cart
cartRoutes.delete("/", deleteCart);

export default cartRoutes;
