import { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";

const pastelColors = [
  "#b8fce5",
  "#faeec8",
  "#75b3ff",
  "#eef5c1",
  "#f0d6ff",
];

export default function SearchResults() {

    const API_URL = import.meta.env.VITE_API_URL;

    const token = localStorage.getItem("token");

    const { query } = useParams();

    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {

        fetchResults();

    }, [query]);

    const fetchResults = async () => {

        try {

            setLoading(true);

            const res = await axios.get(
                `${API_URL}/books/search/${query}`
            );

            setBooks(res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    // WISHLIST TOGGLE
    const handleToggleWishlist = (book) => {

        setWishlist((prev) => {

            const exists = prev.find(
                (item) => item._id === book._id
            );

            if (exists) {

                return prev.filter(
                    (item) => item._id !== book._id
                );
            }

            return [...prev, book];
        });
    };

    // ADD TO CART
    const handleAddToCart = async (book) => {

        try {

            await axios.post(
                `${API_URL}/cart`,
                {
                    bookId: book._id,
                }
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Added to cart");

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <>
            <Navbar />

            <section
                className="
                    px-5
                    sm:px-8
                    md:px-12
                    lg:px-[100px]
                    py-[60px]
                    min-h-screen
                "
            >

                {/* HEADING */}

                <div className="mb-10 text-center">

                    <h1
                        className="
                            text-3xl
                            md:text-4xl
                            font-bold
                            text-[#1C2024]
                        "
                    >
                        Search Results
                    </h1>

                    <p className="text-[#666] mt-3">

                        Showing results for:

                        <span className="font-semibold text-[#6366F1]">
                            {" "}"{query}"
                        </span>

                    </p>

                </div>

                {/* LOADING */}

                {loading ? (

                    <div className="text-center">
                        Loading...
                    </div>

                ) : books.length === 0 ? (

                    <div
                        className="
                            text-center
                            text-[#666]
                            text-lg
                        "
                    >
                        No books found.
                    </div>

                ) : (

                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-4
                            gap-8
                            justify-items-center
                        "
                    >

                        {books.map((book, i) => (

                            <BookCard
                                key={book._id}
                                book={book}
                                bgColor={
                                    pastelColors[
                                        i % pastelColors.length
                                    ]
                                }
                                isWishlisted={wishlist.some(
                                    (item) =>
                                        item._id === book._id
                                )}
                                onToggleWishlist={
                                    handleToggleWishlist
                                }
                                onAddToCart={
                                    handleAddToCart
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