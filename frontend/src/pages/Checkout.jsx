import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Checkout() {

    const API_URL = import.meta.env.VITE_API_URL;
    
    const [cartItems, setCartItems] = useState([]);

    const token = localStorage.getItem("token");

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

    if(subTotal >= 599) {
        freeShipping = true;
        totalPrice = subTotal;
        shipping = 0;
    } else {
        amountLeft = 599 - subTotal;
        shipping = 80;
        totalPrice = subTotal + shipping;
    }

    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        address: "",
        city: "",
        pincode: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {

        const fetchCart = async () => {

            try {

                const res = await axios.get(
                    `${API_URL}/cart`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setCartItems(res.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchCart();

    }, []);

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

        setLoading(true);

        const orderData = {
            ...formData,
            items: cartItems.map((item) => ({
                title: item.book.title,
                price: item.book.price,
                quantity: item.quantity,
                image: item.book.image,
            })),
            totalAmount: totalPrice,
        };

        await axios.post(
            `${API_URL}/orders`,
            orderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setSuccess(true);

        } catch (error) {
        console.log(error);
        } finally {
        setLoading(false);
        }
    };

    return (

        <>
            <Navbar />

            <section className="min-h-screen bg-[#FAF7F3] px-5 sm:px-8 md:px-12 lg:px-[100px] py-10">

                <h1 className="text-4xl font-bold text-[#1C2024] mb-10">
                    Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border p-8">

                        <h2 className="text-2xl font-semibold mb-6 text-[#1C2024]">
                            Shipping Information
                        </h2>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="customerName"
                                placeholder="Full Name"
                                value={formData.customerName}
                                onChange={handleChange}
                                required
                                className="w-full border border-[#E5DED8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-[#E5DED8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                            />

                            <textarea
                                name="address"
                                placeholder="Full Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full border border-[#E5DED8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full border border-[#E5DED8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                                />

                                <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                required
                                className="w-full border border-[#E5DED8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                                />

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    w-full
                                    bg-[#1E1B4B]
                                    text-white
                                    py-4
                                    rounded-xl
                                    hover:scale-[1.01]
                                    transition
                                    disabled:opacity-50
                                    "
                                >
                                    {loading ? "Placing Order..." : "Place Order"}
                            </button>

                            {success && (
                                <div className="bg-green-100 text-green-700 p-4 rounded-xl text-center font-medium">
                                    Order placed successfully 🎉
                                </div>
                            )}
                        </form>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="bg-white rounded-3xl shadow-sm border p-8 h-fit sticky top-24">

                        <h2 className="text-2xl font-semibold mb-6 text-[#1C2024]">
                            Order Summary
                        </h2>

                        <div className="space-y-5">

                            {cartItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 border-b pb-4"
                                >
                                    <img
                                        src={item.book?.image}
                                        alt={item.book?.title}
                                        className="w-20 h-24 object-cover rounded-xl"
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-semibold text-[#1C2024]">
                                            {item.book?.title}
                                        </h3>

                                        <p className="text-sm text-[#6D6D6D]">
                                            Quantity: {item.book?.price * item.quantity}
                                        </p>

                                        <p className="text-[#1E1B4B] font-bold mt-1">
                                            ₹{item.book?.price * item.quantity}
                                        </p>
                                    </div>

                                </div>
                            ))}

                            <div className="pt-5 border-t flex justify-between items-center text-xl font-bold text-[#1C2024]">
                                <span>Total</span>
                                <span>₹{totalPrice}</span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <Footer />
        </>
    );
}
