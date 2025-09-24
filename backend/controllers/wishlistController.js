import Wishlist from '../models/Wishlist.js';
import mongoose from 'mongoose';

// @desc GET user wishlist
// @route /api/wishlist
export const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user_id: req.user }).select(
      'wishlist'
    );

    res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    const err = new Error('Failed to GET wishlist');
    next(err);
  }
};

// @desc POST user wishlist
// @route /api/wishlist
export const postWishlist = async (req, res, next) => {
  const { wishlist } = req.body;

  if (wishlist.length <= 0) {
    const error = new Error('Wishlist must contain atleast one product');
    error.status = 400;
    return next(error);
  }

  try {
    const newWishlist = await Wishlist.create({
      user_id: req.user,
      wishlist,
    });
    res.status(200).json({ wishlist: newWishlist });
  } catch (error) {
    console.error(error);
    if (error instanceof mongoose.Error.ValidationError) {
      const err = new Error(error.message);
      return next(err);
    }
    const err = new Error(error.message);
    return next(err);
  }
};

// @desc PATCH user wishlist
// @route PATCH /api/wishlist
export const patchWishlist = async (req, res, next) => {
  try {
    const cart = await Wishlist.findOneAndUpdate(
      { user_id: req.user },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    if (error instanceof mongoose.Error.ValidationError) {
      const err = new Error(error.message);
      return next(err);
    }
    const err = new Error('Failed to update wishlist');
    return next(err);
  }
};

// @desc DELETE user wishlist
// @route DELETE /api/wishlist
export const deleteWishlist = async (req, res, next) => {
  try {
    const deletedWishlist = await Wishlist.findOneAndDelete({
      user_id: req.user,
    });
    res.status(200).json(deletedWishlist);
  } catch (error) {
    console.error(error);
    const err = new Error('Failed to delete wishlist');
    return next(err);
  }
};
