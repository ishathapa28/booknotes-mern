import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero(){

    //SEARCH FUNCTIONALITY

    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) 
            return;

        navigate(`/search/${search}`);
    };

    return(
        <>
            <section 
                id='hero'
                className="
                    relative min-h-[50vh] 
                    flex flex-col-reverse lg:flex-row 
                    items-center justify-between 
                    gap-10 lg:gap-16 
                    px-5 sm:px-8 md:px-12 lg:px-[100px]
                    py-10 lg:py-0
                    bg-[#E9D5FF]
                    overflow-hidden"
            >

                {/* CONTENT */}

                <div className="
                    relative 
                    z-10 
                    w-full lg:w-[85%] 
                    flex flex-col 
                    items-center lg:items-start"
                >
                    
                    <div className="max-w-xl space-y-5 lg:space-y-6">

                        {/* HEADING */}

                        <h1 className="
                            text-3xl sm:text-4xl lg:text-5xl
                            font-bold leading-tight 
                            text-[#1C2024] 
                            text-center lg:text-left">
                            Discover Your Next Favorite Book
                        </h1>

                        {/* SUBTEXT */}

                        <p className="
                            text-sm sm:text-base
                            text-[#1E1B4B]
                            leading-relaxed
                            text-center lg:text-left">
                            Explore thousands of books across genres. 
                            Find stories that inspire, educate, and entertain.
                        </p>

                        {/* SEARCH BARr */}
                        <form
                            onSubmit={handleSearch}
                            className='
                                flex items-center 
                                bg-[#FFFFFFD9] 
                                w-full sm:w-[450px] lg:w-[513px] 
                                h-[42px]
                                rounded-md
                                px-3
                                mx-auto
                                lg:mx-0'
                            >
                            <FiSearch className="mr-2 text-[#00062E32]" />
                            <input 
                                type="text" 
                                placeholder='Search for Books...'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                autoComplete="off"
                                className='outline-none w-full placeholder:text-[#00062E32] text-sm sm:text-base'
                            />
                        </form>
                    </div>
                </div>

                {/* HERO IMAGE */}
                
                <div className='
                    relative
                    lg:-top-6
                    flex justify-center
                    w-full lg:w-auto'>
                    <div className="
                        bg-[url('/hero.png')]
                        bg-contain bg-no-repeat bg-center
                        h-[250px] w-[250px]
                        sm:h-[320px] sm:w-[320px]
                        md:h-[380px] md:w-[380px]
                        lg:h-[400px] lg:w-[400px]"
                    />
                </div>
           
            </section>
        </>
    )
}