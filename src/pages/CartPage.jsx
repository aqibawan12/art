import React from "react";
import { Link } from "react-router-dom";
import "./cartPage.css";
const CartPage = ({ cart, removeFromCart, updateQuantity, checkout }) => (
  <div className="products-page-container">
    <h2 className="products-title">Your Cart</h2>
    {cart.length === 0 ? (
      <p style={{ color: "#fff" }}>
        Cart is empty.{" "}
        <Link to="/products" style={{ color: "#61dafb" }}>
          Shop now
        </Link>
      </p>
    ) : (
      <div>
        {cart.map((item) => (
          <div
            key={item.id}
            className="product-card"
            style={{ marginBottom: 16, maxWidth: 350 }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="product-image"
              style={{ width: "100%", borderRadius: 8 }}
            />
            <h3 className="product-name" style={{ fontSize: "1.2rem" }}>
              {item.name}
            </h3>
            <p className="product-price" style={{ fontWeight: "bold" }}>
              Rs{item.price}
            </p>
            <p className="product-subtotal" style={{ color: "#ffd54f", fontWeight: "bold", margin: "0.5rem 0" }}>
              Subtotal: Rs{(item.price * item.quantity).toFixed(2)}
            </p>
            <div className="cart-qty-row">
              <button
                className="qty-btn"
                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
              >−</button>
              <span className="qty-count">{item.quantity}</span>
              <button
                className="qty-btn"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                aria-label="Increase quantity"
              >+</button>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remove from cart"
              >✕</button>
            </div>
          </div>
        ))}
        <div className="cart-total" style={{
  textAlign: "right",
  fontSize: "1.3rem",
  fontWeight: "bold",
  color: "#fffbe6",
  margin: "1.5rem 0 1rem 0"
}}>
          Cart Total: Rs
          {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link to="/checkout">
            <button
              className="cta-button"
              style={{
                background: "#007bff",
                color: "#fff",
                padding: "12px 24px",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    )}
  </div>
);

export default CartPage;