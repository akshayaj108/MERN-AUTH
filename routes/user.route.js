import express from "express";
import { test } from "../conntrollers/user.controller.js";
const router = express.Router();

router.get("/", test);
export default router;
