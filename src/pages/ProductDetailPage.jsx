import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/products";

const ProductDetailPage = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFrame, setSelectedFrame] = useState("circle.png");
  const frames = ["circle.png", "rectangle.png"];
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => String(p.id) === String(id));
        setProduct(found);
        if (found) {
          setSelectedColor(found.colors?.[0] || "");
          setSelectedSize(found.sizes?.[0] || "");
        }
      });
  }, [id]);

  if (!product) return <div style={{ color: "#fff" }}>Loading...</div>;

  return (
    <div className="products-page-container" style={{ minHeight: "80vh" }}>
      <button
        onClick={() => navigate(-1)}
        className="cta-button"
        style={{ marginBottom: 24 }}
      >
        Back
      </button>
      <div
        style={{
          display: "flex",
          gap: "2.5rem",
          alignItems: "flex-start",
          flexWrap: "wrap",
          maxWidth: 1000,
          margin: "0 auto",
          padding: "2.5rem 0",
        }}
      >
        {/* Left: Image */}
        <div style={{ position: "relative", width: 360, height: 360 }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: 360,
              height: 360,
              objectFit: "contain",
            
              borderRadius: 16,
              background: "#181818",
              boxShadow: "0 4px 24px #0003",
              display: "block",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          />
          <img
            src={`/frames/${selectedFrame}`}
            alt="Selected Frame"
            style={{
              position: "absolute",
              top: selectedFrame === "rectangle.png" ? -12 : 0,
              left: selectedFrame === "rectangle.png" ? -32 : 0,
              width: selectedFrame === "rectangle.png" ? 434 : 360,
              height: selectedFrame === "rectangle.png" ? 384 : 360,
              pointerEvents: "none",
              borderRadius: 16,
              zIndex: 2,
              transition: "all 0.2s",
            }}
          />
        </div>
        {/* Right: Details */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <h3
            style={{
              fontSize: "2.2rem",
              textAlign: "left",
              marginBottom: "0.7rem",
              color: "#ffd54f",
              fontWeight: "bold",
            }}
          >
            {product.name}
          </h3>
          <p
            style={{
              fontSize: "1.4rem",
              color: "#fffbe6",
              textAlign: "left",
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            Rs{product.price}
          </p>
          <p style={{ color: "#bdbdbd", textAlign: "left", marginBottom: 16 }}>
            Stock: {product.stock}
          </p>
          {/* Product Description (always visible) */}
          {product.description && (
            <p
              style={{
                color: "#fffbe6",
                fontSize: "1.18rem",
                margin: "1.2rem 0",
                textAlign: "left",
                lineHeight: 1.7,
                background: "#232526",
                borderRadius: 10,
                padding: "1rem 1.2rem",
              }}
            >
              {product.description}
            </p>
          )}

          {/* Color Options (required) */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ margin: "1.2rem 0", textAlign: "left" }}>
              <span
                style={{
                  color: "#ffd54f",
                  fontWeight: "bold",
                  marginRight: 8,
                }}
              >
                Color:
              </span>
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    background: color,
                    border:
                      selectedColor === color
                        ? "3px solid #ffd54f"
                        : "2px solid #fffbe6",
                    borderRadius: "50%",
                    width: 38,
                    height: 38,
                    margin: "0 8px",
                    cursor: "pointer",
                    outline: "none",
                    boxShadow:
                      selectedColor === color ? "0 0 8px #ffd54f" : "none",
                  }}
                  aria-label={color}
                />
              ))}
              {!selectedColor && (
                <span
                  style={{
                    color: "#e53935",
                    marginLeft: 12,
                    fontSize: "1rem",
                  }}
                >
                  Please select a color
                </span>
              )}
            </div>
          )}

          {/* Size Options (required) */}
          {product.sizes && product.sizes.length > 0 && (
            <div style={{ margin: "1.2rem 0", textAlign: "left" }}>
              <span
                style={{
                  color: "#ffd54f",
                  fontWeight: "bold",
                  marginRight: 8,
                }}
              >
                Size:
              </span>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    background: selectedSize === size ? "#ffd54f" : "#232526",
                    color: selectedSize === size ? "#232526" : "#fffbe6",
                    border:
                      selectedSize === size
                        ? "2px solid #ffd54f"
                        : "1px solid #fffbe6",
                    borderRadius: 8,
                    padding: "10px 28px",
                    margin: "0 8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1.13rem",
                  }}
                >
                  {size}
                </button>
              ))}
              {!selectedSize && (
                <span
                  style={{
                    color: "#e53935",
                    marginLeft: 12,
                    fontSize: "1rem",
                  }}
                >
                  Please select a size
                </span>
              )}
            </div>
          )}

          {/* Frame Options */}
          <div style={{ margin: "1.2rem 0", textAlign: "left" }}>
            <span style={{ color: "#ffd54f", fontWeight: "bold", marginRight: 8 }}>
              Frame:
            </span>
            {frames.map((frame) => (
              <button
                key={frame}
                onClick={() => setSelectedFrame(frame)}
                style={{
                  border: selectedFrame === frame ? "3px solid #ffd54f" : "2px solid #fffbe6",
                  borderRadius: 8,
                  padding: 0,
                  margin: "0 8px",
                  cursor: "pointer",
                  background: "none"
                }}
                aria-label={frame}
              >
                <img
                  src={`/frames/${frame}`}
                  alt={frame}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    objectFit: "cover",
                    background: "#232526"
                  }}
                />
              </button>
            ))}
          </div>

          {/* Quantity */}
          <div style={{ margin: "1.2rem 0", textAlign: "left" }}>
            <label
              style={{
                color: "#ffd54f",
                fontWeight: "bold",
                marginRight: 8,
              }}
            >
              Quantity:
            </label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{
                width: 60,
                padding: 8,
                borderRadius: 6,
                border: "1px solid #333",
                fontSize: "1.1rem",
                textAlign: "center",
                background: "#232526",
                color: "#fffbe6",
              }}
            />
          </div>
          <button
            className="cta-button"
            onClick={() => {
              if (!selectedColor) {
                alert("Please select a color option.");
                return;
              }
              if (!selectedSize) {
                alert("Please select a size option.");
                return;
              }
              addToCart(product, quantity, selectedColor, selectedSize);
            }}
            style={{
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              border: "none",
              borderRadius: 8,
              padding: "14px 0",
              color: "#232526",
              background: "#ffd54f",
              marginTop: 18,
              fontSize: "1.2rem",
              width: "100%",
              transition: "background 0.3s",
              fontWeight: "bold",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
