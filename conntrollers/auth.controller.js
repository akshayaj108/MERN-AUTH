import bcryptjs from "bcryptjs";
import userModel from "../models/user.model.js";
import { errHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await userModel.findOne({ email });
    if (!validUser) return next(errHandler(404, "User Email not found"));
    const isAuthenticate = await bcryptjs.compareSync(
      password,
      isValidUser.password
    );
    if (!isAuthenticate) return next(errHandler(401, "Wrong Credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); //1-hour
    return res
      .cookie("jwt toke", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({ message: "Successfully Logged In", rest });
  } catch (error) {
    next(error);
  }
};
