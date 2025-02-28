import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: [String], required: true },
    rating: {
      count: { type: Number, default: 0 },
      rate: {
        type: Number,
        default: 0,
        validate: {
          validator: function (value) {
            // If rate is greater than 0, count must be at least 1
            if (this.count >= 1 && value >= 1) {
              return false;
            } else if (value === 0) {
              return false;
            } else {
              return true;
            }
          },
          message: "count must be at least 1 if rate exists",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
