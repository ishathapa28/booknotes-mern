import Wishlist from "../models/Wishlist.js";

// ADD TO WISHLIST
export const addToWishlist = async (req, res) => {
  try {
    const { bookId } = req.body;

    // check if already exists
    const exists = await Wishlist.findOne({ userId: req.user._id, book: bookId });

    if (exists) {
      return res.status(400).json({
        message: "Book already in wishlist",
      });
    }

    const wishlistItem = await Wishlist.create({
      userId: req.user._id,
      book: bookId,
    });

    res.status(201).json(wishlistItem);
} catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL WISHLIST BOOKS
export const getWishlistBooks = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user._id })
      .populate("book")
      .sort({ createdAt: -1 });

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REMOVE FROM WISHLIST
export const removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Wishlist.findOneAndDelete({
      _id: id,
      userId: req.user._id
    });

    if (!deletedItem) {
      return res.status(404).json({
        message: "Wishlist item not found",
      });
    }

    res.json({
      message: "Removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};