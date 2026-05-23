import Book from "../models/Book.js";


// GET ALL BOOKS
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET SINGLE BOOK
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    res.status(404).json({ message: "Book not found" });
  }
};


// CREATE BOOK
export const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// UPDATE BOOK
export const updateBook = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// DELETE BOOK
export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// BESTSELLERS
export const bestsellerBook = async(req,res) => {
  try{
    const books = await Book.find({ bestseller: true });
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// NEW ARRIVALS
export const newarrivalsBook = async(req,res) => {
  try{
    const books = await Book.find()
      .sort({_id:-1}) //newest first
      .limit(20); //optional

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//SEARCH BOOKS
export const searchBooks = async (req, res) => {

  try {

    const query = req.params.query;

    const books = await Book.find({
      title: {
        $regex: query,
        $options: "i",
      },
    }).limit(8);

    res.json(books);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

 