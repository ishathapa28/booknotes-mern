import Navbar from "../components/Navbar"; 
import Hero from "../components/Hero"; 
import BookCard from "../components/BookCard"; 
import Footer from "../components/Footer";

import axios from "axios"; 

import { toast } from "react-toastify";

import { useEffect, useState } from "react"; 
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Mousewheel, Scrollbar, Navigation } from "swiper/modules"; 

import "swiper/css"; import "swiper/css/scrollbar"; 
import "swiper/css/navigation"; 

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"; 
import { IoStar } from "react-icons/io5"; 

const testimonials = [ 
  { 
    name: "Aarav Sharma", 
    role: "Book Lover", 
    image: "https://i.pravatar.cc/150?img=32", 
    review: "Absolutely magical collection! The interface is beautiful and finding books here feels like an adventure. Highly recommended!", 
  }, 
  { 
    name: "Priya Mehta", role: "Student", 
    image: "https://i.pravatar.cc/150?img=47", 
    review: "I love the smooth experience and aesthetic design. The wishlist feature is my favorite. Makes book shopping so fun!", 
  }, 
  { 
    name: "Rohan Das", 
    role: "Author", 
    image: "https://i.pravatar.cc/150?img=12", 
    review: "A beautifully designed platform with great book recommendations. Feels premium and easy to navigate.", 
  }, 
]; //FIXED REVIEW DATA 

const blogPosts = [ 
  { 
    title: "Top 10 Fantasy Books You Must Read in 2026", 
    desc: "Explore magical worlds, epic adventures, and unforgettable characters with our curated fantasy picks.", 
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794", 
    category: "Fantasy", 
    date: "Jan 12, 2026", 
  }, 
  { 
    title: "Why Reading Daily Can Change Your Life", 
    desc: "Discover the science behind reading habits and how books improve mental health and creativity.", 
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d", 
    category: "Lifestyle", 
    date: "Feb 02, 2026", 
  }, 
  { 
    title: "Best Thriller Novels That Keep You Awake All Night", 
    desc: "Love suspense? These gripping thrillers will keep you turning pages till morning.", 
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66", 
    category: "Thriller", 
    date: "Feb 10, 2026", 
  }, 
]; 

const pastelColors = [ "#b8fce5", "#faeec8", "#75b3ff", "#eef5c1", "#f0d6ff", ]; 

// UTILITY FUNCTION TO SPLIT ARRAY INTO CHUNKS OF GIVEN SIZE 

function chunkArray(array, size) { 
  const result = []; 
  for (let i = 0; i < array.length; i += size) { 
    result.push(array.slice(i, i + size)); 
  } 
  return result; 
} 

export default function Home() { 

  const API_URL = import.meta.env.VITE_API_URL;

  //STORES ALL BOOKS

  const [books, setBooks] = useState([]); 
  
  const categories = ["All", "Thriller", "Horror", "Adventure", "Romance", "Fantasy", "Self Help"]; 
  
  useEffect(() => { axios.get(`${API_URL}/books`) 
    .then(res => setBooks(res.data)) 
    .catch(err => console.log(err)); 
  }, []); 
  
  //BESTSELLERS

  const [bestsellers, setBestsellers] = useState([]); //state for bestseller books 
  
  useEffect(() => { 
    const fetchBestsellers = async () => { 
      try { 
        const res = await axios.get(`${API_URL}/books/bestsellers`); 
        setBestsellers(res.data); 
      } catch (error) { 
        console.error(error); 
      } 
    }; 
    fetchBestsellers(); 
  }, []); 
  
  //NEWARRIVALS

  const [newArrivals, setNewArrivals] = useState([]); 
  
  useEffect(() => { 
    const fetchNewArrivals = async () => { 
      const res = await axios.get( `${API_URL}/books/new-arrivals` ); 
      setNewArrivals(res.data); 
    }; 
    fetchNewArrivals(); 
  }, []); 
  
  //USER

  const [user, setUser] = useState(null); 
  useEffect(() => { 
    const storedUser = localStorage.getItem("user"); 
    if (storedUser) { 
      setUser(JSON.parse(storedUser)); 
    } 
  }, []); 
  
  //FILTER BY CATEGORY

  const [selectedCategory, setSelectedCategory] = useState("All"); //tracks active category 
  
  const filteredBooks = 
    selectedCategory === "All" ? books : books.filter((book) => book.category === selectedCategory); 
    
  //WISHLIST

  const token = localStorage.getItem("token"); 

  const [wishlist, setWishlist] = useState([]); //stores liked books 
  
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

  const handleToggleWishlist = async (book) => { 
    try { 
      const exists = wishlist.find( (item) => item.book?._id === book._id ); 
      
      // REMOVE

      if (exists) { 
        await axios.delete( `${API_URL}/wishlist/${exists._id}`, 
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
        const res = await axios.post( `${API_URL}/wishlist`, 
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
    
    //SHOMORE SHOWLESS

    const [visibleCount, setVisibleCount] = useState(4); 
    
    //TRACKS HOW MANY BOOKS VISIBLE

    const [expanded, setExpanded] = useState(false); 
    
    const handleShowMore = () => { 
      setVisibleCount((prev) => Math.min(prev + 4, newArrivals.length)); 
      setExpanded(true); 
    }; 
    
    const handleShowLess = () => { 
      setVisibleCount(4); 
      setExpanded(false); 
    }; 
    
    //ADD TO CART

    const handleAddToCart = async (book) => { 
      try { 
        await axios.post( `${API_URL}/cart`, 
          { bookId: book._id, }, 
          { headers: 
            { 
              Authorization: `Bearer ${token}` 
            } 
          } 
        ); 
        window.dispatchEvent(new Event("cartUpdated")); 
        toast.success("Book added to cart"); 
      } catch (error) { 
        console.log(error); 
        toast.error("Failed to add to cart");
      } 
    }; 
    
    useEffect(() => { 
      const handleStorageChange = () => 
        { 
          setWishlist([]); 
        }; 
        window.addEventListener("storage", handleStorageChange); 
        
        return () => window.removeEventListener("storage", handleStorageChange); 
      }, []); 
      
    return ( 
      <> 
      
      <section id="home"> 

        <Navbar/> 
        
        <Hero /> 
        
        {/* BEST SELLER SECTION */} 
        
        <section className=" flex flex-col gap-5 relative px-5 sm:px-8 md:px-12 lg:px-[100px] mt-[50px] items-center"> 
          <div className="relative mb-7 text-center"> 
            <h1 className="text-2xl md:text-3xl text-[#1C2024]"> Best Seller </h1> 
            <p className="text-[#1C2024]/80 md:absolute md:left-[-50px] md:whitespace-nowrap text-sm md:text-base mt-2 md:mt-0"> 
              Read What Millions Have Loved! 
            </p> 
          </div> 
          
          {/* ARROWS HIDDEN ON MOBILE */} 
          <div className="best-prev hidden lg:block absolute left-[20px] xl:left-[50px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"> 
            <div className="bg-white/80 rounded-full p-2 shadow hover:bg-gray-200"> 
              <IoIosArrowBack /> 
            </div> 
          </div> 
          
          <div className="best-next hidden lg:block absolute right-[20px] xl:right-[50px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"> 
            <div className="bg-white/80 rounded-full p-2 shadow hover:bg-gray-200"> 
              <IoIosArrowForward /> 
            </div> 
          </div> 
          
          <Swiper 
            modules={
              [ Mousewheel, Scrollbar, Navigation ]
            } 
            slidesPerView={1} 
            spaceBetween={20} 
            grabCursor={true} 
            mousewheel={{ forceToAxis: true, sensitivity: 1 }} 
            scrollbar={{ draggable: true, hide: false }} 
            navigation={{ nextEl: ".best-next", prevEl: ".best-prev", }} 
            speed={800} 
            className="card-swiper w-full" 
          > 
          
            {chunkArray(bestsellers,4).map((bookGroup, index) => { 
              return( 
              
                <SwiperSlide 
                  key={index}> 
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 px-2 md:px-4 w-full justify-items-center"> 
                    {bookGroup.map((book,i) => { 
                      const isLiked= wishlist?.some( (item) => item.book?._id === book._id ); 
                      return ( 
                        <BookCard 
                          key={book._id || i} 
                          book={book} 
                          bgColor={ 
                            pastelColors[i % pastelColors.length] 
                          } 
                          isWishlisted={isLiked} 
                          onToggleWishlist={handleToggleWishlist} 
                          onAddToCart={handleAddToCart} 
                        /> 
                      ); 
                    })} 
                  </div> 
                </SwiperSlide> 
              ) 
            })} 
          </Swiper> 
        </section> 
        
        {/* CATEGORY SECTION */} 

        <section className="relative px-5 sm:px-8 md:px-12 lg:px-[100px] mt-[80px] space-y-6" id="categories"> 
          <h2 className="text-[24px] text-[#1C2024] text-center"> 
            Browse by Category 
          </h2> 
          
          {/* CATEGORY BUTTON*/}

          <div className="flex justify-start sm:justify-center gap-3 overflow-x-auto pb-3 scrollbar-hide"> 
            {categories.map((cat) => ( 
              <button 
                type="button" 
                key={cat} 
                onClick={() => { 
                  setSelectedCategory(cat); 
                  setVisibleCount(4); 
                }} 
                className={`px-4 py-2 rounded-full whitespace-nowrap transition text-sm md:text-base 
                  ${selectedCategory === cat 
                    ? "bg-[#6366F1] text-white" 
                    : "bg-[#9193ed]" 
                  }`
                } 
              > 
                {cat} 
              </button> 
            ))} 
          </div> 
          
          {/* ARROWS */} 

          <div className="cat-prev hidden lg:block absolute left-[20px] xl:left-[50px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"> 
            <div className="bg-white/80 rounded-full p-2 shadow hover:bg-gray-200"> 
              <IoIosArrowBack /> 
            </div> 
          </div> 
          
          <div className="cat-next hidden lg:block absolute right-[20px] xl:right-[50px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"> 
            <div className="bg-white/80 rounded-full p-2 shadow hover:bg-gray-200"> 
              <IoIosArrowForward /> 
            </div> 
          </div> 
          
          {/* CATEGORY SWIPER */} 

          <Swiper modules=
            {
              [Mousewheel, Scrollbar, Navigation]
            } 
            slidesPerView={1} 
            spaceBetween={20} 
            grabCursor={true} 
            mousewheel={
              { forceToAxis: true, 
                sensitivity: 1 
              }
            } 
            scrollbar={
              { draggable: true, 
                hide: false 
              }
            } 
            navigation={
              { nextEl: ".cat-next", 
                prevEl: ".cat-prev", 
              }
            } 
            speed={800} 
            className="card-swiper w-full" 
          > 
            {chunkArray(filteredBooks,4).map((bookGroup, index) => { 
              return( 
                <SwiperSlide 
                  key={index}> 
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 px-2 md:px-4 w-full justify-items-center"> 
                    {bookGroup.map((book,i) => { 
                      const isLiked= wishlist?.some( (item) => item.book?._id === book._id ); 
                      return ( 
                        <BookCard 
                          key={book._id || i} 
                          book={book} 
                          bgColor={ pastelColors[i % pastelColors.length] } 
                          isWishlisted={isLiked} 
                          onToggleWishlist={handleToggleWishlist} 
                          onAddToCart={handleAddToCart} 
                        /> 
                      ); 
                    })} 
                  </div> 
                </SwiperSlide> 
              ) 
            })} 
          </Swiper> 
        </section> 
        
        {/*NEW ARRIVALS*/} 
        <section className="flex flex-col gap-6 relative px-4 sm:px-6 md:px-10 lg:px-[100px] mt-[80px] items-center"> 
          
          {/* HEADER */} 

          <div className="relative mb-4 md:mb-7 text-center"> 
            <h2 className="text-[24px] sm:text-[28px] md:text-3xl text-[#1C2024]"> 
              New Arrivals 
            </h2> 
            <p className="text-[#1C2024]/80 text-sm sm:text-base mt-2 md:mt-0"> 
              Fresh stories waiting for you
            </p> 
          </div> 
          
          {/* BOOKS ROW */} 

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full justify-items-center"> 
            {newArrivals.slice(0, visibleCount).map((book, i) => { 
              const isLiked = wishlist?.some( 
                (item) => item.book?._id === book._id 
              ); 
              return ( 
                <div 
                  key={i}
                  className="w-full flex justify-center"
                > 
                  <BookCard 
                    book={book} 
                    isWishlisted={isLiked} 
                    bgColor={ pastelColors[i % pastelColors.length] } 
                    onToggleWishlist={handleToggleWishlist} 
                    onAddToCart={handleAddToCart} 
                  /> 
                </div> 
              ); 
            })} 
          </div> 
          
          <div className="flex flex-wrap justify-center mt-6 gap-4"> 

            {/* SHOW MORE ALWAYS VISIBLE UNLESS FULLY EXPANDED*/} 

            {visibleCount < newArrivals.length && ( 
              <button 
                onClick={handleShowMore} 
                className="px-5 sm:px-6 py-2 rounded-full bg-[#6366F1] text-white text-sm sm:text-base shadow hover:bg-[#4f46e5] transition" 
              > 
                Show More 
              </button> 
            )} 
            
            {/* SHOW LESS APPEARS ONLY AFTER EXPANSION */} 
            {expanded && ( 
              <button 
                onClick={handleShowLess} 
                className="px-5 sm:px-6 py-2 rounded-full bg-[#6366F1] text-white text-sm sm:text-base shadow hover:bg-[#4f46e5] transition" 
              > 
                Show Less 
              </button> 
            )} 
          </div> 
        </section> 
        
        {/*BLOG SECTION*/} 

        <section className="flex flex-col gap-5 relative px-5 sm:px-8 md:px-12 lg:px-[100px] mt-[80px] items-center"> 
          
          {/* HEADER */} 

          <div className="relative mb-7 text-center"> 
            <div> 
              <h2 className="text-2xl md:text-3xl text-[#1C2024]"> From Our Blog </h2> 
              <p className="text-[#1C2024]/80 md:absolute md:left-[-35px] md:whitespace-nowrap text-sm md:text-base mt-2 md:mt-0"> 
                Stories, insights, and reading inspiration 
              </p> 
            </div> 
          </div> 
          <button className="text-[#1C2024]] font-semibold hover:underline self-center md:self-end"> View All → </button> 
          
          {/* BlLOG CARDS */} 

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"> 
            {blogPosts.map((post, i) => ( 
              <div 
                key={i} 
                className="group bg-[#FDF6C9] rounded-2xl overflow-hidden" 
              > 
              
              {/* IMAGE */} 
              <div className="relative overflow-hidden"> 
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-[220px] object-cover group-hover:scale-110 transition duration-500" 
                /> 
                
                {/* CATEGORY BADGE */} 
                <span className="absolute top-4 left-4 px-3 py-1 text-sm rounded-full bg-[#e6e2b5] text-[#4A433B] font-medium shadow"> 
                  {post.category} 
                </span> 
              </div> 
              
              {/* CONTENT */} 
              <div className="p-6 space-y-3"> 
                <p className="text-sm text-[#7d766b]"> 
                  {post.date} 
                </p> 
                <h3 className="text-xl font-semibold text-[#2D2A26] group-hover:text-[#4c545b] transition"> 
                  {post.title} 
                </h3> 
                <p className="text-[#5C554D] text-sm leading-relaxed"> 
                  {post.desc} 
                </p> 
                <button className="mt-2 text-[#5B5BD6] font-semibold hover:text-[#8B5CF6] transition"> 
                  Read More → 
                </button> 
              </div> 
            </div> 
          ))} 
        </div> 
      </section> 
      
      {/* NEWSLETTER SECTION */} 
      <section className="px-5 sm:px-8 md:px-12 lg:px-[100px] mt-[100px]"> 
        <div 
          className=" relative rounded-[30px] overflow-hidden px-6 sm:px-10 lg:px-[60px] py-[50px] flex flex-col lg:flex-row items-center justify-between gap-10" 
          style={{ background: "#FBE4F0", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)" }} > 
          
          {/* LEFT CONTENT */} 
          <div className="text-[#664968] max-w-[500px] space-y-4 text-center lg:text-left"> 
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight"> Join Our Reading Community 📚✨ </h2> 
            <p className="text-[#5E4B60]"> Get exclusive book recommendations, new arrivals, and special discounts delivered straight to your inbox. </p> 
          </div> 
          
          {/* RIGHT FORM */} 
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 items-center justify-center"> 
            <input type="email" placeholder="Enter your email" className="px-5 py-3 rounded-full w-full sm:w-[300px] bg-white/80 text-[#3A2E3D] placeholder:text-[#8B7A8D] outline-none border border-white/40 focus:ring-2 focus:ring-[#C084FC]" /> 
            <button className="px-6 py-3 rounded-full font-semibold bg-[#8e70d3] text-white hover:bg-[#8459cd] hover:scale-105 transition duration-300" > Subscribe </button> 
          </div> 
        </div> 
      </section> 
      
      <Footer/> 
      
    </section> 
  </> 
); 
}