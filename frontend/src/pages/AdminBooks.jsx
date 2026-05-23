import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBooks() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/books`
      );

      setBooks(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/books/${id}`
      );

      setBooks((prev) =>
        prev.filter((book) => book._id !== id)
      );

    } catch (error) {
      console.log(error);
    }
  };

  const [editingBook, setEditingBook] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = (book) => {

    setEditingBook(book);

    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      price: book.price,
    });
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5000/api/books/${editingBook._id}`,
        formData
      );

      setBooks((prev) =>
        prev.map((book) =>
          book._id === editingBook._id
            ? res.data
            : book
        )
      );

      setEditingBook(null);

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="px-2 sm:px-4 md:px-0">

      <h1 className="
        text-2xl sm:text-3xl 
        font-bold 
        mb-6 sm:mb-8"
      >
        Manage Books
      </h1>

      <div className="
        overflow-x-auto 
        bg-white 
        border 
        rounded-2xl 
        shadow-sm"
      >

        <table className="w-full min-w-[850px]">

          <thead className="bg-gray-100 text-[#1C2024]">

            <tr className="text-left">
              <th className="p-4 sm:p-5 text-sm sm:text-lg font-bold">S.N.</th>
              <th className="p-4 sm:p-5 text-sm sm:text-lg font-bold">Book Name</th>
              <th className="p-4 sm:p-5 text-sm sm:text-lg font-bold">Author</th>
              <th className="p-4 sm:p-5 text-sm sm:text-lg font-bold">Category</th>
              <th className="p-4 sm:p-5 text-sm sm:text-lg font-bold">Price</th>
              <th className="p-4 sm:p-5 text-sm sm:text-lg font-bold">Actions</th>
            </tr>

          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="border-t hover:bg-gray-50 transition">
                <td className="p-4 sm:p-5 text-[#1C2024]">
                  {index + 1}
                </td>

                <td className="
                  p-4 sm:p-5 
                  flex items-center 
                  gap-3 sm:gap-4 
                  text-[#1C2024] 
                  text-sm sm:text-base 
                  font-medium"
                >
                  {book.title}
                </td>

                <td className="p-4 sm:p-5 text-[#1C2024] text-sm sm:text-base">
                  {book.author}
                </td>

                <td className="p-4 sm:p-5 text-[#1C2024] text-sm sm:text-base">
                  {book.category}
                </td>

                <td className="p-4 sm:p-5 text-[#1C2024] text-sm sm:text-base">
                  ₹{book.price}
                </td>

                <td className="p-4 sm:p-5">

                  <div className="flex flex-row gap-2 sm:gap-3">
                    <button
                      onClick={() => handleEditClick(book)}
                      className="
                        px-3 sm:px-4 py-2
                        bg-blue-100
                        text-blue-600
                        rounded-lg
                        text-sm
                        hover:bg-blue-200
                        transition
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(book._id)
                      }
                      className="
                        px-3 sm:px-4 py-2
                        bg-red-100
                        text-red-600
                        rounded-lg
                        text-sm
                        hover:bg-blue-200
                        transition
                      "
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>
        </table>

      </div>

      {/* EDIT MODEL HERE */}

      {
        editingBook && (

          <div
            className="
              fixed inset-0
              bg-black/40
              flex items-center justify-center
              z-50
              px-4
            "
          >

            <form
              onSubmit={handleUpdateBook}
              className="
                bg-white
                w-full
                max-w-[500px]
                rounded-2xl
                p-6
                space-y-4
              "
            >

              <h2 className="text-2xl font-bold">
                Edit Book
              </h2>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Book Title"
                className="
                  w-full
                  border
                  p-3
                  rounded-xl
                  outline-none
                "
              />

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author"
                className="
                  w-full
                  border
                  p-3
                  rounded-xl
                  outline-none
                "
              />

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="
                  w-full
                  border
                  p-3
                  rounded-xl
                  outline-none
                "
              />

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="
                  w-full
                  border
                  p-3
                  rounded-xl
                  outline-none
                "
              />

              <div className="flex gap-3 justify-end">

                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="
                    px-5 py-2
                    bg-gray-200
                    rounded-xl
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    px-5 py-2
                    bg-[#4F46E5]
                    text-white
                    rounded-xl
                  "
                >
                  Update
                </button>

              </div>

            </form>

          </div>
        )
      }

    </div>
  );
}