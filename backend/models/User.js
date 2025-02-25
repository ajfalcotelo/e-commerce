import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// statics
userSchema.statics.signup = async function (name, email, password) {
  const exist = await this.findOne({ email });

  if (!name || !email || !password) {
    throw new Error("All fields must be filled");
  }
  if (exist) {
    throw Error("Email already in use");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (
    !validator.isStrongPassword(password, {
      minSymbols: 0,
      minUppercase: 0,
      minLowercase: 0,
    })
  ) {
    throw new Error("Password too short. Mininum length must be 8");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (!email || !password) {
    throw new Error("All fields must be filled");
  }
  if (!user) {
    throw new Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
