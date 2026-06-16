import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import SearchResults from "./pages/SearchResults";
import BookDetails from "./pages/BookDetails";
import Checkout from "./pages/Checkout";
import Orders from './pages/MyOrders';

import Home from './pages/Home';
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddBook from "./pages/AddBook";
import AdminBooks from "./pages/AdminBooks";
import AdminUsers from "./pages/AdminUsers";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search/:query" element={<SearchResults />}/>
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<Orders />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="dashboard" element={<h1>Dashboard</h1>} />
          <Route path="add-book" element={<AddBook />} />
          <Route path="books" element={<AdminBooks />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

    
      </Routes>
    </BrowserRouter>
  )
}

export default App
