import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import { toast } from "react-toastify";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      form
    );

    // Save token
    localStorage.setItem("token", res.data.token);

    //Save user
    localStorage.setItem("user", JSON.stringify(res.data.user));

    toast.success("Login successful"); 

    //Redirect to Home
    navigate("/");

  } catch (err) {
    toast.error(err.response?.data?.message || "Error");
  }
};

  return (

    <>
      <Navbar />

      <div className="flex justify-center items-center min-h-screen px-4 py-10">

        <div className="shadow-md w-full max-w-[500px] h-auto p-5 sm:p-6  md:p-8 flex flex-col items-center justify-center gap-5 rounded-2xl bg-white">

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold">Welcome Back!</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Let's get you in to Booknotes</p>
          </div>
          

          <form
            onSubmit={handleSubmit}
            className="p-5  sm:p-8 rounded-xl border-2 border-gray-200 w-full space-y-4"
          >
            <h2 className="text-2xl font-bold text-center">
              Login
            </h2>

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#7449a3]"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#7449a3]"
            />

            <button
              className="w-full bg-[#7449a3] text-white p-3 rounded-lg hover:bg-[#62358f] transition"
            >
              Login
            </button>

          </form>

          <div>
            <p className="flex gap-1 justify-center text-sm sm:text-base font-medium">
              <span>New to Booknotes?</span>

              <Link to="/signup" className="text-[#7449a3] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

        </div>

      </div>
    </>
    
  );
}