import { useState } from "react";
import axios from "axios";

export default function AddBook() {

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/books",
        formData
      );

      alert("Book Added Successfully");

      setFormData({
        title: "",
        author: "",
        price: "",
        category: "",
        image: "",
        description: "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        Add Book
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 max-w-[600px]"
      >

        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border"
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border h-[150px]"
        />

        <button
          className="
            px-8
            py-4
            bg-[#6366F1]
            text-white
            rounded-xl
          "
        >
          Add Book
        </button>

      </form>

    </div>
  );
}