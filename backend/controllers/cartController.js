import Cart from "../models/Cart.js";


// ADD TO CART
export const addToCart = async (req, res) => {
  try {

    const { bookId } = req.body;

    // check if already exists
    const existingBook = await Cart.findOne({
      userId: req.user._id,
      book: bookId,
    });

    // if already exists increase quantity
    if (existingBook) {

      existingBook.quantity += 1;

      await existingBook.save();

      return res.json(existingBook);
    }

    // create new cart item
    const cartItem = await Cart.create({
      userId: req.user._id,
      book: bookId,
      quantity: 1,
    });

    res.status(201).json(cartItem);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET CART ITEMS
export const getCartItems = async (req, res) => {
  try {

    const cartItems = await Cart.find({ userId: req.user._id })
      .populate("book")
      .sort({ createdAt: -1 });

    res.json(cartItems);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// REMOVE FROM CART
export const removeFromCart = async (req, res) => {
  try {

    const deletedItem = await Cart.findByIdAndDelete(
      req.params.id
    );

    if (!deletedItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    res.json({
      message: "Item removed from cart",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};