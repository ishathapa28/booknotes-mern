import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createReview, getBookReviews, deleteReview } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", protect, createReview);

router.get("/:bookId", getBookReviews);

router.delete("/:id", protect, deleteReview);

export default router;