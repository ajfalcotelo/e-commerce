import mongoose from 'mongoose';
import Cart from '../models/Cart.js';

// @desc GET cart by user
// @route GET /api/cart
export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user });

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    const err = new Error('Failed to find cart');
    return next(err);
  }
};

// @desc POST cart by user
// @route POST /api/cart
export const postCart = async (req, res, next) => {
  const { products } = req.body;

  if (products.length <= 0) {
    const error = new Error('Cart must contain atleast one product');
    error.status = 400;
    return next(error);
  }

  try {
    const cart = await Cart.create({ user_id: req.user, products });
    res.status(200).json(cart);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const err = new Error(error.message);
      return next(err);
    }
    console.log(error);
    const err = new Error(error.message);
    return next(err);
  }
};

// @desc PATCH cart by user
// @route PATCH /api/cart
export const patchCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndUpdate({ user_id: req.user }, req.body, {
      new: true,
    });
    res.status(200).json(cart);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const err = new Error(error.message);
      return next(err);
    }
    console.log(error);
    const err = new Error('Failed to update cart');
    return next(err);
  }
};

// @desc DELETE cart
// @route DELETE /api/cart
export const deleteCart = async (req, res, next) => {
  try {
    const deletedCart = await Cart.findOneAndDelete({ user_id: req.user });
    res.status(200).json(deletedCart);
  } catch (error) {
    console.error(error);
    const err = new Error('Failed to delete cart');
    return next(err);
  }
};
