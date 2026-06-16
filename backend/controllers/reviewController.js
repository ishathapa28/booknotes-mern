import Review from "../models/Review.js";
import Book from "../models/Book.js";

export const createReview = async (req,res) => {
    try {
        const {
            bookId, rating, comment,
        } = req.body;

        const existingReview = await Review.findOne({
            user: req.user._id,
            book: bookId,
        });

        if (existingReview) {
            return res.status(400).json({
                message: "You have already reviewed this book",
            });
        }

        const review = await Review.create({
            book: bookId,
            user: req.user._id,
            userName: req.user.name,
            rating,
            comment,
        });

        const reviews = await Review.find({ book: bookId });

        const averageRating = reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

        await Book.findByIdAndUpdate(bookId, {
        rating: averageRating.toFixed(1),
        reviewCount: reviews.length,
        });

        res.status(201).json(review);
    }catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getBookReviews = async (req,res) => {
    try {
        const reviews = await Review.find({
            book: req.params.bookId,
        }).sort({createdAt: -1});

        res.json(reviews);
    }catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                message: "Review not found",
            });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You can delete only your own review",
            });
        }

        await review.deleteOne();

        res.json({
            message: "Review deleted successfully",
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};