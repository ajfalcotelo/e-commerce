import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  wishlist: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now(),
      },
      _id: false,
    },
  ],
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
