import express from "express";
import { test } from "../conntrollers/user.controller.js";
import { signup } from "../conntrollers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup)
export default router;