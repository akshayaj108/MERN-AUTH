import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "../routes/user.route.js";
dotenv.config();

mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("DB is connected"))
  .catch((e) => console.log("DB Server Down"));
app.use("/api/user", userRoutes);
app.listen(3000, () => {
  console.log("SErver is started");
});
