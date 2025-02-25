import express from "express";
import { userLogIn, userSignUp } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/login", userLogIn);

userRoutes.post("/signup", userSignUp);

export default userRoutes;
