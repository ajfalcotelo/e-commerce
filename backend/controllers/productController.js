import Product from "../models/Product.js";

// helper functions
const checkIdExists = async (id) => {
  try {
    const matchedId = await Product.findById(id);
    console.log("id: ", matchedId);

    if (!matchedId) {
      const error = new Error("Id does not exist");
      error.status = 400;
      return error;
    }
  } catch (error) {
    console.error(error);
    const err = new Error("Failed to check id");
    return err;
  }
};

// @desc Fetch all products
// @route GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    const err = new Error("Failed to GET all products");
    err.status = 500;
    return next(err);
  }
};

// @desc Fetch one product
// @route GET /api/products/:product_id
export const getProductById = async (req, res, next) => {
  const { id } = req.params;
  const error = await checkIdExists(id);
  try {
    if (error) {
      return next(error);
    }
    const product = await Product.findById(id);
    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    const err = new Error("Failed to GET one product");
    return next(err);
  }
};

// @desc Insert one or more products
// @route POST /api/products
export const postOneProduct = async (req, res, next) => {
  const requiredFields = [
    "title",
    "price",
    "description",
    "category",
    "image",
    "rating",
  ];

  // USED BY BOTH FUNCTIONS
  const missingFieldsError = (array) => {
    if (array.length) {
      const error = new Error(
        `Fill up all required fields: ${array.join(", ")}`
      );
      error.status = 400;
      return next(error);
    }
  };

  // WILL TRIGGER WHEN req.body IS A SINGLE OBJECT
  const postSingle = async () => {
    const { product_id, title, price, description, category, image, rating } =
      req.body;
    try {
      const missingFields = requiredFields.filter((field) => !req.body[field]);
      missingFieldsError(missingFields);

      return await Product.create({
        product_id,
        title,
        price,
        description,
        category,
        image,
        rating,
      });
    } catch (error) {
      console.log(error);
      const err = new Error("Failed to POST one product");
      return next(err);
    }
  };

  // WILL TRIGGER WHEN req.body IS AN ARRAY OF OBJECTS
  const postMany = async () => {
    const missingFieldsArray = req.body.map((el, i) => {
      const missingFieldsPerIndex = requiredFields.filter(
        (field) => !el[field]
      );
      if (missingFields) {
        return [missingFieldsPerIndex, i].join(" in index ");
      }
    });
    missingFieldsError(missingFieldsArray);

    try {
      return await Product.insertMany(req.body);
    } catch (error) {
      console.log(error);
      const err = new Error("Failed to POST multiple products");
      return next(err);
    }
  };

  // MAIN LOGIC
  try {
    const newProduct = Array.isArray(req.body)
      ? await postMany()
      : await postSingle();

    res.status(201).json({ ...newProduct });
  } catch (error) {
    console.log(error);
    const err = new Error("Failed to POST product");
    return next(err);
  }
};

// @desc Update whole of one product
// @route PUT /api/products/:id
export const putProduct = async (req, res, next) => {
  const requiredFields = [
    "title",
    "price",
    "description",
    "category",
    "image",
    "rating",
  ];

  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length) {
    const error = new Error(
      `Fill up all required fields: ${missingFields.join(", ")}`
    );
    error.status = 400;
    return next(error);
  }

  const { product_id, title, price, description, category, image, rating } =
    req.body;
  const { id } = req.params;
  const error = await checkIdExists(id);

  try {
    if (error) {
      return next(error);
    }
    const oldProduct = await Product.findById(id);
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { product_id, title, price, description, category, image, rating },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ "old product": oldProduct, "updated product": updatedProduct });
  } catch (error) {
    console.error(error);
    const err = new Error("Failed to PUT product");
    return next(err);
  }
};

// @desc Update parts of one product
// @route PATCH /api/products/:id
export const patchProduct = async (req, res, next) => {
  const update = req.body;
  const { id } = req.params;
  const error = await checkIdExists(id);

  try {
    if (error) {
      return next(error);
    }
    const oldProduct = await Product.findById(id);
    const updatedProduct = await Product.findByIdAndUpdate(id, update, {
      new: true,
    });
    res
      .status(200)
      .json({ "old product": oldProduct, "updated product": updatedProduct });
  } catch (error) {
    console.error(error);
    const err = new Error("Failed to PATCH product");
    return next(err);
  }
};

// @desc Delete one product
// @route DELETE /api/products/:id
export const deleteProductById = async (req, res, next) => {
  const { id } = req.params;
  const error = await checkIdExists(id);

  try {
    if (error) {
      return next(error);
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json({ "deleted product": deletedProduct });
  } catch (error) {
    console.log(error);
    const err = new Error("Failed to DELETE product");
    err.status = 500;
    next(err);
  }
};
