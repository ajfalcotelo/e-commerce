import express from "express";
import connectDB from "./config/db.js";
import productRouter from "./routes/products.route.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use("/api/products", productRouter);

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server connected at http://localhost:${PORT}`);
});
