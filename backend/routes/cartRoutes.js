import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/", protect, addToCart);

router.get("/", protect, getCartItems);

router.delete("/:id", protect, removeFromCart);

export default router;