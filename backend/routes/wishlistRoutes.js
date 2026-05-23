import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  addToWishlist,
  getWishlistBooks,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

//GET wishlist
router.get("/", protect, getWishlistBooks);

//POST wishlist
router.post("/", protect, addToWishlist);

//DELETE wishlist
router.delete("/:id", protect, removeFromWishlist);

export default router;