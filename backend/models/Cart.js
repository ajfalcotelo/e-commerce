import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      product_id: {
        type: Number,
        required: true,
        unique: true,
      },
      count: {
        type: Number,
        default: 1,
      },
      _id: false,
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
