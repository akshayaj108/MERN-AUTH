import bcryptjs from "bcryptjs";
import userModel from "../models/user.model.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await userModel.find({ email });
    if (user) {
      return res.status(409).json("Email already in use");
    }
    const hashPassword = bcryptjs.hashSync(password, 8);
    const doc = new userModel({
      username,
      email,
      password: hashPassword,
    });

    const result = await doc.save();
    res.status(201).json({ message: "User Register successfully", result });
  } catch (error) {
    next(error);
  }
};
