import express from "express";
import {
  deleteWishlist,
  getWishlist,
  patchWishlist,
  postWishlist,
} from "../controllers/wishlistController.js";
import requireAuth from "../middlewares/requireAuth.js";

const wishlistRoutes = express.Router();

// auth middleware
wishlistRoutes.use(requireAuth);

// GET user wishlist
wishlistRoutes.get("/", getWishlist);

// POST user wishlist
wishlistRoutes.post("/", postWishlist);

// PATCH user wishlist
wishlistRoutes.patch("/", patchWishlist);

// DELETE user wishlist
wishlistRoutes.delete("/", deleteWishlist);

export default wishlistRoutes;
