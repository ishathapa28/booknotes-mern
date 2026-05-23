import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

export default function BookDetails() {

    const API_URL = import.meta.env.VITE_API_URL;

    const token = localStorage.getItem("token");

    const { id } = useParams();

    const [book, setBook] = useState(null);

    const [wishlist, setWishlist] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchBook = async () => {
            try {

                const res = await axios.get(
                    `${API_URL}/books/${id}`
                );

                setBook(res.data);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

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
        alert("Book added to cart");
        }catch(error){
        console.log(error);
        }
    }
      
    useEffect(() => {
        const fetchWishlist = async () => { 
            try { 
                const res = await axios.get( `${API_URL}/wishlist`, 
                    { headers: 
                        { Authorization: `Bearer ${token}` } 
                    } 
                ); 
                console.log(res.data); 
    
                if(Array.isArray(res.data)) { 
                    setWishlist(res.data); 
                } else { 
                    setWishlist([]); 
                } 
    
            } catch (error) { 
                console.log(error); 
                setWishlist([]); 
            } 
        }; 
        fetchWishlist(); 
    }, []); 

    const AddToWishlist = async (book) => { 
        try { 
            const exists = wishlist.find( (item) => item.book?._id === book._id ); 
            
            // REMOVE

            if (exists) { 
                await axios.delete( `http://localhost:5000/api/wishlist/${exists._id}`, 
                    { headers: 
                        { 
                        Authorization: `Bearer ${token}` 
                        } 
                    } 
                ); 
                setWishlist((prev) => prev.filter((item) => item._id !== exists._id) ); 
            } 
            
            // ADD 

            else { 
                const res = await axios.post( "http://localhost:5000/api/wishlist", 
                    { bookId: book._id }, 
                    { headers: 
                        { 
                        Authorization: `Bearer ${token}` 
                        } 
                    } 
                ); 
                
                const newItem = { ...res.data, book }; 
                setWishlist((prev) => [...prev, newItem]); 
                
            } 
        } catch (error) { 
            console.log(error); 
        } 

    }; 

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="text-xl font-semibold text-[#1E1B4B] animate-pulse">
                    Loading book...
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
                Book Not Found
            </div>
        );
    }

    const isWishlisted = wishlist.some(
        (item) => item.book?._id === book._id
    );


    return (

        <>
        <Navbar />

        <section className="
            px-5 sm:px-8 md:px-12 lg:px-[100px] 
            py-15 
            bg-[#FAF7F3] 
            min-h-screen"
        >

        <div className="
            grid grid-cols-1 lg:grid-cols-2 
            gap-12 
            items-start"
        >

            {/* LEFT SIDE */}
            <div className="flex justify-center">

                <img
                    src={book.image}
                    alt={book.title}
                    className="
                        w-[280px] sm:w-[350px] lg:w-[420px]
                        rounded-2xl
                        shadow-xl
                        object-cover
                        hover:scale-105
                        transition duration-300
                    "
                />

            </div>

            {/* RIGHT SIDE */}

            <div className="space-y-6">

                <p className="text-sm uppercase tracking-wide text-[#4A4CCC] font-semibold">
                    {book.category}
                </p>

                <h1 className="text-4xl lg:text-5xl font-bold text-[#1C2024] leading-tight">
                    {book.title}
                </h1>

                <h2 className="text-xl text-[#6D6D6D]">
                    by {book.author}
                </h2>

                <div className="flex items-center gap-4">

                    <p className="text-3xl font-bold text-[#1E1B4B]">
                        ₹{book.price}
                    </p>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        In Stock
                    </span>
                </div>

                <div className="space-y-2">

                    <h3 className="text-2xl font-semibold text-[#1C2024]">
                        Description
                    </h3>

                    <p className="text-[#6D6D6D] leading-relaxed text-base">
                        {book.description}
                    </p>

                </div>

                <div className="flex gap-4 pt-4 flex-wrap">

                    <button
                        onClick={() => handleAddToCart(book)}
                        className="
                        flex items-center gap-2
                        bg-[#1E1B4B]
                        text-white
                        px-6 py-3
                        rounded-full
                        transition
                        "
                    >
                        <FiShoppingCart />
                        Add to Cart
                    </button>

                    <button
                        onClick={() => AddToWishlist(book)}
                        className={`
                            flex items-center gap-2
                            border 
                            px-6 py-3
                            rounded-full
                            transition duration-300
                            ${
                                isWishlisted
                                ? "bg-red-500 text-white border-red-500"
                                : "hover:scale-105"
                            }
                        `}   
                        
                    >
                        <FiHeart 
                            className={`
                                text-lg
                                ${isWishlisted ? "fill-red-500 text-white" : ""}
                            `}
                        />
                        {isWishlisted ? "Wishlisted" : "Wishlist"}
                    </button>

                </div>

                <div className="grid grid-cols-2 gap-5 pt-6">

                <div className="bg-white p-5 rounded-2xl shadow-sm border">
                    <p className="text-sm text-[#6D6D6D]">Language</p>
                    <h4 className="text-lg font-semibold text-[#1C2024]">
                        English
                    </h4>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border">
                    <p className="text-sm text-[#6D6D6D]">Pages</p>
                    <h4 className="text-lg font-semibold text-[#1C2024]">
                        320 Pages
                    </h4>
                </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}
            