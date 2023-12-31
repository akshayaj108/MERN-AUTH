import bcryptjs from "bcryptjs";
import userModel from "../models/user.model.js";
import { errHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const user = await userModel.findOne({ email: email });
    console.log("user==", user);
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
  try {
    const validUser = await userModel.findOne({ email: req.body.email });

    if (!validUser) return next(errHandler(404, "User Email not found"));
    const isAuthenticate = await bcryptjs.compareSync(
      req.body.password,
      validUser.password
    );
    if (!isAuthenticate) return next(errHandler(401, "Wrong Credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password, ...rest } = validUser._doc;

    const expiryDate = new Date(Date.now() + 3600000); //1-hour
    return res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
export const google = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const randomPassword = Math.random().toString(36).slice(-8);
      //'0.tt5ceb8au7' slice(-8) '5ceb8au7'
      const hashPassword = bcryptjs.hashSync(randomPassword, 8);
      const newUser = new userModel({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 1000).toString(),
        email: req.body.email,
        password: hashPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(201)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
