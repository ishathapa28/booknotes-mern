import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";

export default function Wishlist() {

  const API_URL = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");

  const pastelColors = [ "#b8fce5", "#faeec8", "#75b3ff", "#eef5c1", "#f0d6ff", ]; 
  
  const [wishlistBooks, setWishlistBooks] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {

      const res = await axios.get(
        `${API_URL}/wishlist`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setWishlistBooks(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (item) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/wishlist/${item._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setWishlistBooks((prev) =>
        prev.filter((wishlistItem) => wishlistItem._id !== item._id)
      );

    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (book) => {
    try {
      await axios.post("http://localhost:5000/api/cart", 
        {
          bookId: book._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Book added to cart");
    }catch(error){
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      <Navbar />

      <section className="px-5 sm:px-8 md:px-12 lg:px-[100px] mt-[60px] min-h-screen">

        <div className="mb-10 text-center">
          <h1 className=" text-3xl text-[#1C2024]">
            My Wishlist
          </h1>

          <p className="text-[#1C2024]/70 mt-2 relative right-[-5px]">
            Your saved books collection
          </p>
        </div>

        {wishlistBooks.length === 0 ? (

          <div className="text-center text-[#666]">
            No wishlist books yet.
          </div>

        ) : (

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">

            {wishlistBooks.map((item, i) => (
              <BookCard
                key={i}
                book={item.book}
                isWishlisted={true}
                onToggleWishlist= {() => handleRemove(item._id)}
                onAddToCart={handleAddToCart}
                bgColor={ 
                    pastelColors[i % pastelColors.length] 
                } 
              />
            ))}

          </div>
        )}

      </section>

      <Footer />
    </>
  );
}