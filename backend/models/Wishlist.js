import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  wishlist: [
    {
      product_id: {
        type: Number,
        required: true,
        unique: true,
      },
      addedAt: {
        type: Date,
        default: Date.now(),
      },
      _id: false,
    },
  ],
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
