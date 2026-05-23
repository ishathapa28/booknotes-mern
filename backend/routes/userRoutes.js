import express from "express";
import User from "../models/User.js";
import Wishlist from "../models/Wishlist.js";
import Cart from "../models/Cart.js";

const router = express.Router();


// GET ALL USERS

router.get("/", async (req, res) => {

  try {

    const users = await User.find();

    const usersWithCounts = await Promise.all(

      users.map(async (user) => {

        const wishlistCount = await Wishlist.countDocuments({
          userId: user._id,
        });

        const cartCount = await Cart.countDocuments({
          userId: user._id,
        });

        return {
          ...user._doc,
          wishlistCount,
          cartCount,
        };

      })
    );

    res.json(usersWithCounts);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

export default router;