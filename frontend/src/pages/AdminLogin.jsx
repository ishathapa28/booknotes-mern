import { useState } from "react";
import axios from "axios";
import {Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {

    const API_URL = import.meta.env.VITE_API_URL;
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post(
                `${API_URL}/admin/login`,
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("adminToken", res.data.token);

            navigate("/admin/dashboard");

        }catch (error) {
            console.log(error);
        }
    };

    return (

        <div className="
            min-h-screen 
            flex items-center justify-center 
            bg-[#F8F8FF]">

            <div className="
                shadow-md 
                w-full max-w-[500px] 
                h-auto 
                p-5 sm:p-6 md:p-8 
                flex flex-col 
                items-center justify-center 
                gap-5 
                rounded-2xl 
                bg-white">

            <form
                onSubmit={handleLogin}
                className="
                    p-5 sm:p-8 
                    rounded-xl 
                    border-2 border-gray-200 
                    w-full 
                    space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">
                    Admin Login
                </h2>

                <input
                    name="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                        w-full 
                        p-3 
                        border rounded-lg 
                        outline-none 
                        focus:ring-2 focus:ring-[#7449a3]"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                        w-full 
                        p-3 
                        border rounded-lg 
                        outline-none 
                        focus:ring-2 focus:ring-[#7449a3]"
                />

                <button className="
                    w-full 
                    bg-[#7449a3] 
                    text-white 
                    p-3 
                    rounded-lg 
                    hover:bg-[#62358f] transition"
                >
                Login
                </button>

            </form>

            </div>

        </div>
    )
}