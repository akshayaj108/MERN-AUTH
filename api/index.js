import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "../routes/user.route.js";
import authRoutes from "../routes/auth.route.js";
dotenv.config();

mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("DB is connected"))
  .catch((e) => console.log("DB Server Down"));
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
  });
});
app.listen(3000, () => {
  console.log("SErver is started");
});
