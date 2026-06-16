import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrders() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const res = await axios.get(`${API_URL}/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setOrders([]);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen px-5 sm:px-8 md:px-12 lg:px-[100px] mt-[60px]">
        <div className="text-center md:text-left mb-10">
          <h1 className="text-3xl text-[#1C2024] font-bold">
            My Orders
          </h1>

          <p className="text-[#666] mt-2">
            Track your book orders and order history
          </p>
        </div>

        {loading ? (
          <div className="text-center text-[#666]">
            Loading your orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-[#EEF2FF] rounded-2xl p-8 text-center">
            <h2 className="text-xl font-semibold text-[#1C2024]">
              No orders yet
            </h2>
            <p className="text-[#666] mt-2">
              Your purchased books will appear here after checkout.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md p-5 sm:p-6"
              >
                {/* ORDER TOP INFO */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4">
                  <div>
                    <h2 className="font-bold text-lg text-[#1C2024]">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h2>

                    <p className="text-sm text-[#666] mt-1">
                      Placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <span className="px-4 py-2 rounded-full text-sm font-medium bg-[#E0E7FF] text-[#4F46E5] text-center">
                      {order.status}
                    </span>

                    <span className="font-bold text-[#18181B]">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="mt-4 bg-[#F8F8FF] rounded-xl p-4">
                  <h3 className="font-semibold text-[#1C2024] mb-1">
                    Delivery Details
                  </h3>

                  <p className="text-sm text-[#666]">
                    {order.customerName} • {order.email}
                  </p>

                  <p className="text-sm text-[#666] mt-1">
                    {order.address}, {order.city} - {order.pincode}
                  </p>
                </div>

                {/* BOOK ITEMS */}
                <div className="mt-5 space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-4 bg-[#FAFAFA] rounded-xl p-4"
                    >
                      <div className="w-full sm:w-[90px] h-[130px] bg-[#F5F5F5] rounded-xl flex items-center justify-center flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full object-contain"
                        />
                      </div>

                      <div className="flex flex-col flex-1">
                        <h3 className="font-semibold text-[#1C2024] line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="text-sm text-[#666] mt-2">
                          Quantity: {item.quantity}
                        </p>

                        <p className="font-bold text-[#4F46E5] mt-2">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}