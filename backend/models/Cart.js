import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
      product: {
        type: Object,
        required: true,
      },
      count: {
        type: Number,
        default: 1,
      },
      _id: false,
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
