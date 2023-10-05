import express from "express";
import { test } from "../conntrollers/user.controller.js";
import { signin, signup } from "../conntrollers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
export default router;
