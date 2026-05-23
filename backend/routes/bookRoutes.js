import express from "express";
import Book from "../models/Book.js";

import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  bestsellerBook,
  newarrivalsBook,
  searchBooks,
} from "../controllers/bookController.js";

const router = express.Router();

//GET all books
router.get("/", getBooks);

//BESTSELLERS
router.get("/bestsellers", bestsellerBook);

//NEW ARRIVALS
router.get("/new-arrivals", newarrivalsBook);

//Search book
router.get("/search/:query", searchBooks);

//GET single book
router.get("/:id", getBookById);

//CREATE book
router.post("/", createBook);

//UPDATE book
router.put("/:id", updateBook);

//DELETE book
router.delete("/:id", deleteBook);

export default router; 

