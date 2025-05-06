import express from "express";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

const app = express();
const PORT = process.env.PORT;

// Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());
app.use(cors());

// Routes
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/user", userRoutes);

// Error Handler Middleware
// something wrong with notfound, better solution may require
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server connected at http://localhost:${PORT}`);
});
