import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage.jsx';
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPage from "./pages/AdminPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactUs.jsx";
import './App.css';

const API_URL = "http://localhost:5000/api";

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([1,1,1,1]);
useEffect(() => {
  fetch(`${API_URL}/products`)
    .then(res => res.json())
    .then(setProducts)
    .catch(() => setProducts([]));
}, []);

  // Load cart from backend
  useEffect(() => {
    fetch(`${API_URL}/cart`)
      .then(res => res.json())
      .then(setCart);
  }, []);

  // Save cart to backend
  const saveCart = (newCart) => {
    setCart(newCart);
    fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCart)
    });
  };

  const addToCart = (product, quantity = 1) => {
    let newCart;
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity }];
    }
    saveCart(newCart);
  };

  const removeFromCart = id => {
    const newCart = cart.filter(item => item.id !== id);
    saveCart(newCart);
  };

  const updateQuantity = (id, quantity) => {
    const newCart = cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    saveCart(newCart);
  };

  const checkout = () => {
    alert("Checkout successful!");
    setCart([]);
    fetch(`${API_URL}/cart`, { method: "DELETE" });
  };

  // Move the inner app into a component so you can use useLocation
  function AppContent() {
    const location = useLocation();

    return (
      <>
        <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
        <nav className="app-nav">
          {location.pathname === "/" ? (
            // Only show Products link on home
           <><Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
           </> 
          ) : location.pathname === "/products" ? (
            // Only show Home link on products page
            <> <Link to="/">Home</Link>
            <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            
            </>
           
            
          ) : (
            // Show all links except Products (if you want)
            <>
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<LandingPage products={products} />} />
          <Route path="/products" element={<ProductsPage products={products} />} />
          <Route path="/product/:id" element={<ProductDetailPage addToCart={addToCart} />} />
          <Route path="/cart" element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              checkout={checkout}
            />
          } />
          <Route path="/checkout" element={<CheckoutPage cart={cart} checkout={checkout} />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
       
      </>
    );
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;