import { IoLogoInstagram, IoLogoTwitter, IoLogoFacebook, IoMailOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Footer() {
  return (

    <footer className="mt-[120px] text-white">

      {/* MAIN FOOTER */}

      <div
        className="
          px-[100px] py-[60px] 
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 
          gap-10 
          bg-[#6059a5]"
      >

        {/* BRAND */}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Booknotes
          </h2>
          <p className="text-white/80">
            Discover magical stories, inspiring reads, and unforgettable
            adventures — all in one place.
          </p>

          {/* SOCIAL */}

          <div className="flex gap-4 text-xl">
            <IoLogoInstagram className="cursor-pointer hover:text-[#0e0e0f] transition" />
            <IoLogoTwitter className="cursor-pointer hover:text-[#0e0e0f] transition" />
            <IoLogoFacebook className="cursor-pointer hover:text-[#0e0e0f] transition" />
          </div>
        </div>

        {/* QUICK LINKS */}
        
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <ul className="space-y-2 text-white/80">
            <li>
              <Link
                to="/"
                className="hover:text-[#0e0e0f] cursor-pointer"
              >
                Home
              </Link> 
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-[#0e0e0f] cursor-pointer"
              >
                Shop
              </Link> 
            </li>
            <li>
              <a
                href="#categories"
                className="hover:text-[#0e0e0f] cursor-pointer"
              >
                Categories
              </a>
            </li>
            <li>
              <a
                href="#newarrivals"
                className="hover:text-[#0e0e0f] cursor-pointer"
              >
                New Arrivals
              </a>
            </li>
            <li>
              <a
                href="#contacts"
                className="hover:text-[#0e0e0f] cursor-pointer"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* CATEGORIES */}

        <div className="space-y-3" id="contacts">
          <h3 className="font-semibold text-lg">Contact</h3>
          <ul className="space-y-2 text-white/80">
            <li className="hover:text-[#0e0e0f] cursor-pointer">Email: eearthtoisha@gmail.com</li>
            <li className="hover:text-[#0e0e0f] cursor-pointer">Jamshedpur, Jharkhand - 831004</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">We Accept</h3>

          <div className="flex gap-3 items-center">
            <img 
              src="/visa.png" 
              alt="visa" 
              className="h-6 w-auto object-contain"
            />
            <img 
              src="/mastercard.png" 
              alt="mastercard" 
              className="h-6 w-auto object-contain"
            />
            <img 
              src="/americanexpress.png" 
              alt="americanexpress" 
              className="h-6 w-auto object-contain"
            />

          </div>

        </div>

      </div>

      {/* BOTTOM BAR */}

      <div
        className="
          text-center 
          py-4 
          text-white/70 
          text-sm 
          border-t border-dashed border-gray-300 
          bg-[#6861a6]"
      >
        © {new Date().getFullYear()} Booknotes. All rights reserved.
      </div>

    </footer>
  );
}
