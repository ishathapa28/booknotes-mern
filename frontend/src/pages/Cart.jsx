import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Wishlist from "./Wishlist";

export default function Cart() {

  const API_URL = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCartItems(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try{
        const res = await axios.get(
          `${API_URL}/wishlist`, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }

        );

        if(Array.isArray(res.data)) {
          setWishlist(res.data);
        } else {
          setWishlist([]);
        }

      }catch(error) {
        console.log(error);
        setWishlist([]);
      }

    };
    fetchWishlist();
  }, [])

  const addToWishlist = async (book) => {
    try {
      const exists = wishlist.find((item) => item.book?._id === book._id);
      
      if(exists) {
        toast.info("Book is already in wishlist");
      }
      else {
        const res = await axios.post("http://localhost:5000/api/wishlist",
          {
          bookId: book._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const newItem = {
          ...res.data, book
        };

        setWishlist((prev) => [...prev, newItem]);

        toast.success("Added to wishlist");
      }
      
    } catch(error) {
      console.log(error);
      toast.error("Failed to update wishlist");
    }
  };

  const handleRemove = async (id) => {

    try {
      await axios.delete(
        `http://localhost:5000/api/cart/${id}`, {
          headers: 
          {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCartItems((prev) =>
        prev.filter((item) => item._id !== id)
      );

    } catch (error) {
      console.log(error);
    }
  };

  // SUB TOTAL PRICE

  const subTotal = cartItems.reduce(
    (acc, item) =>
      acc + item.book.price * item.quantity,
    0
  );

  let shipping;

  // TOTAL PRICE
  let totalPrice;

  // FREE SHIPPING
  let freeShipping = false;
  let amountLeft = 0;

  if(subTotal >= 599){
    freeShipping = true;
    totalPrice = subTotal;
    shipping = 0;
  }else{
    amountLeft = 599 - subTotal;
    shipping = 80;
    totalPrice = subTotal + shipping;
  }

  return (
    <>
      <Navbar />

      <section className="
        px-5 sm:px-8 md:px-12 lg:px-[100px] 
        mt-[60px] 
        min-h-screen"
      >

        <div className="text-center md:text-left mb-10">

          <h1 className="text-3xl text-[#1C2024]">
            Your Cart
          </h1>

          <p className="text-[#666] mt-2">
            Books ready for checkout
          </p>

        </div>

        {cartItems.length === 0 ? (

          <div className="text-center text-[#666]">
            Your cart is empty.
          </div>

        ) : (

          <>
            <div className="flex flex-col w-full flex-1">
                <div className="grid grid-cols-1 gap-8 w-full">

                  {cartItems.map((item) => (

                    <div
                      key={item._id}
                      className="
                        bg-white 
                        rounded-2xl 
                        shadow-md 
                        p-4 sm:p-5 
                        flex flex-col sm:flex-row 
                        gap-4"
                    >

                      {/* IMAGE */}

                      <div className="
                        w-full xs:w-[110px] sm:w-[120px] 
                        h-[100px] xs:h-[160px] sm:h-[170px] 
                        bg-[#F5F5F5] 
                        rounded-xl 
                        flex items-center justify-center 
                        flex-shrink-0"
                      >

                        <img
                          onClick={() => navigate(`/book/${item.book._id}`)}
                          src={item.book.image}
                          alt={item.book.title}
                          className="h-full object-contain"
                        />

                      </div>

                      {/* INFO */}
                      <div className="flex flex-col flex-1 min-w-0">

                        <h2 className="
                          font-bold 
                          text-base sm:text-lg 
                          text-[#1C2024] 
                          line-clamp-1"
                        >
                          {item.book.title}
                        </h2>

                        <p className="text-[#6366F1] text-sm sm:text-base">
                          {item.book.author}
                        </p>

                        <p className="font-semibold mt-2 text-base sm:text-lg">
                          ₹{item.book.price}
                        </p>

                        <p className="mt-1 text-sm text-[#666]">
                          Quantity: {item.quantity}
                        </p>

                        <div className="flex flex-col sm:flex-row self-end gap-3 mt-2 sm:mt-auto">
                          <button
                            onClick={() => addToWishlist(item.book)}
                            className="
                              w-full sm:w-auto 
                              bg-red-500 
                              text-white 
                              px-4 py-1 sm:py-2 
                              rounded-full 
                              hover:bg-red-600 transition 
                              text-sm sm:text-base 
                              whitespace-nowrap"
                          >
                            Move to Wishlist
                          </button>
                          <button
                            onClick={() => handleRemove(item._id)}
                            className="
                              w-full sm:w-auto  
                              bg-red-500 
                              text-white 
                              px-4 py-1 sm:py-2 
                              rounded-full 
                              hover:bg-red-600 transition 
                              text-sm sm:text-base 
                              whitespace-nowrap"
                          >
                            Remove
                          </button>
                        </div>
                        

                      </div>
                    </div>
                  ))}
                </div>

                {/* TOTAL */}

                <div className="mt-10 w-full">

                  <div className="flex flex-col bg-[#EEF2FF] p-4 sm:p-6 rounded-2xl w-full">

                    <h2 className="text-xl font-bold text-[#1C2024]">
                      Order Summary
                    </h2>

                    <div className="flex justify-between mt-4">

                      <span className="text-[#3F3F46]">
                        Subtotal
                      </span>

                      <span className="font-bold text-[#18181B]">
                        ₹{subTotal}
                      </span>

                    </div>

                    <div className="flex justify-between mt-4">

                      <span className="text-[#3F3F46]">
                        Shipping
                      </span>

                      <span className="font-bold text-[#18181B]">
                        ₹{shipping}
                      </span>

                    </div>

                    {
                      freeShipping ? (

                        <div className="mt-4 text-[#71717A]">
                          <p className="text-sm md:text-base">
                            Yay! you unlocked free shipping
                          </p>
                        </div>
                      ) : (
                        <div className="mt-4 text-[#71717A]">
                          <p>Spend ₹{amountLeft} more to get FREE Shipping!</p>
                        </div>
                      )
                    }

                    <div className="flex justify-between mt-4">

                      <span className="text-[#3F3F46]">Total</span>

                      <span className="font-bold text-[#18181B]">
                        ₹{totalPrice}
                      </span>

                    </div>

                    <button
                      onClick={() => navigate("/checkout")}
                      className="
                        mt-6 
                        w-full sm:w-auto 
                        sm:self-end 
                        bg-[#6366F1] 
                        text-white 
                        py-3 px-4 
                        rounded-full 
                        hover:bg-[#4F46E5] transition"
                    >
                      Checkout
                    </button>

                  </div>

                </div>

            </div>

          </>
        )}

      </section>

      <Footer />
    </>
  );
}