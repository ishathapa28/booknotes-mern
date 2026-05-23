import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiHome } from "react-icons/fi";
import { FaBook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar(){

    const API_URL = import.meta.env.VITE_API_URL;

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const [open, setOpen] = useState(false); //LOGIN SIGNUP DROPDOWN

    //NAVBAR SCROLL CHANGE

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20) //HOW MUCH PAGE IS SCROLLED VERTICALLY
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    },[]);


    //GET USER

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    //LOGOUT FUNCTION

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setCartCount(0);
        setUser(null);
        navigate("/login");
        window.location.reload();
    };

    //CART COUNT FOR CART ICON

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        fetchCartCount();
        window.addEventListener("cartUpdated", fetchCartCount);

        return () => {
            window.removeEventListener("cartUpdated", fetchCartCount);
        };

    }, []);

    const fetchCartCount = async () => {
        try {
            const res = await axios.get(
                `${API_URL}/cart`, {
                     headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // TOTAL QUANTITY

            const totalItems = res.data.reduce(
                (acc, item) => acc + item.quantity,
                0
            );

            setCartCount(totalItems);

        } catch (error) {
            console.log(error);
        }
    };

    return(
        <>
            <nav className={
                `navbar 
                flex justify-between items-center 
                px-4 sm:px-6 lg:px-8 
                py-4 lg:py-5 
                shadow-sm 
                sticky 
                top-0 
                z-[1000] 
                transition-all duration-300

                ${scrolled 
                    ? "bg-[#E9D5FF] backdrop-blur-xl" :
                    "bg-[#E9D5FF]"
                }`}>

                {/* LOGO */}

                <div className="
                    text-xl sm:text-2xl 
                    font-['DM_Serif_Display'] font-bold 
                    flex items-center
                    gap-2  
                    text-[#1E1B4B] 
                    whitespace-nowrap"
                >
                    <FaBook className="text-[20px] sm:text-[24px]"/> 
                    Booknotes
                </div>

                {/* RIGHT ICONS */}

                <div className="
                    flex justify-between items-center
                    gap-6 sm:gap-5 lg:gap-6  
                    text-[#1E1B4B] 
                    text-xl sm:text-2xl"
                >
                    {/* HOME ICON */}

                    <FiHome 
                        onClick={() => {
                            if(window.location.pathname !== "/"){
                                navigate("/");

                                setTimeout(() => {
                                    document.getElementById("home")?.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }, 100);

                            } else {
                                document.getElementById("home")?.scrollIntoView({
                                    behavior: "smooth",
                                });

                            }
                        }}
                        className="
                            hover:text-[#6f6aa2] 
                            cursor-pointer 
                            hover:scale-110 transition"
                    />
                    
                    {/* WISHLIST ICON */}

                    <Link to="/wishlist">
                        <FiHeart className="hover:text-[#6f6aa2] cursor-pointer hover:scale-110 transition" />
                    </Link>
                    
                    {/* CART ICON */}

                    <div className="relative">
                        <Link to="/cart">
                            <FiShoppingCart className="hover:text-[#6f6aa2] cursor-pointer hover:scale-110  transition" />
                        </Link>

                        {/* CART BADGE */}
                        {cartCount > 0 && (
                            <span className="
                                absolute -top-2 -right-2 bg-[#1E1B4B] text-white text-[10px] sm:text-xs px-1.5 rounded-full"
                            >
                                {cartCount}
                            </span>
                        )}
                    </div>
    
                    {/* USER DROPDOWN */}

                    <div className="relative">
                        <button 
                            onClick={() => setOpen(!open)}>
                            <FiUser className="hover:text-[#6f6aa2] cursor-pointer hover:scale-110  transition"/>
                        </button>

                            {/* DROPDOWN */}

                            {open && (
                                <div className="
                                    absolute 
                                    right-0 
                                    mt-3 
                                    sm:w-44 
                                    bg-[var(--bg-card)] 
                                    shadow-md 
                                    rounded-xl 
                                    p-3 
                                    flex flex-col 
                                    gap-2 
                                    border border-[#E5DED8]"
                                >
                                    {/* IF USER IS NOT LOGGED IN */}
                                    {!user ? (
                                        <>
                                            <Link
                                                to="/login"
                                                className="hover:text-[#8B5E3C] transition"
                                                onClick={() => setOpen(false)}
                                            >
                                            Login
                                            </Link>

                                            <Link
                                                to="/signup"
                                                className="hover:text-[#8B5E3C] transition"
                                                onClick={() => setOpen(false)}
                                            >
                                            Sign Up
                                            </Link>
                                        </> 
                                    ) : (
                                        <>
                                        {/* IF USER IS LOGGED IN */}

                                            <p className="text-sm text-[#6D6D6D]">
                                                Hello, {user.name}
                                            </p>

                                            <button
                                                onClick={handleLogout}
                                                className="text-left hover:text-red-500 transition text-sm sm:text-base"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                    </div>
                </div>                      
            </nav>
        </>
    )
}
