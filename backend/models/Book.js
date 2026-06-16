import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  stock: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  bestseller: {
  type: Boolean,
  default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Book", bookSchema);

