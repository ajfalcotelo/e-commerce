import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "women-fashion",
        "men-fashion",
        "electronics",
        "jewelry",
        "beauty",
        "home",
        "sports",
        "lifestyle",
      ],
    },
    image: { type: [String], required: true },
    rating: {
      count: { type: Number, default: 0 },
      rate: {
        type: Number,
        default: 0,
        validate: {
          validator: function (value) {
            // If rate is greater than 0, count must be at least 1
            if (this.rating.count >= 1 && value >= 1) {
              return true;
            } else if (value === 0) {
              return true;
            } else {
              return false;
            }
          },
          message: "count must be at least 1 if rate is greater than 1",
        },
      },
    },
    discountRate: {
      type: Number,
      default: null,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
