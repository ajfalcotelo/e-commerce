import Product from "../models/products.model.js";
import mongoose from "mongoose";

// @desc Fetch all products
// @route GET /api/products/
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    console.error("Something went wrong in GET all products", error);
    const err = new Error("Something went wrong in GET all products");
    err.status = 500;
    next(err);
  }
};

// @desc Fetch one product
// @route GET /api/products/:id
export const getOneProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("Invalid Id");
    err.status = 404;
    next(err);
  }

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.error("Something went wrong in GET one product", error);
    const err = new Error("Something went wrong in GET one product");
    err.status = 500;
    next(err);
  }
};

// @desc Insert one product
// @route POST /api/products/
export const postOneProduct = async (req, res, next) => {
  const { name, cost, imageUrl } = req.body;

  if (!name || !cost || !imageUrl) {
    let missingFields = [];
    if (!name) missingFields.push("name");
    if (!cost) missingFields.push("cost");
    if (!imageUrl) missingFields.push("imageUrl");

    const error = new Error(
      `Fill up all required fields: ${missingFields.join(", ")}`
    );
    error.status = 400;
    return next(error);
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log(error);
    const err = new Error("Internal Server Error: Failed to post product");
    err.status = 500;
    next(error);
  }
};

// @desc Update one product
// @route PATCH /api/products/:id
export const updateOneProduct = async (req, res, next) => {
  const update = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("Invalid Id");
    err.status = 404;
    next(err);
  }

  try {
    const matchedProduct = await Product.findByIdAndUpdate(id, update, {
      new: true,
    });
    res.status(200).json({ success: true, data: matchedProduct });
  } catch (error) {
    console.log(error);
    const err = new Error("Internal Server Error: Failed to update product");
    err.status = 500;
    next(err);
  }
};

// @desc Delete one product
// @route DELETE /api/products/:id
export const deleteOneProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("Invalid Id");
    err.status = 404;
    next(err);
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: `Deleted Product ${id}` });
  } catch (error) {
    console.log(error);
    const err = new Error("Internal Server Error: Failed to delete product");
    err.status = 500;
    next(err);
  }
};
