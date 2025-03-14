import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

export const userLogIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

export const userSignUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);

    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
