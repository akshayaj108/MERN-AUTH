import bcryptjs from "bcryptjs";
import userModel from "../models/user.model";

export const signup = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 8);
  const doc = new userModel({
    username,
    email,
    password: hashPassword,
  });
  try {
    const result = await doc.save();
    res.status(201).json({ message: "User Register successfully", result });
  } catch (error) {
    next(error);
  }
};
