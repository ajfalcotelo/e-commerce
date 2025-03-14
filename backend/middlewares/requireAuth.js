import jwt from "jsonwebtoken";
import User from "../models/User.js";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const error = new Error("Authorization token required");
    error.status = 401;
    return next(error);
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(_id).select("_id");
    next();
  } catch (error) {
    console.error(error);
    const err = new Error("Request is not authorized");
    err.status = 401;
    next(err);
  }
};

export default requireAuth;
