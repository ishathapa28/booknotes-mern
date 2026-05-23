import { IoBagHandleOutline, IoHeartOutline, IoHeart } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BookCard({
    book, bgColor, isWishlisted, onToggleWishlist, onAddToCart
}){
    const navigate = useNavigate();

    return(

        <div 
            className="
                card
                relative 
                w-full 
                max-w-[280px] sm:max-w-[260px] md:max-w-[270px] lg:max-w-[280px]
                min-h-[420px] sm:min-h-[450px] md:min-h-[470px] lg:min-h-[480px]
                flex flex-col 
                gap-3 sm:gap-4
                rounded-2xl
                overflow-hidden
                cursor-pointer
            ">
            
            {/* WISHLIST */}

            <button
                type="button"
                onClick={() => onToggleWishlist(book)}
                className="
                    absolute 
                    top-3 
                    right-3 
                    z-10 
                    hover:scale-110 
                    active:scale-95 
                    transition-transform 
                    duration-300"
            >
                {isWishlisted ? (
                <IoHeart className="text-red-500 text-2xl" />
                ) : (
                <IoHeartOutline className="text-2xl text-[#1C2024]"/>
                )}
            </button>

            {/* IMAGE SECTION */}

            <div className="
                w-full 
                h-[260px] sm:h-[300px] md:h-[320px] 
                rounded-2xl 
                flex 
                items-center justify-center 
                p-4 sm:p-6" 
                style={{backgroundColor: bgColor}}
            >
                <img 
                    onClick={() => navigate(`/book/${book._id}`)}
                    src={book.image} 
                    alt={book.title} 
                    className="h-full w-auto object-contain"
                />
            </div>

            <div className="flex flex-col flex-1 gap-1 px-1">
                <h3 className="text-lg md:text-xl font-bold truncate text-[#1C2024] line-clamp-1">
                    {book.title}
                </h3>
                <p className="text-sm md:text-base text-[#818CF8] line-clamp-1">
                    {book.author}
                </p>
                <p className="font-bold text-lg text-[#4F46E5]">
                    ₹{book.price}
                </p>
            
                <div className="mt-auto pt-2">
                    <button 
                        onClick={() => onAddToCart(book)}
                        className="btn-primary w-full flex items-center justify-center gap-2">
                        <IoBagHandleOutline />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}